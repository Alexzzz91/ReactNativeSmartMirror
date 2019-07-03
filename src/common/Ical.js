import moment from "moment";

 // Unescape Text re RFC 4.3.11
const text = (t) => {
  t = t || "";
  return (t
    .replace(/\\\,/g, ',')
    .replace(/\\\;/g, ';')
    .replace(/\\[nN]/g, '\n')
    .replace(/\\\\/g, '\\')
  )
};

const parseParams = (p) => {
  var out = {}
  for (var i = 0; i< p.length; i++) {
    if (p[i].indexOf('=') > -1){
      var segs = p[i].split('=');

      out[segs[0]] = parseValue(segs.slice(1).join('='));

    }
  }

  return out || null;
};

const parseValue = (val) => {
  if ('TRUE' === val) {
    return true;
  }

  if ('FALSE' === val) {
    return false;
  }

  var number = Number(val);
  if (!isNaN(number))
    return number;

  return val;
};

const storeParam = (name) => {
  return function(val, params, curr){
    var data;
    if (params && params.length && !(params.length==1 && params[0]==='CHARSET=utf-8')){
      data = {params:parseParams(params), val: text(val)}
    }
    else
      data = text(val)

    var current = curr[name];
    if (Array.isArray(current)){
      current.push(data);
      return curr;
    }

    if (current != null){
      curr[name] = [current, data];
      return curr;
    }

    curr[name] = data;
    return curr
  }
};

const addTZ = (dt, params) => {
  var p = parseParams(params);

  if (params && p && dt){
    dt.tz = p.TZID
  }

  return dt
};

const parseTimestamp = (val) => {
  var comps = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/.exec(val);
  if (comps !== null) {
    const object = {
        year: parseInt(comps[1], 10),
        month: parseInt(comps[2], 10)-1,
        day: parseInt(comps[3], 10),
        hour: parseInt(comps[4], 10),
        minute: parseInt(comps[5], 10),
        second: parseInt(comps[6], 10),
    }

    if (comps[7] == 'Z'){ // GMT
      object.zone = 'utc';
    }

    return moment().set(object);
  }

  return undefined;
};

const dateParam = (name) => {
  return function(val, params, curr){

    // Store as string - worst case scenario
    storeParam(name)(val, undefined, curr)

    if (params && params[0] === "VALUE=DATE") {
      // Just Date

      var comps = /^(\d{4})(\d{2})(\d{2})$/.exec(val);
      if (comps !== null) {
        // No TZ info - assume same timezone as this computer
        curr[name] = new Date(
          comps[1],
          parseInt(comps[2], 10)-1,
          comps[3]
        );

        curr[name] = addTZ(curr[name], params);
  return curr;
      }
    }

    curr[name] = []
    val.split(',').forEach(function(val){
      var newDate = parseTimestamp(val);
      curr[name].push(addTZ(newDate, params));
    });

    if (curr[name].length === 0){
      delete curr[name];
    } else if (curr[name].length === 1){
 curr[name] = curr[name][0];
    }

    return curr;
  }
};

const exdateParam = (name) => {
  return function(val, params, curr){
    var date = dateParam(name)(val, params, curr);
    if (date.exdates === undefined) {
      date.exdates = [];
    }
    if (Array.isArray(date.exdate)){
      date.exdates = date.exdates.concat(date.exdate);
    } else {
      date.exdates.push(date.exdate);
    }
    return date;
  }
};

const geoParam = (name) => {
  return function(val, params, curr){
    storeParam(val, params, curr)
    var parts = val.split(';');
    curr[name] = {lat:Number(parts[0]), lon:Number(parts[1])};
    return curr
  }
};

const categoriesParam = (name) => {
  var separatorPattern = /\s*,\s*/g;
  return function (val, params, curr) {
    storeParam(val, params, curr)
    if (curr[name] === undefined)
      curr[name] = val ? val.split(separatorPattern) : []
    else
      if (val)
        curr[name] = curr[name].concat(val.split(separatorPattern))
    return curr
  }
};

const addFBType = (fb, params) => {
  var p = parseParams(params);

  if (params && p){
    fb.type = p.FBTYPE || "BUSY"
  }

  return fb;
};

const freebusyParam = (name) => {
  return function(val, params, curr){
    var fb = addFBType({}, params);
    curr[name] = curr[name] || []
    curr[name].push(fb);

    storeParam(val, params, fb);

    var parts = val.split('/');

    ['start', 'end'].forEach(function (name, index) {
      dateParam(name)(parts[index], params, fb);
    });

    return curr;
  }
};

const objectHandlers = {
  'BEGIN': function(component, params, curr, stack) {
    stack.push(curr)

    return {type:component, params:params}
  },
  'END': function(component, params, curr, stack) {
    // prevents the need to search the root of the tree for the VCALENDAR object
    if (component === "VCALENDAR") {
        //scan all high level object in curr and drop all strings
        var key,
            obj;

        for (key in curr) {
            if(curr.hasOwnProperty(key)) {
               obj = curr[key];
               if (typeof obj === 'string') {
                   delete curr[key];
               }
            }
        }

        return curr
    }

    var par = stack.pop()

    if (curr.uid)
      par[curr.uid] = curr
    else
      par[Math.random()*100000] = curr  // Randomly assign ID : TODO - use true GUID

    return par
  },
  'SUMMARY' : storeParam('summary'),
  'DESCRIPTION' : storeParam('description'),
  'URL' : storeParam('url'),
  'UID' : storeParam('uid'),
  'LOCATION' : storeParam('location'),
  'DTSTART' : dateParam('start'),
  'DTEND' : dateParam('end'),
  'EXDATE' : exdateParam('exdate'),
  ' CLASS' : storeParam('class'),
  'TRANSP' : storeParam('transparency'),
  'GEO' : geoParam('geo'),
  'PERCENT-COMPLETE': storeParam('completion'),
  'COMPLETED': dateParam('completed'),
  'CATEGORIES': categoriesParam('categories'),
  'FREEBUSY': freebusyParam('freebusy')
};

const parseICS = (str) => {
  var lines = str.split(/\r?\n/)
  var ctx = {}
  var stack = []

  for (var i = 0, ii = lines.length, l = lines[0]; i< ii; i++, l=lines[i]){
    //Unfold : RFC#3.1
    while (lines[i+1] && /[ \t]/.test(lines[i+1][0])) {
      l += lines[i+1].slice(1)
      i += 1
    }

    var kv = l.split(":")

    if (kv.length < 2){
      // Invalid line - must have k&v
      continue;
    }

    // Although the spec says that vals with colons should be quote wrapped
    // in practise nobody does, so we assume further colons are part of the
    // val
    var value = kv.slice(1).join(":")
      , kp = kv[0].split(";")
      , name = kp[0]
      , params = kp.slice(1)

    ctx = handleObject(name, value, params, ctx, stack, l) || {}
  }

   // type and params are added to the list of items, get rid of them.
   delete ctx.type
   delete ctx.params

   return ctx
};

const handleObject = (name, val, params, ctx, stack, line) => {
  if(objectHandlers[name]) {
    return objectHandlers[name](val, params, ctx, stack, line)
  }

  //handling custom properties
  if(name.match(/X\-[\w\-]+/) && stack.length > 0) {
      //trimming the leading and perform storeParam
      name = name.substring(2);
      return (storeParam(name))(val, params, ctx, stack, line);
  }

  return storeParam(name.toLowerCase())(val, params, ctx);
};

export {
  objectHandlers,
  text,
  parseParams,
  parseValue,
  storeParam,
  addTZ,
  parseTimestamp,
  dateParam,
  exdateParam,
  geoParam,
  categoriesParam,
  addFBType,
  freebusyParam,
  parseICS,
  handleObject,
}
