(function (g) {
"use strict";

  /*
   * Конвертируют дату в русскоязычное представление
   * (например: 11:20 в "двадцать минут двенадцатого)
   *
   * @param Date time время
   */
  const RussianWordClock = function (time) {
      time = time || null;
      if (!(time instanceof Date))
          throw new Error("time: Date expected, " + typeof time + " + given");
      this.time = time;

      // начало часа (сколько-то минут какого-то)
      this.HOUR_BEGIN = 1;
      // половина часа
      this.HOUR_MIDDLE = 2;
      // конец часа (без скольки-то)
      this.HOUR_END = 3;
  };

  RussianWordClock.prototype.getHourPart = function()
  {
      var minute = this.time.getMinutes();
      if (minute === 30)
          return this.HOUR_MIDDLE;
      if (minute < 35)
          return this.HOUR_BEGIN;
      return this.HOUR_END;
  };

  RussianWordClock.prototype.getHourForm = function(hour, forms) {
      if (hour === 0)
          hour = 12;
      else if (hour > 12)
          hour -= 12;
      return forms[hour-1];
  };

  RussianWordClock.prototype.getHourForm1 = function(hour)
  {
      return this.getHourForm(hour, ["час", "два", "три", "четыре", "пять", "шесть",
              "семь", "восемь", "девять", "десять", "одиннадцать", "двенадцать"]);
  };

  RussianWordClock.prototype.getHourForm2 = function(hour)
  {
      return this.getHourForm(hour, ["первого", "второго", "третьего", "четвертого",
              "пятого", "шестого", "седьмого", "восьмого", "девятого", "десятого",
              "одиннадцатого", "двенадцатого"]);
  };

  RussianWordClock.prototype.getMinute = function (minute, exp1, exp2, extra)
  {
      if (minute < 10)
          return exp1[minute];
      if (minute % 10 === 0)
          return exp2[Math.floor(minute / 10) - 1];
      if (minute > 20)
          return exp2[Math.floor(minute / 10) - 1] + " " + exp1[minute % 10];
      return extra[minute - 11];
  };

  RussianWordClock.prototype.getMinuteForm1 = function (minute)
  {
      var exp1 = [
          "ноль", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"
      ];
      var exp2 = [
          "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят",
          "семьдесят", "восемьдесят", "девяносто"
      ];
      var extra = [
          "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать",
          "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"
      ];
      return this.getMinute(minute, exp1, exp2, extra);
  };

  RussianWordClock.prototype.getMinuteForm2 = function (minute)
  {
      var exp1 = [
          "ноля", "одной", "двух", "трех", "четырех", "пяти", "шести", "семи",
          "восьми", "девяти"
      ];
      var exp2 = [
          "десяти", "двадцати", "тридцати", "сорока", "пятидесяти", "шестидесяти",
          "семидесяти", "восьмидесяти", "девяносто"
      ];
      var extra = [
          "одиннадцати", "двенадцати", "тринадцати", "четырнадцати", "пятнадцати",
          "шестнадцати", "семнадцати", "восемнадцати", "девятнадцати"
      ];
      return this.getMinute(minute, exp1, exp2, extra);
  };

  RussianWordClock.prototype.pluralForm = function(n, form1, form2, form3)
  {
      if (n % 10 === 1 && n % 100 != 11)
          return form1;
      if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
          return form2;
      return form3;
  };

  RussianWordClock.prototype.minutePlural = function (n)
  {
      return this.pluralForm(n, "минута", "минуты", "минут");
  };

  RussianWordClock.prototype.toString = function ()
  {
      var hpart = this.getHourPart(),
          hour = this.time.getHours(),
          next_hour = hour + 1,
          mins = this.time.getMinutes(),
          minForm1 = this.getMinuteForm1(mins),
          ret;
      if (hour > 12) hour -= 12;
      else if (hour === 0) hour = 12;

      if (mins === 0) {
          var hf = "";
          if (hour === 1) hf = "час";
          else hf = this.getHourForm1(hour) + " " + this.pluralForm(hour, "час", "часа", "часов");
          return hf + " ровно";
      }

      switch(hpart) {
          case this.HOUR_BEGIN:
              ret = minForm1 + " " + this.minutePlural(mins) + " " +
                  this.getHourForm2(next_hour);
              break;
          case this.HOUR_MIDDLE:
              ret = "половина " + this.getHourForm2(next_hour);
              break;
          case this.HOUR_END:
              ret =  "без " + this.getMinuteForm2(60 - mins) + " " +
                  this.pluralForm(60 - mins, "минуты", "минут", "минут") +
                  " " + this.getHourForm1(next_hour);
              break;
          default:
              throw new Error("unexpected time part value: " + hpart);
      }
      return ret;
  };

  g.RussianWordClock = RussianWordClock;

})(this);
