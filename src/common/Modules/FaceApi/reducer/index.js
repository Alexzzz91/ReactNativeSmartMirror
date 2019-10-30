import { createReducer } from '../../../../store/helpers/createReducer';

const initialState = {
  profiles: {
    Alk: {
      name: 'Сашка',
      descriptors: [
        [
          -0.06763286888599396,
          0.13550135493278503,
          -0.029749508947134018,
          -0.04807858169078827,
          -0.14703154563903809,
          0.017457913607358932,
          0.03810937702655792,
          -0.07275907695293427,
          0.1131388396024704,
          -0.09895101189613342,
          0.23830243945121765,
          -0.042450543493032455,
          -0.2338872104883194,
          -0.05151592195034027,
          -0.09325096756219864,
          0.08164715766906738,
          -0.17823465168476105,
          -0.15701037645339966,
          -0.1983250230550766,
          -0.03810964897274971,
          0.03294449299573898,
          0.0832359716296196,
          0.004457201808691025,
          0.07769875228404999,
          -0.17053309082984924,
          -0.2896287441253662,
          -0.062145572155714035,
          -0.1352216750383377,
          0.04177917167544365,
          -0.09344310313463211,
          0.007435056380927563,
          0.03571675717830658,
          -0.12455618381500244,
          -0.0065077245235443115,
          0.0043664053082466125,
          0.02049083821475506,
          -0.10628418624401093,
          0.02869110181927681,
          0.24062642455101013,
          0.06984628736972809,
          -0.1787138432264328,
          0.08629955351352692,
          0.03506798669695854,
          0.35035350918769836,
          0.2190244048833847,
          0.03152873367071152,
          0.030597664415836334,
          -0.08930529654026031,
          0.13296662271022797,
          -0.259080708026886,
          0.043715693056583405,
          0.21287241578102112,
          0.22845688462257385,
          0.08033649623394012,
          0.1547473669052124,
          -0.0783080905675888,
          0.0017408765852451324,
          0.13461415469646454,
          -0.1276516169309616,
          0.05018080398440361,
          -0.005912197753787041,
          0.0019885022193193436,
          0.03218221291899681,
          -0.08776616305112839,
          0.16005302965641022,
          -0.019522596150636673,
          -0.07635895907878876,
          -0.11548764258623123,
          0.11803065240383148,
          -0.21206024289131165,
          -0.12900270521640778,
          0.16454364359378815,
          -0.07518285512924194,
          -0.18957959115505219,
          -0.22189918160438538,
          0.04535046964883804,
          0.4315573573112488,
          0.21314744651317596,
          -0.13670466840267181,
          0.04719822481274605,
          -0.059603918343782425,
          -0.12615756690502167,
          0.021605543792247772,
          -0.0255824513733387,
          -0.1874399185180664,
          -0.0072636837139725685,
          -0.13145065307617188,
          0.06932155042886734,
          0.22731547057628632,
          -0.08484980463981628,
          0.022632308304309845,
          0.23558147251605988,
          0.0492841899394989,
          -0.01253229659050703,
          0.04552342742681503,
          -0.07494205236434937,
          -0.11783184111118317,
          0.04689723998308182,
          -0.05597441643476486,
          -0.009109387174248695,
          0.04261104017496109,
          -0.12794096767902374,
          0.01245802640914917,
          -0.00782177597284317,
          -0.18537230789661407,
          0.15844988822937012,
          -0.05657000467181206,
          -0.04354247450828552,
          -0.06607288122177124,
          -0.009798691608011723,
          -0.1536739319562912,
          0.031492941081523895,
          0.22144362330436707,
          -0.2650719881057739,
          0.16027279198169708,
          0.1336083859205246,
          0.008737172931432724,
          0.0862114354968071,
          0.1207120418548584,
          -0.009069355204701424,
          -0.058195214718580246,
          -0.006745690479874611,
          -0.12748438119888306,
          -0.09368064999580383,
          0.14341068267822266,
          -0.08365815877914429,
          0.09309938549995422,
          -0.02460603229701519
        ]
      ]
    },
    Olesya: {
      name: 'Олеся',
      descriptors: [
        [
          -0.07007043808698654,
          0.04531732201576233,
          0.02627837285399437,
          -0.031398504972457886,
          -0.14748671650886536,
          0.031057655811309814,
          -0.026857271790504456,
          -0.042636774480342865,
          0.20967862010002136,
          -0.14220599830150604,
          0.16089509427547455,
          0.026303591206669807,
          -0.24255576729774475,
          0.050975799560546875,
          -0.06447174400091171,
          0.17881231009960175,
          -0.09397346526384354,
          -0.18499822914600372,
          -0.145181342959404,
          -0.02135699987411499,
          -0.018531043082475662,
          0.021350180730223656,
          0.013416152447462082,
          0.026182226836681366,
          -0.2184177190065384,
          -0.30401191115379333,
          -0.030643491074442863,
          -0.11604296416044235,
          -0.12286604195833206,
          -0.0509164035320282,
          0.022738324478268623,
          0.08121169358491898,
          -0.10897582769393921,
          -0.007824718952178955,
          0.06807847321033478,
          0.03611063212156296,
          -0.10466723889112473,
          -0.06672633439302444,
          0.3092668354511261,
          0.011935011483728886,
          -0.2706184685230255,
          0.006200132891535759,
          0.09232877194881439,
          0.215033620595932,
          0.13084231317043304,
          0.017872970551252365,
          0.08000510185956955,
          -0.09810489416122437,
          0.1975773572921753,
          -0.3806455731391907,
          0.07092595100402832,
          0.12886260449886322,
          0.04781342297792435,
          0.11590564996004105,
          0.12444985657930374,
          -0.14160850644111633,
          0.03298452869057655,
          0.1738654375076294,
          -0.14696897566318512,
          0.0269254669547081,
          0.009577763266861439,
          -0.05575116351246834,
          -0.10371532291173935,
          -0.1192861869931221,
          0.2571011781692505,
          0.13365527987480164,
          -0.14095593988895416,
          -0.11935871094465256,
          0.20927277207374573,
          -0.1333901286125183,
          -0.09406813979148865,
          0.15254178643226624,
          -0.07354491949081421,
          -0.20994985103607178,
          -0.2324724644422531,
          0.004392571747303009,
          0.3983817994594574,
          0.1672949343919754,
          -0.12130589783191681,
          0.03900769352912903,
          -0.05670470744371414,
          -0.027382589876651764,
          -0.0582331120967865,
          0.10045047849416733,
          -0.02718469500541687,
          -0.007009091321378946,
          0.0007625170983374119,
          -0.018600624054670334,
          0.2589949071407318,
          -0.008162088692188263,
          0.007155420258641243,
          0.2538662552833557,
          0.07594853639602661,
          0.014182178303599358,
          0.0011327778920531273,
          0.06125784292817116,
          -0.09829317033290863,
          -0.06787668913602829,
          -0.09791241586208344,
          -0.010069545358419418,
          0.06654252111911774,
          0.015616700984537601,
          0.008114753291010857,
          0.07938332110643387,
          -0.22657153010368347,
          0.21638698875904083,
          -0.11702156066894531,
          -0.0006712619215250015,
          0.030217012390494347,
          0.006882485467940569,
          0.0013196368236094713,
          0.011976567097008228,
          0.13267357647418976,
          -0.2870778739452362,
          0.12189199775457382,
          0.08477234840393066,
          -0.004555095452815294,
          0.12666729092597961,
          0.037060368806123734,
          0.018265988677740097,
          -0.01934075728058815,
          -0.012811409309506416,
          -0.27934983372688293,
          -0.12450835853815079,
          0.0881270170211792,
          -0.06188782677054405,
          0.00006881356239318848,
          0.049308326095342636
        ]
      ],
    },
  },
};

const { reducer, actions } = createReducer(
  initialState,
  {
    setWebcal: (state, payload) => ({
      ...state,
      webCalls: [
        ...state.webCalls,
        payload,
      ],
    }),
    setCalendarList: (state, payload) => ({
      ...state,
      calendarList: [
        ...state.calendarList,
        payload,
      ],
    }),
    setEventList: (state, payload) => ({
      ...state,
      eventList: [
        ...state.eventList,
        payload,
      ],
    }),
  },
  'lenta',
);

export {
  reducer,
  actions,
};
