import { TelegrafAdapter } from './telegrafAdapter.js';
import { getUserData, saveUserData, getAllUserData, loadMessageData, saveMessageData, getBattleData, saveBattleData, deleteBattleData, getKV, setKV } from './db.js';
import { api, fetch } from 'sdk';
import safari from './data/safari.js';
import events from './data/event.js';
import lvls from './data/poke_level.js';
import catch_rates from './data/pokemon_rarity.js';
import stones from './data/stones.js';
import pokes from './data/pokemon_info55_modified2.js';
import pokemoves from './data/moveset_data_updated2.js';
import re from './data/poke_rarity.js';
import pokestats from './data/pokemon_base_stats_info2.js';
import trainerlevel from './data/levels.js';
import tmprices from './data/tm_prices.js';
import tms from './data/tms2.js';
import forms from './data/pokemon_data_updated.js';
import shiny from './data/shiny.js';
import dmoves from './data/moves_info.js';
import spawn from './data/pokemon_status_info.js';
import expdata from './data/pokemon_base_exp2.js';
import pokes2 from './data/pokemon_info2.js';
import chart from './data/exp_chart.js';
import chains from './data/evolution_chains2.js';
import growth_rates from './data/pokemon_data2.js';
import rdata from './data/pokedex_data.js';
import { chooseRandomNumbers, getLevel, stat, calculateTotalEV, calculateTotal, getRandomNature, saveUserData2, check, c, Stats, word, Bar, plevel, calc, calcexp, sleep, eff, findEvolutionLevel, pokelist, pokelisthtml, incexp, incexp2, check2, check2q, getTopUsers, sort, generateRandomIVs } from './func.js';

const bot = new TelegrafAdapter();

let msgsent = []
const REQUIRED_ADMIN_ID = 6265981509
const ADMIN_ID = REQUIRED_ADMIN_ID
const appr = [ADMIN_ID]
function requireAdminId(list, listName) {
if(!list.includes(REQUIRED_ADMIN_ID)){
console.error(`${listName} must include admin id ${REQUIRED_ADMIN_ID}`)
process.exit(1)
}
}
requireAdminId(appr,'appr')
const botToken = '' //main bot
//const botToken = '' // test bot

const commands = new Map();
commands.forEach((method, name) => {
  bot.command(name, method)
})

const tutors = [
520, 803, 338, 805, 519, 307, 799, 814, 815, 518,
  812, 308, 450, 282, 143,
  343, 351, 387,  20,
  401, 804, 798, 800, 802, 807, 797, 324,
  808, 806,   7,   8,   9, 200, 264, 530, 276,
  796, 352, 710, 809, 492, 813, 434,
  340, 547
]
const gmax = 'https://telegra.ph/file/69896185471b6a096ff06.jpg'
let rar = 0
let gma = 0
const trainers = {
"selene":"https://telegra.ph/file/9630b88c3d8e12f345d01.jpg",
"calem":"https://telegra.ph/file/7ab5b16c1c618b3295711.jpg",
"elio":"https://telegra.ph/file/dc50d855ef55787805e89.jpg",
"nate":"https://telegra.ph/file/e403ddd36c19ed1eda7d5.jpg",
"victor":"https://telegra.ph/file/fbf0184a2224eb69e3dcb.jpg",
"hilbert":"https://telegra.ph/file/c13833bd1ba27a1ec142e.jpg",
"lucas":"https://telegra.ph/file/d607a91c98a8b421c68af.jpg",
"brenden":"https://telegra.ph/file/9f7a41488fe4156c88429.jpg",
"ethan":"https://telegra.ph/file/e21588cecef8e6c230b8c.jpg",
"chase":"https://telegra.ph/file/9f7a41488fe4156c88429.jpg"
}
const event = ['kirlia','pacham','lilligant','decdueye','skitty','unown']
const userState2 = new Map()

const regions = ['Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar','Paldea']
const region = {
"Kanto":1,
"Johto":2,
"Hoenn":3,
"Sinnoh":4,
"Unova":5,
"Kalos":6,
"Alola":7,
"Galar":8,
"Paldea":9
}
const starters = {
  "Kanto": ["Bulbasaur", "Charmander", "Squirtle"],
  "Unova": ["Snivy", "Tepig", "Oshawott"],
  "Sinnoh": ["Turtwig", "Chimchar", "Piplup"],
  "Johto": ["Chikorita", "Cyndaquil", "Totodile"],
  "Hoenn": ["Treecko", "Torchic", "Mudkip"],
  "Paldea": ["Sprigatito", "Fuecoco", "Quaxly"],
  "Galar": ["Grookey", "Scorbunny", "Sobble"],
  "Alola": ["Rowlet", "Litten", "Popplio"],
  "Kalos": ["Chespin", "Fennekin", "Froakie"]
};
const emojis = {
  "normal": "🔘",
  "fire": "🔥",
  "water": "💧",
  "electric": "⚡",
  "grass": "🌱",
  "ice": "❄️",
  "fighting": "🥊",
  "poison": "☠️",
  "ground": "🌍",
  "flying": "🦅",
  "psychic": "🧠",
  "bug": "🐛",
  "rock": "🪨",
  "ghost": "👻",
  "dragon": "🐲",
  "dark": "🌑",
  "steel": "🔩",
  "fairy": "🧚"
}
let botStartTime = new Date().getTime();
let lastClicked = {}
let lastUsed = {}
let lastClicked2 = {}
let globalClicks = [];
let lastmsg = {}
let globalmsg = [];
let battlec = {}
const banListFile2 = 'ban_list.json';

// Load the ban list from the file
let banList2 = [];
try {
    const banListData = '[]';
    banList2 = JSON.parse(banListData);
} catch (error) {
    console.error('Error loading ban list:', error);
}
bot.on('callback_query', async (ctx, next) => {
  try {
if(banList2.includes(String(ctx.from.id))|| banList2.includes(ctx.from.id)){
return
}
    const userId = ctx.from.id;
    const chatId = ctx.chat ? ctx.chat.id : 0;
const globalClicksPerSecond = globalClicks.filter(
  (timestamp) => Date.now() - timestamp < 1000
);

if (globalClicksPerSecond.length > 25) {
  const waitTime = Math.ceil((globalClicksPerSecond[0] + 1000 - Date.now()) / 1000);
  ctx.answerCbQuery(`Wait for a second.`);
  return;
}

// Check chat-specific click rate for groups
if (ctx.chat && ctx.chat.type != 'private') {
  if (!lastClicked[chatId]) {
    lastClicked[chatId] = [];
  }

  // Check total clicks in the current minute
  const currentMinuteStart = Date.now() - (Date.now() % 60000);
  const clicksPerMinute = lastClicked[chatId].filter(
    (timestamp) => timestamp >= currentMinuteStart
  );

  if (clicksPerMinute.length >= 19) {
    const waitTime = Math.ceil((clicksPerMinute[0] + 60000 - Date.now()) / 1000);
    ctx.answerCbQuery(`Too many requests.`);
    return;
  }
}
if(ctx.chat.type=='private'){
var sy = 700
}else{
var sy = 1000
}
if (lastClicked2[ctx.from.id] && Date.now() - lastClicked2[ctx.from.id] < sy) {

  ctx.answerCbQuery('Try after a sec');
  return;
}
await next();
}catch(error){
console.log(error)
}
})
bot.on('message',async (ctx,next) => {
try{
if(banList2.includes(String(ctx.from.id))|| banList2.includes(ctx.from.id)){
return
}
ctx.session.groupChatLimitReached = false;
const updateTimestamp = ctx.message.date * 1000; // Convert to milliseconds
  if (updateTimestamp < botStartTime) {
    return;
  }
const userId = ctx.from.id;
    const chatId = ctx.chat ? ctx.chat.id : 0;
const globalClicksPerSecond = globalmsg.filter(
  (timestamp) => Date.now() - timestamp < 1000
);

if (globalClicksPerSecond.length > 25) {
  const waitTime = Math.ceil((globalClicksPerSecond[0] + 1000 - Date.now()) / 1000);
  return;
}

// Check chat-specific click rate for groups
if (ctx.chat && ctx.chat.type != 'private') {
  if (!lastmsg[chatId]) {
    lastmsg[chatId] = [];
  }

  // Check total clicks in the current minute
  const currentMinuteStart = Date.now() - (Date.now() % 60000);
  const clicksPerMinute = lastmsg[chatId].filter(
    (timestamp) => timestamp >= currentMinuteStart
  );

  if (clicksPerMinute.length >= 19) {
    const waitTime = Math.ceil((clicksPerMinute[0] + 60000 - Date.now()) / 1000);
if(!msgsent.includes(chatId)){
await sendMessage(ctx,ctx.chat.id,'*⚠️ Too many requests*',{parse_mode:'markdown'})
msgsent.push(chatId)
}
    return;
  }
}
if(ctx.chat.type=='private'){
var sy = 700
}else{
var sy = 1500
}
if (lastClicked2[ctx.from.id] && Date.now() - lastClicked2[ctx.from.id] < sy) {
console.log('low gap')
    return;
  }
if(msgsent.includes(chatId)){
msgsent = msgsent.filter(id => id!=chatId)
}
const nam2 = (ctx.message.text && ctx.message.text.startsWith('/')) ? ctx.message.text.split(' ')[0].replace('/','') : 'b'
const name = nam2.includes('@'+bot.botInfo.username) ? nam2.replace('@'+bot.botInfo.username,'') : nam2
const command = commands.get(name)
if(ctx.message.text.startsWith('/')){
lastClicked2[ctx.from.id] = Date.now();
}
if(command){
command(ctx,next)
return
}
const data = await getUserData(ctx.from.id)
if(data.inv && (!data.settings)){
data.settings = {}
const s = data.settings
s['max_poke'] = 6
s['dual_type'] = true
s['min_6l'] = 0
s['max_6l'] = 6
s['min_level'] = 1
s['max_level'] = 100
s['switch'] = true
s['key_item'] = true
s['sandbox'] = false
s['random'] = false
s['preview'] = 'no'
s['pin'] = false
s['ban_types'] = []
s['allow_types'] = []
s['ban_regions'] = []
s['allow_regions'] = []
s['type_effects'] = true
await saveUserData(ctx.from.id,data)
}

if(data.inv && !data.inv.exp){
data.inv.exp = 0
await saveUserData(ctx.from.id,data)
}
if (userState2.has(ctx.from.id)) {
    const userData2 = userState2.get(ctx.from.id);

    // Check if the user's message is a reply to the waiting message
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.message_id === userData2.messageId) {
userState2.delete(ctx.from.id);
var regex = /[^a-zA-Z0-9 .]/g;
  // Find all invalid characters in the message
  var invalidCharacters = ctx.message.text.match(regex);
if(invalidCharacters!=null){
const message = await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Invalid Character: *'+invalidCharacters+'*',{reply_markup:{force_reply:true}})
const userData3 = {
      messageId: message,
      pass: userData2.pass // You can set the name to whatever you like
    };
    userState2.set(ctx.from.id, userData3);
return
}
if(ctx.message.text.length > 12){
const message = await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Maximum Length: *12*',{reply_markup:{force_reply:true}})
const userData3 = {
      messageId: message,
      pass: userData2.pass // You can set the name to whatever you like
    };
    userState2.set(ctx.from.id, userData3);
return
}
const poke = data.pokes.filter((pk)=>pk.pass==userData2.pass)[0]
if(!poke){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Pokemon Not Found',{reply_to_message_id:ctx.message.message_id})
return
}
if(ctx.message.text == '.'){
if(poke.nickname){
delete poke.nickname
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Removed nickname of *'+c(poke.name)+'*',{reply_to_message_id:ctx.message.message_id})
}else{
poke.nickname = ctx.message.text
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Nicknamed *'+c(poke.name)+'* as *'+c(ctx.message.text)+'*',{reply_to_message_id:ctx.message.message_id})
}
await saveUserData(ctx.from.id, data);;
return
}
}
if (userState.has(ctx.from.id)) {
    const userData2 = userState.get(ctx.from.id);

    // Check if the user's message is a reply to the waiting message
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.message_id === userData2.messageId) {
userState.delete(ctx.from.id);
var regex = /[^a-zA-Z0-9 ]/g;
  // Find all invalid characters in the message
  var invalidCharacters = ctx.message.text.match(regex);
if(invalidCharacters!=null){
const message = await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Invalid Character: *'+invalidCharacters+'*',{reply_markup:{force_reply:true}})
const userData3 = {
      messageId: message,
      teamn: userData2.teamn // You can set the name to whatever you like
    };
    userState.set(ctx.from.id, userData3);
return
}
if(ctx.message.text.length > 12){
const message = await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Maximum Length: *12*',{reply_markup:{force_reply:true}})
const userData3 = {
      messageId: message,
      teamn: userData2.teamn // You can set the name to whatever you like
    };
    userState.set(ctx.from.id, userData3);
return
}

if(ctx.message.text == ','){
delete data.inv[userData2.teamn]
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Successfully Removed Name Of *Team '+userData2.teamn+'*',{reply_to_message_id:ctx.message.message_id})
}else{
data.inv[userData2.teamn] = ctx.message.text
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Renamed *Team '+userData2.teamn+'* As *'+ctx.message.text+'*',{reply_to_message_id:ctx.message.message_id})
}
await saveUserData(ctx.from.id, data);
return
}
}
if(data.inv && data.inv.team && data.teams){
const team = data.teams[data.inv.team]
for(const a of team){
const pk = data.pokes.filter((pk)=> pk.pass==a)[0]
if(!pk){
data.teams[data.inv.team] = data.teams[data.inv.team].filter((p)=> p!=a)
await saveUserData(ctx.from.id,data)
}
}
}
if(data.inv && (!data.inv.name || data.inv.name!=ctx.from.first_name)){
data.inv.name = he.encode(ctx.from.first_name)
await saveUserData(ctx.from.id,data)
}
if(data.inv && !data.extra){
data.extra = {}
await saveUserData(ctx.from.id,data)
}
if(data.inv && !data.extra.megas){
data.extra.megas = {}
await saveUserData(ctx.from.id,data)
}
if(data.inv && Object.keys(data.extra.megas).length > 0){
const messageData = await loadMessageData();
const userIdToFind = String(ctx.from.id)
const result = Object.keys(messageData).find(key => {
  const value = messageData[key];
  return typeof value === 'object' && (value.turn === userIdToFind || value.oppo === userIdToFind);
});
if(result){
let battleData = {};
    try {
      battleData = await getBattleData(result);
    } catch (error) {
      battleData = {};
    }
if(!battleData.megas){
battleData.megas = {}
}
if(!Object.keys(battleData.megas).includes(Object.keys(data.extra.megas)[0])){
const p = data.pokes.filter((pk)=> pk.pass == Object.keys(data.extra.megas)[0])[0]
if(p){
p.name = data.extra.megas[Object.keys(data.extra.megas)[0]]
}
data.extra.megas = {}
await saveUserData(ctx.from.id,data)
}
}else{
const p = data.pokes.filter((pk)=> pk.pass == Object.keys(data.extra.megas)[0])[0]
if(p){
p.name = data.extra.megas[Object.keys(data.extra.megas)[0]]
}
data.extra.megas = {}
await saveUserData(ctx.from.id,data)
}
}
if(data.pokes && data.pokes.length > 0){
if(!data.pokecaught){
data.pokecaught = []
}
if(!data.pokeseen){
data.pokeseen = []
}
const fu2 = data.pokes.filter((p)=>!data.pokecaught.includes(p.name))
const fu = data.pokes.filter((p)=>!data.pokeseen.includes(p.name))
if(fu2.length > 0){
for(const yy of fu2){
data.pokecaught.push(yy.name)
}
await saveUserData(ctx.from.id,data)
}
if(fu.length > 0){
for(const yy of fu){
data.pokeseen.push(yy.name)
}
await saveUserData(ctx.from.id,data)
}
}
if(data.inv && data.extra){
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(data.extra.pending && level > 19){
const id = data.extra.pending*1
const userData2 = await getUserData(id)
if(!userData2.extra.refer){
userData2.extra.refer = []
}
if(!userData2.refers){
userData2.refers = 0
}
userData2.refers += 1
userData2.extra.refer.push(ctx.from.id)
data.inv.pc += 1000
data.extra.referred = id
delete data.extra.pending
await sendMessage(ctx,ctx.from.id,'You have successfully reached <b>Level 20</b> and your refer by <b>'+userData2.inv.name+' has been completed.\n+ 1k PC 💷</b>',{parse_mode:'HTML'})
let msg = '<b>'+ctx.from.first_name+'</b> has reached <b>Level 20</b>.'
userData2.inv.pc += 500
msg += '\n<b>+500</b> PokeCoins 💷'
if (userData2.refers % 3 === 0) {
const ballTypes = ['level','friend','moon','sport','net','nest','luxury','premier','quick','park','beast'];

// Shuffle the ballTypes array
for (let i = ballTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ballTypes[i], ballTypes[j]] = [ballTypes[j], ballTypes[i]];
}

const numTypesToAdd = Math.floor(Math.random() * 2) + 2;
const selectedTypes = ballTypes.slice(0, numTypesToAdd);
selectedTypes.forEach(type => {
    const randomAmount = Math.floor(Math.random() * 5) + 1;
    userData2.balls[type] = (userData2.balls[type] || 0) + randomAmount;
    msg += `\n<b>+${randomAmount}</b> ${c(type)} Balls`;
});
}
if(userData2.refers % 8 === 0){
const n5 = Object.keys(tms.tmnumber)
const num = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms){
userData2.tms = {}
}
if(!userData2.tms[String(num)]){
userData2.tms[String(num)] = 0
}
userData2.tms[String(num)] += 1
userData2.inv.pc += 1000
if(!userData2.inv.pass){
userData2.inv.pass = 0
}
userData2.inv.pass += 1
msg += '\n<b>+1</b> TM'+num+' ⚙\n<b>+1</b> Safari Pass\n<b>+1000</b> PokeCoins 💷'
}
if(userData2.refers % 13 === 0){
const n5 = Object.keys(tms.tmnumber)
const num = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms){
userData2.tms = {}
}
if(!userData2.tms[String(num)]){
userData2.tms[String(num)] = 0
}
userData2.tms[String(num)] += 1
const num2 = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms[String(num2)]){
userData2.tms[String(num2)] = 0
}
userData2.tms[String(num2)] += 1
const num3 = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms[String(num3)]){
userData2.tms[String(num3)] = 0
}
userData2.tms[String(num3)] += 1
userData2.inv.pc += 3000
if(!userData2.inv.pass){
userData2.inv.pass = 0
}
userData2.inv.pass += 1
msg += '\n<b>+1</b> TM'+num+' ⚙\n<b>+1</b> TM'+num2+' ⚙\n<b>+1</b> TM'+num3+' ⚙\n<b>+1</b> Safari Pass\n<b>+3000</b> PokeCoins 💷'
}

  if (userData2.refers % 22 === 0) {
if(!userData2.balls.master){
userData2.balls.master = 0
}
userData2.balls.master += 1
const st = Object.keys(stones)
const stone = st[Math.floor(Math.random()*st.length)]
if(!userData2.inv.stones){
userData2.inv.stones = []
}
userData2.inv.stones.push(stone)
const ar = ['legendary','legendry']
var list = Object.keys(spawn).filter(pk=>ar.includes(spawn[pk].toLowerCase()) && forms[pk])
const name5 = list[Math.floor(Math.random()*list.length)]
const nut = ['gmax','mega','origin','primal']
var fr = forms[name5].filter(pk=> !nut.some((pk2)=> pk.identifier.includes(pk2)) && ar.includes(spawn[pk.identifier].toLowerCase()))
const nam = fr[Math.floor(Math.random()*fr.length)].identifier
const ul = lvls[nam]
let m = Math.max(ul.split('-')[0]*1,5)
let m2 = ul.split('-')[1]*1
const level = Math.floor(Math.random()*(m2-m))+m
const pokeName = nam.toLowerCase()
  const poked = pokes[pokeName]
  if (poked) {
const moves = pokemoves[pokeName]
if(moves){
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < level*1 && dmoves[move.id].power && dmoves[move.id].accuracy)
const am = Math.min(Math.max(moves2.length,1),4)
const omoves = moves2.slice(-am)
const ms = []
for(const m of omoves){
ms.push(m.id)
}
const iv = await generateRandomIVs(spawn[pokeName].toLowerCase())
  const ev = {
"hp":0,
"attack":0,
"defense":0,
"special_attack":0,
"special_defense":0,
"speed":0
};
const pass2 = word(8)
const nat = getRandomNature()
const g = growth_rates[pokeName]
var sy = ''
const exp = chart[g.growth_rate][level]
  const da = {
    name:pokeName,
    id: poked.pokedex_number,
    nature:nat,
    exp:exp,
    pass:pass2,
    ivs: iv,
    symbol: sy,
    evs: ev,
    moves: ms, // Push the randomly selected move ID
  };
if(!userData2.pokes){
userData2.pokes = []
}
userData2.pokes.push(da)
}
}
msg += '\n<b>+1</b> Master Ball\n<b>+1</b> '+c(stone)+'\n<b>+1</b> '+c(nam)+''
  }
await sendMessage(ctx,id,msg,{parse_mode:'HTML'})
await sendMessage(ctx,5432006093,'#refer\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) has reached level 20 and <b>'+userData2.inv.name+'</b> (<code>'+id+'</code>) received :-.\n\n'+msg+'',{parse_mode:'html'})
await saveUserData(id,userData2)
await saveUserData(ctx.from.id,data)
return
}
}
await next();
}catch(error){
console.log(error,ctx.from.id)
}
})
bot.command('start',async (ctx,next) => {
const data = await getUserData(ctx.from.id)
const value = ctx.message.text.split(' ')[1]
const [name] = ctx.payload ? [ctx.payload.split('-')[0]] : 'b'
const command = commands.get(name)
   if (command) {
ctx.message.text = ctx.message.text.replace('/start ','').replace(/-/g,' ')
     command(ctx);
return
   }
if(value && value.startsWith('ref')){
var ref = value.split('_')[1]
}else{
var ref = ''
}
	if (!data.pokes) {
    const key = [[]];
    for (let i = 0; i < regions.length; i++) {
        if (i % 4 === 0) {
            key.push([]);
        }
        key[key.length - 1].push({ text: regions[i], callback_data: 'staut_' + regions[i] + '_'+ref+'' });
  }
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Message me in private *',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+'?start=start'}]]}})
return
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*From Which Region You Wanna Start Your Journey?*',{reply_markup:{inline_keyboard:key}})
}else{
if(value && value.startsWith('ref')){
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const id = parseInt(value.split('_')[1])
if(id==ctx.from.id){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You cant refer *Yourself*')
return
}
if(data.extra && (data.extra.pending || data.extra.referred) && ctx.from.id != ADMIN_ID){
const ids = data.extra.pending || data.extra.referred
const data5 = await getUserData(ids)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'You have been already <b>Referred</b> by <b>'+data5.inv.name+'</b>')
return
}
if(level*1 < 20){
const data2 = await getUserData(id)
if(!data2.extra.refer){
data2.extra.refer = []
}
data2.extra.refer.push(ctx.from.id)
data.extra.pending = id
await saveUserData(ctx.from.id,data)
await saveUserData(id,data2)
await sendMessage(ctx,5432006093,'#refer\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) has used <b>'+data2.inv.name+'</b> (<code>'+id+'</code>) refer link.',{parse_mode:'html'})
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'You Have Been Successfully Referred By <b>'+data2.inv.name+'</b>\nReach Level <b>20</b> To Complete Your Refer')
await sendMessage(ctx,id,'<b>'+he.encode(ctx.from.first_name)+'</b> has used your refer link.\nYou will get reward when user reaches <b>Level 20</b>',{parse_mode:'HTML'})
return
}
const userData2 = await getUserData(id)
if(!userData2.extra.refer){
userData2.extra.refer = []
}
if(!userData2.refers){
userData2.refers = 0
}
userData2.refers += 1
userData2.extra.refer.push(ctx.from.id)
data.inv.pc += 1000
data.extra.referred = id
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'You have successfully referred by <b>'+userData2.inv.name+'\n+ 1k PC 💷</b>')
let msg = '<b>'+ctx.from.first_name+'</b> has used your refer link.'
userData2.inv.pc += 500
msg += '\n<b>+500</b> PokeCoins 💷'
if (userData2.refers % 3 === 0) {
const ballTypes = ['level','friend','moon','sport','net','nest','luxury','premier','quick','park','beast'];

// Shuffle the ballTypes array
for (let i = ballTypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ballTypes[i], ballTypes[j]] = [ballTypes[j], ballTypes[i]];
}

const numTypesToAdd = Math.floor(Math.random() * 2) +2;
const selectedTypes = ballTypes.slice(0, numTypesToAdd);
selectedTypes.forEach(type => {
    const randomAmount = Math.floor(Math.random() * 5) + 1;
    userData2.balls[type] = (userData2.balls[type] || 0) + randomAmount;
    msg += `\n<b>+${randomAmount}</b> ${c(type)} Balls`;
});
}
if(userData2.refers % 8 === 0){
const n5 = Object.keys(tms.tmnumber)
const num = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms){
userData2.tms = {}
}
if(!userData2.tms[String(num)]){
userData2.tms[String(num)] = 0
}
userData2.tms[String(num)] += 1
userData2.inv.pc += 1000
if(!userData2.inv.pass){
userData2.inv.pass = 0
}
userData2.inv.pass += 1
msg += '\n<b>+1</b> TM'+num+' ⚙\n<b>+1</b> Safari Pass\n<b>+1000</b> PokeCoins 💷'
}
if(userData2.refers % 13 === 0){
const n5 = Object.keys(tms.tmnumber)
const num = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms){
userData2.tms = {}
}
if(!userData2.tms[String(num)]){
userData2.tms[String(num)] = 0
}
userData2.tms[String(num)] += 1
const num2 = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms[String(num2)]){
userData2.tms[String(num2)] = 0
}
userData2.tms[String(num2)] += 1
const num3 = n5[Math.floor(Math.random()*n5.length)]
if(!userData2.tms[String(num3)]){
userData2.tms[String(num3)] = 0
}
userData2.tms[String(num3)] += 1
userData2.inv.pc += 3000
if(!userData2.inv.pass){
userData2.inv.pass = 0
}
userData2.inv.pass += 1
msg += '\n<b>+1</b> TM'+num+' ⚙\n<b>+1</b> TM'+num2+' ⚙\n<b>+1</b> TM'+num3+' ⚙\n<b>+1</b> Safari Pass\n<b>+3000</b> PokeCoins 💷'
}

  if (userData2.refers % 22 === 0) {
if(!userData2.balls.master){
userData2.balls.master = 0
}
userData2.balls.master += 1
const st = Object.keys(stones)
const stone = st[Math.floor(Math.random()*st.length)]
if(!userData2.inv.stones){
userData2.inv.stones = []
}
userData2.inv.stones.push(stone)
const ar = ['legendary','legendry']
var list = Object.keys(spawn).filter(pk=>ar.includes(spawn[pk].toLowerCase()) && forms[pk])
const name5 = list[Math.floor(Math.random()*list.length)]
const nut = ['gmax','mega','origin','primal']
var fr = forms[name5].filter(pk=> !nut.some((pk2)=> pk.identifier.includes(pk2)) && ar.includes(spawn[pk.identifier].toLowerCase()))
const nam = fr[Math.floor(Math.random()*fr.length)].identifier
const ul = lvls[nam]
let m = Math.max(ul.split('-')[0]*1,5)
let m2 = ul.split('-')[1]*1
const level = Math.floor(Math.random()*(m2-m))+m
const pokeName = nam.toLowerCase()
  const poked = pokes[pokeName]
  if (poked) {
const moves = pokemoves[pokeName]
if(moves){
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < level*1 && dmoves[move.id].power && dmoves[move.id].accuracy)
const am = Math.min(Math.max(moves2.length,1),4)
const omoves = moves2.slice(-am)
const ms = []
for(const m of omoves){
ms.push(m.id)
}
const iv = await generateRandomIVs(spawn[pokeName].toLowerCase())
  const ev = {
"hp":0,
"attack":0,
"defense":0,
"special_attack":0,
"special_defense":0,
"speed":0
};
const pass2 = word(8)
const nat = getRandomNature()
const g = growth_rates[pokeName]
var sy = ''
const exp = chart[g.growth_rate][level]
  const da = {
    name:pokeName,
    id: poked.pokedex_number,
    nature:nat,
    exp:exp,
    pass:pass2,
    ivs: iv,
    symbol: sy,
    evs: ev,
    moves: ms, // Push the randomly selected move ID
  };
if(!userData2.pokes){
userData2.pokes = []
}
userData2.pokes.push(da)
}
}
msg += '\n<b>+1</b> Master Ball\n<b>+1</b> '+c(stone)+'\n<b>+1</b> '+c(nam)+''
  }
await sendMessage(ctx,5432006093,'#refer\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) has reached level 20 and <b>'+userData2.inv.name+'</b> (<code>'+id+'</code>) received :-.\n\n'+msg+'',{parse_mode:'html'})
await sendMessage(ctx,id,msg,{parse_mode:'HTML'})
await saveUserData(id,userData2)
await saveUserData(ctx.from.id,data)
return
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You Have Already Started Your Journey*',{reply_to_message_id:ctx.message.message_id})
}
})

bot.action(/staut_/,async ctx => {
const data = await getUserData(ctx.from.id)
if(data.pokes){
ctx.deleteMessage();
return
}
const ref = ctx.callbackQuery.data.split('_')[2]
if(ctx.callbackQuery.data.split('_')[1]=='back'){

const key = [[]];
    for (let i = 0; i < regions.length; i++) {
        if (i % 4 === 0) {
            key.push([]);
        }
        key[key.length - 1].push({ text: regions[i], callback_data: 'staut_' + regions[i] + '_'+ref+'' });
  }
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*From Which Region You Wanna Start Your Journey?*',{reply_markup:{inline_keyboard:key},parse_mode:'markdown'})
return
}
const pokes = starters[ctx.callbackQuery.data.split('_')[1]]
const key = [[]]
for(let i = 0; i < pokes.length; i++){
key[0].push({text:pokes[i],callback_data:'choose_'+pokes[i]+'_'+ctx.callbackQuery.data.split('_')[1]+'_'+ref+''})
}
key.push([{text:'Back ⬅️',callback_data:'staut_back_'+ref+''}])
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*Which Poke You Wanna Choose As Your Starter*',{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
bot.action(/choose_/, async (ctx) => {
  const poke = ctx.callbackQuery.data.split('_')[1];
  const pokeName = poke.toLowerCase()
  const poked = pokes[pokeName]
const region = ctx.callbackQuery.data.split('_')[2];
const ref = ctx.callbackQuery.data.split('_')[3]
const data = await getUserData(ctx.from.id)
if(data.pokes){
ctx.deleteMessage();
return
}
  if (!poked) {
    ctx.answerCbQuery('n/a');
    return;
  }

const moves = pokemoves[pokeName]
if(!moves){
ctx.answerCbQuery('*This Poke Not Available*')
return
}
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < 6 && dmoves[move.id].power && dmoves[move.id].accuracy && dmoves[move.id].category != 'status')
const amoves = Math.floor(Math.random() * moves2.length)
  const randomMove = moves2[amoves];

  const iv = {
"hp":stat(pokeName),
"attack":stat(pokeName),
"defense":stat(pokeName),
"special_attack":stat(pokeName),
"special_defense":stat(pokeName),
"speed":stat(pokeName)
}

  const ev = {
"hp":0,
"attack":0,
"defense":0,
"special_attack":0,
"special_defense":0,
"speed":0
};
const pass2 = word(8)
const nat = getRandomNature()
const g = growth_rates[pokeName]
const exp = chart[g.growth_rate]["5"]
  const da = {
    name:pokeName,
    id: poked.pokedex_number,
    nature:nat,
    exp:exp,
    pass:pass2,
    ivs: iv,
    symbol: '',
    evs: ev,
    moves: [randomMove.id], // Push the randomly selected move ID
  };
if(!data.pokes){
data.pokes = []
}
data.inv = {
"pc":5000,
"region":"kanto",
"exp":0,
"avtar":"1",
"template":"1",
"id":"grey",
"data":"black"
}
data.balls = {
"regular":10,
"great":7,
"ultra":3
}
data.pokes.push(da)
const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
data.extra = {}
if(ref && ref.length > 0){
const data2 = await getUserData(ref)
await sendMessage(ctx,5432006093,'#refer\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) has used<b>'+data2.inv.name+'</b> (<code>'+ref+'</code>) refer link.',{parse_mode:'html'})
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'You Have Been Successfully Referred By <b>'+data2.inv.name+'</b>\nReach Level <b>20</b> To Complete Your Refer')
await sendMessage(ctx,ref,'<b>'+he.encode(ctx.from.first_name)+'</b> has used your refer link.\nYou will get reward when user reaches <b>Level 20</b>',{parse_mode:'HTML'})

data.extra.pending = ref
}
data.extra.date = `${day}/${month}/${year}`;
data.inv.hometown = region
await saveUserData2(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You Have Successfully Started Your Journey With *'+c(pokeName)+'*',{parse_mode:'markdown'})

});
bot.command('mypokemons',async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
let msg = '*✦ Your Pokemon List*\n'
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,data.pokes)
const pokemon = pokemon2.slice(startIdx,endIdx)
msg += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
const key = []
const row = []
row.push({text:'<',callback_data:'pkege_'+(page-1)+'_'+ctx.from.id+''})
row.push({text:'>',callback_data:'pkege_'+(page+1)+'_'+ctx.from.id+''})
key.push(row)
const totalPages = Math.ceil(data.pokes.length / pageSize);
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'pkege_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'pkege_'+(page+5)+'_'+ctx.from.id+''})
key.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'pkege_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'pkege_'+(page+10)+'_'+ctx.from.id+''})
key.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'pkege_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'pkege_'+(page+25)+'_'+ctx.from.id+''})
key.push(row)
}
const srt = data.extra.sort ? data.extra.sort : 'None'
const dis = data.extra.display ? data.extra.display : 'None'
msg += '\n\n*• Total Pokemons :* '+data.pokes.length+''
msg += '\n*• Displaying :* '+(dis)+''
msg += '\n*• Sorting Method :* '+c(srt)+''
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:key}})
})
bot.action(/pkege_/,async ctx => {
const data = await getUserData(ctx.from.id)
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
ctx.answerCbQuery('You Cant Use')
return
}
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const pageSize = 25
const totalPages = Math.ceil(data.pokes.length / pageSize);
const page = ctx.callbackQuery.data.split('_')[1]*1
if(page < 1 || page > totalPages){
return
}
let msg = '*✦ Your Pokemon List*\n'
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,data.pokes)
const pokemon = pokemon2.slice(startIdx,endIdx)
msg += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
const key = []
const row = []
row.push({text:'<',callback_data:'pkege_'+(page-1)+'_'+ctx.from.id+''})
row.push({text:'>',callback_data:'pkege_'+(page+1)+'_'+ctx.from.id+''})
key.push(row)
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'pkege_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'pkege_'+(page+5)+'_'+ctx.from.id+''})
key.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'pkege_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'pkege_'+(page+10)+'_'+ctx.from.id+''})
key.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'pkege_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'pkege_'+(page+25)+'_'+ctx.from.id+''})
key.push(row)
}
const srt = data.extra.sort ? data.extra.sort : 'None'
const dis = data.extra.display ? data.extra.display : 'None'
msg += '\n\n*• Total Pokemons :* '+data.pokes.length+''
msg += '\n*• Displaying :* '+(dis)+''
msg += '\n*• Sorting Method :* '+c(srt)+''

await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
bot.action(/suger_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[1]
if(ctx.from.id!=id){
ctx.answerCbQuery()
return
}
const name = ctx.callbackQuery.data.split('_')[2]
const query = ctx.callbackQuery.data.split('_')[3]
const msgid = ctx.callbackQuery.data.split('_')[4]
const data = await getUserData(ctx.from.id)
const page = ctx.callbackQuery.data.split('_')[5]*1 || 1
const matches = data.pokes.filter((poke)=> (poke.name==name.toLowerCase()) || (poke.nickname && poke.nickname.toLowerCase() == name.toLowerCase()))
if(matches.length < 1){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You don\'t have *'+c(name)+'*',{parse_mode:'markdown'})
return
}
let msg = ''
const ore = []
const passes = []
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,matches)
const pokemon = pokemon2.slice(startIdx,endIdx)
msg += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:''+query+'_'+p.pass+'_'+ctx.from.id+'_'+msgid+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+id+'_'+name+'_'+query+'_'+msgid+'_'+(page-1)+''})
}
if(endIdx<matches.length){
rows2.push({text:'>',callback_data:'suger_'+id+'_'+name+'_'+query+'_'+msgid+'_'+(page+1)+''})
}
rows.push(rows2)
msg += '\n\nWhich Pokemon You Mean?'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:rows}})
})
bot.action(/delete_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[1]
if(ctx.from.id==id){
ctx.deleteMessage()
}
})
bot.command('stats',async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell whose poke stats you want.*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];

if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_stats_'+ctx.message.message_id+''},{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const n = exp[currentLevel+1] || p2.exp
let n2 = n-p2.exp
let b7 = n2
if(n2==0){
b7 = p2.exp
}
let msg = '➤ *'+c(p2.name)+' '+p2.symbol+'*'
msg += '\n*Level:* '+currentLevel+' | *Nature:* '+c(p2.nature)+''
msg += '\n*Types:* '+c(p.types.join(' / '))+''
msg += '\n*EXP:* '+p2.exp.toLocaleString()+''
msg += '\n*Need To Next Level:* '+n2.toLocaleString()+''
msg += '\n`'+Bar(p2.exp,b7)+'`'
const ivs = p2.ivs
const evs = p2.evs
let ivsText = 'IVs/EVs'
    ivsText += '\nStats                IV |  EV\n';
    ivsText += '—————————————————————————————\n';
    ivsText += `HP                   ${ivs.hp.toString().padStart(2)} |  ${evs.hp}\n`;
    ivsText += `Attack               ${ivs.attack.toString().padStart(2)} |  ${evs.attack}\n`;
    ivsText += `Defense              ${ivs.defense.toString().padStart(2)} |  ${evs.defense}\n`;
    ivsText += `Sp. Attack           ${ivs.special_attack.toString().padStart(2)} |  ${evs.special_attack}\n`;
    ivsText += `Sp. Defense          ${ivs.special_defense.toString().padStart(2)} |  ${evs.special_defense}\n`;
    ivsText += `Speed                ${ivs.speed.toString().padStart(2)} |  ${evs.speed}\n`;
    ivsText += '—————————————————————————————\n';
    ivsText += `Total               ${calculateTotal(ivs)} |  ${calculateTotal(evs)}\n`;
let img = p.front_default_image
const im = shiny.filter((poke)=>poke.name==p2.name)[0]
if(events[p2.name] && p2.symbol == '🪅'){
img = events[p2.name]
}
if(im && p2.symbol=='✨'){
img=im.shiny_url
}
if(!img){
await sendMessage(ctx,ADMIN_ID,'No image for '+name+'')

return}
await sendMessage(ctx,ctx.chat.id,img,{caption:msg,parse_mode:'markdown',reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Stats',callback_data:'ste_'+p2.pass+'_'+ctx.from.id+''},{text:'IVs/EVs',callback_data:'pkisvs_'+p2.pass+'_'+ctx.from.id+''},{text:'Moveset',callback_data:'moves_'+p2.pass+'_'+ctx.from.id+''}]]}})
}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'stats_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_stats_'+ctx.message.message_id+'_'+(page-1)+''})
}
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_stats_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Check Stats Of Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/stats_/,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const mid = ctx.callbackQuery.data.split('_')[3]
if(id!=ctx.from.id){
return
}
const data = await getUserData(ctx.from.id)
const p2 = data.pokes.filter((poke)=> poke.pass == pass)[0]
if(!p2){
ctx.answerCbQuery('Poke Not Found')
return
}
const p = pokes[p2.name]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const n = exp[currentLevel+1] || p2.exp
let n2 = n-p2.exp
let b7 = n2
if(n2==0){
b7 = p2.exp
}
let msg = '➤ *'+c(p2.name)+' '+p2.symbol+'*'
msg += '\n*Level:* '+currentLevel+' | *Nature:* '+c(p2.nature)+''
msg += '\n*Types:* '+c(p.types.join(' / '))+''
msg += '\n*EXP:* '+p2.exp.toLocaleString()+''
msg += '\n*Need To Next Level:* '+n2.toLocaleString()+''
msg += '\n`'+Bar(p2.exp,b7)+'`'
let img = p.front_default_image
const im = shiny.filter((poke)=>poke.name==p2.name)[0]
if(events[p2.name] && p2.symbol == '🪅'){
img = events[p2.name]
}

if(p2.symbol=='✨'){
img=im.shiny_url
}
if(!img){
await sendMessage(ctx,ADMIN_ID,'No image for '+p2.name+'')

return}
ctx.deleteMessage()
await sendMessage(ctx,ctx.chat.id,img,{caption:msg,parse_mode:'markdown',reply_to_message_id:mid,
reply_markup:{inline_keyboard:[[
{text:'Stats',callback_data:'ste_'+p2.pass+'_'+ctx.from.id+''},{text:'IVs/EVs',callback_data:'pkisvs_'+pass+'_'+id+''},{text:'Moveset',callback_data:'moves_'+p2.pass+'_'+ctx.from.id+''}]]}})
})

bot.action(/moves_/,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(id!=ctx.from.id){
return
}
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((poke)=> poke.pass == pass)[0]
let msg = ''
for(const move2 of poke.moves){
let move = dmoves[move2]
msg += '• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+', <b>Accuracy:</b> '+move.accuracy+'% <i>('+c(move.category.charAt(0))+')</i>\n'
}
await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{
inline_keyboard:[[{text:'Info',callback_data:'info_'+pass+'_'+id+''},{text:'IVs/EVs',callback_data:'pkisvs_'+pass+'_'+id+''},
{text:'Stats',callback_data:'ste_'+pass+'_'+id+''}]]}})
})
bot.action(/info_/,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(id!=ctx.from.id){
return
}
const data = await getUserData(ctx.from.id)
const p2 = data.pokes.filter((poke)=> poke.pass == pass)[0]
const p = pokes[p2.name]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const n = exp[currentLevel+1] || p2.exp
let n2 = n-p2.exp
let b7 = n2
if(n2==0){
b7 = p2.exp
}
let msg = '➤ *'+c(p2.name)+' '+p2.symbol+'*'
msg += '\n*Level:* '+currentLevel+' | *Nature:* '+c(p2.nature)+''
msg += '\n*Types:* '+c(p.types.join(' / '))+''
msg += '\n*EXP:* '+p2.exp.toLocaleString()+''
msg += '\n*Need To Next Level:* '+n2.toLocaleString()+''
msg += '\n`'+Bar(p2.exp,b7)+'`'
const ivs = p2.ivs
const evs = p2.evs
let ivsText = 'IVs/EVs'
    ivsText += '\nStats                IV |  EV\n';
    ivsText += '—————————————————————————————\n';
    ivsText += `HP                   ${ivs.hp.toString().padStart(2)} |  ${evs.hp}\n`;
    ivsText += `Attack               ${ivs.attack.toString().padStart(2)} |  ${evs.attack}\n`;
    ivsText += `Defense              ${ivs.defense.toString().padStart(2)} |  ${evs.defense}\n`;
    ivsText += `Sp. Attack           ${ivs.special_attack.toString().padStart(2)} |  ${evs.special_attack}\n`;
    ivsText += `Sp. Defense          ${ivs.special_defense.toString().padStart(2)} |  ${evs.special_defense}\n`;
    ivsText += `Speed                ${ivs.speed.toString().padStart(2)} |  ${evs.speed}\n`;
    ivsText += '—————————————————————————————\n';
    ivsText += `Total               ${calculateTotal(ivs)} |  ${calculateTotal(evs)}\n`;
await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',
reply_markup:{inline_keyboard:[[
{text:'Stats',callback_data:'ste_'+p2.pass+'_'+ctx.from.id+''},{text:'IVs/EVs',callback_data:'pkisvs_'+pass+'_'+id+''},{text:'Moveset',callback_data:'moves_'+p2.pass+'_'+ctx.from.id+''}]]}})
})
bot.action(/ste_/,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(id!=ctx.from.id){
return
}
const data = await getUserData(ctx.from.id)
const p2 = data.pokes.filter((poke)=> poke.pass == pass)[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const base = pokestats[p2.name]
const stats = await Stats(base,p2.ivs,p2.evs,c(p2.nature),level)
const natureEffects = {
    Adamant: { increased: 'attack', decreased: 'special_attack' },
    Bold: { increased: 'defense', decreased: 'attack' },
    Brave: { increased: 'attack', decreased: 'speed' },
    Calm: { increased: 'special_defense', decreased: 'attack' },
    Careful: { increased: 'special_defense', decreased: 'special_attack' },
    Gentle: { increased: 'special_defense', decreased: 'defense' },
    Hasty: { increased: 'speed', decreased: 'defense' },
    Impish: { increased: 'defense', decreased: 'special_attack' },
    Jolly: { increased: 'speed', decreased: 'special_attack' },
    Lax: { increased: 'defense', decreased: 'special_defense' },
    Lonely: { increased: 'attack', decreased: 'defense' },
    Mild: { increased: 'special_attack', decreased: 'defense' },
    Modest: { increased: 'special_attack', decreased: 'attack' },
    Naive: { increased: 'speed', decreased: 'special_defense' },
    Naughty: { increased: 'attack', decreased: 'special_defense' },
    Quiet: { increased: 'special_attack', decreased: 'speed' },
    Rash: { increased: 'special_attack', decreased: 'special_defense' },
    Relaxed: { increased: 'defense', decreased: 'speed' },
    Sassy: { increased: 'special_defense', decreased: 'speed' },
    Timid: { increased: 'speed', decreased: 'attack' }
  };
let statsText = '';
statsText += '\n`Stats          Points`\n';
statsText += '`———————————————————————`\n';
statsText += `\`HP               ${stats.hp.toString().padStart(2)}\`\n`;
statsText += `\`Attack           ${stats.attack.toString().padStart(2)}\` *${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].increased === 'attack' ? '(+)' : ''}${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].decreased === 'attack' ? '(-)' : ''}*\n`;
statsText += `\`Defense          ${stats.defense.toString().padStart(2)}\` *${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].increased === 'defense' ? '(+)' : ''}${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].decreased === 'defense' ? '(-)' : ''}*\n`;
statsText += `\`Sp. Attack       ${stats.special_attack.toString().padStart(2)}\` *${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].increased === 'special_attack' ? '(+)' : ''}${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].decreased === 'special_attack' ? '(-)' : ''}*\n`;
statsText += `\`Sp. Defense      ${stats.special_defense.toString().padStart(2)}\` *${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].increased === 'special_defense' ? '(+)' : ''}${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].decreased === 'special_defense' ? '(-)' : ''}*\n`;
statsText += `\`Speed            ${stats.speed.toString().padStart(2)}\` *${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].increased === 'speed' ? '(+)' : ''}${natureEffects[c(p2.nature)] && natureEffects[c(p2.nature)].decreased === 'speed' ? '(-)' : ''}*\n`;

 await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,''+statsText+'',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Info',callback_data:'info_'+pass+'_'+id+''},{text:'IVs/EVs',callback_data:'pkisvs_'+pass+'_'+id+''},{text:'Moveset',callback_data:'moves_'+pass+'_'+id+''}]]}})
})
bot.action(/pkisvs_/,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(id!=ctx.from.id){
return
}
const data = await getUserData(ctx.from.id)
const p2 = data.pokes.filter((poke)=> poke.pass == pass)[0]
const ivs = p2.ivs
const evs = p2.evs
let ivsText = ''
    ivsText += '\nStats          IV |  EV\n';
    ivsText += '————————————————————————\n';
    ivsText += `HP              ${ivs.hp.toString().padStart(2)} |  ${evs.hp}\n`;
    ivsText += `Attack          ${ivs.attack.toString().padStart(2)} |  ${evs.attack}\n`;
    ivsText += `Defense         ${ivs.defense.toString().padStart(2)} |  ${evs.defense}\n`;
    ivsText += `Sp. Attack      ${ivs.special_attack.toString().padStart(2)} |  ${evs.special_attack}\n`;
    ivsText += `Sp. Defense     ${ivs.special_defense.toString().padStart(2)} |  ${evs.special_defense}\n`;
    ivsText += `Speed           ${ivs.speed.toString().padStart(2)} |  ${evs.speed}\n`;
    ivsText += '————————————————————————\n';
    ivsText += `Total           ${calculateTotal(ivs)} |  ${calculateTotal(evs)}\n`;
 await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'`'+ivsText+'`',{parse_mode:'markdownv2',reply_markup:{inline_keyboard:[[{text:'Info',callback_data:'info_'+pass+'_'+id+''},{text:'Moveset',callback_data:'moves_'+pass+'_'+id+''},{text:'Stats',callback_data:'ste_'+pass+'_'+id+''}]]}})
})


commands.set('hunt', async (ctx) => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to *Hunt* pokemons.',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Hunt',url:'t.me/'+bot.botInfo.username+'?start=hunt'}]]}})
return
}
if(!ctx.session.key){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Opening Keyboard.....*',{reply_markup:{keyboard:[['/hunt','/close']],resize_keyboard:true}})
ctx.session.key = true
}
  const region = data.inv.region
if(!region || !rdata[region]){
 await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Use /travel and go any region*',{reply_to_message_id:ctx.message.message_id})
return
}
if(!data.inv.team){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Use /myteams and set-up your team*',{reply_to_message_id:ctx.message.message_id})
return
}
const currentDate = moment().format('YYYY-MM-DD');
if(!data.extra.huntd || data.extra.huntd != currentDate){
data.extra.huntd = currentDate
data.extra.hunts = 0
}
if(data.extra.hunts > 2000){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You have reached the *Max* amount of hunt *Per Day*',{reply_to_message_id:ctx.message.message_id})
return
}
data.extra.hunts += 1
await saveUserData(ctx.from.id,data)
const mdata = await loadMessageData();
if(mdata.battle.includes(ctx.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You are in a *battle*',{reply_to_message_id:ctx.message.message_id})
return
}
if(Math.random() < 0.0003){
const n5 = Object.keys(tms.tmnumber)
const num = n5[Math.floor(Math.random()*n5.length)]
if(!data.tms){
data.tms = {}
}
if(!data.tms[String(num)]){
data.tms[String(num)] = 0
}
data.tms[String(num)] += 1
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Found A *TM'+num+'* ⚙')
return
}
if(!data.inv.gmax_band && (Math.random()< 0.00005 || (gma > 0 && Math.random() < rar))){
gma -= 1
data.inv.gmax_band = true
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,gmax,{caption:'You found a *Gmax Band*.',parse_mode:'markdown'})
await sendMessage(ctx,5432006093,'#hunt\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) found<code>Gmax Band</code>',{parse_mode:'HTML'})
return
}

if(Math.random()<0.00005){
const st = Object.keys(stones)
const stone = st[Math.floor(Math.random()*st.length)]
await sendMessage(ctx,ctx.chat.id,stones[stone].image,{caption:'You found a *'+c(stone)+'*',parse_mode:'markdown'})
if(!data.inv.stones){
data.inv.stones = []
}
data.inv.stones.push(stone)
await saveUserData(ctx.from.id,data)
return}
if(Math.random() < 0){
const ry = Object.keys(trainers)[Math.floor(Math.random()*Object.keys(trainers).length)]
const ii = trainers[ry]
const me = await sendMessage(ctx,ctx.chat.id,ii,{caption:'*'+c(ry)+'* has *Challenged* you for a *Battle.*',reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Accept',callback_data:'exrtbt_'+ry+''}]]},parse_mode:'markdown'})
ctx.session.name = me.message_id
return
}

let ar = ['common','medium']
const rt = Math.random()
if(rt<0.5){
a = ['rare']
}
if(rt<0.0005){
ar = ['legendry','legendary']
}
if(rt<0.00005){
a = ['mythical']
}
if(data.balls.safari && data.balls.safari > 0){
ar = ['legendry','legendary']
if(Math.random()<0.4){
ar.push('rare')
}
}
let org = 'no'
const list2 = rdata[region]
let rg = data.inv.region
if(['alola', 'melmele', 'akala', 'ulaula', 'poni'].includes(data.inv.region.toLowerCase()) || (data.balls.safari && data.balls.safari > 0 && data.extra.saf.toLowerCase() == 'alola') ){
rg = 'alola'
}
if(['galar', 'isle-of-armor', 'crown-tundra'].includes(data.inv.region.toLowerCase()) || (data.balls.safari && data.balls.safari > 0 && data.extra.saf.toLowerCase() == 'galar') ){
rg = 'galar'
}
if(data.inv.region.toLowerCase()=='hisui' || (data.balls.safari && data.balls.safari > 0 && data.extra.saf.toLowerCase() == 'hisui') ){
rg = 'hisui'
}
if(['paldea', 'kitakami', 'blueberry'].includes(data.inv.region.toLowerCase())){
rg = 'paldea'
}
if(data.extra.evhunt && data.extra.evhunt > 0){
var list = rdata[region].filter(pokemon => {
  const pokemonData = pokes[pokemon];
  return pokemonData && pokemonData.ev_yield.some(([stat, value]) => stat ===  data.extra.evh && value > 1);
});
}else if(data.balls.safari && data.balls.safari > 0){
var list = safari[data.extra.saf.toLowerCase()]
}else{
var list = Object.keys(spawn).filter(pk=>ar.includes(spawn[pk].toLowerCase()) && list2.includes(pk))
}
const name5 = list[Math.floor(Math.random()*list.length)]
const nut = ['gmax','mega','origin','primal','crowned','eternamax']
if(data.extra.evhunt && data.extra.evhunt > 0){
var fr = forms[name5].filter(pokemon => {
  const pokemonData = pokes[pokemon.identifier];
  return pokemonData && pokemonData.ev_yield.some(([stat, value]) => stat ===  data.extra.evh && value > 1 && !nut.some((pk2)=> pokemon.identifier.includes(pk2)));
});
}else if(data.balls.safari && data.balls.safari > 0){
var fr = forms[name5].filter(pk=> !nut.some((pk2)=> pk.identifier.includes(pk2)))
}else{
var fr = forms[name5].filter(pk=> !nut.some((pk2)=> pk.identifier.includes(pk2)) && ar.includes(spawn[pk.identifier].toLowerCase()))
}
const fr2 = fr.filter(pk=>pk.identifier.includes(rg))
const fr3 = fr.filter(pk=> !pk.identifier.includes('alola') && !pk.identifier.includes('galar') && !pk.identifier.includes('hisui') && !pk.identifier.includes('paldea'))
console.log(name5)
let name = fr2.length > 0 ? fr2[Math.floor(Math.random()*fr2.length)].identifier : fr3[Math.floor(Math.random()*fr3.length)].identifier
const im = shiny.filter((poke)=>poke.name==name)[0]
const pdata = pokes[name]
if(!pdata){
return
}
let p = pdata.front_default_image
let s = ''
const l = Math.random()
let chyi = 0.0001
if(org=='yes'){
chyi = 0.05
}
if(im && l<chyi){
p=im.shiny_url
s='✨'
}
if(!p){
await sendMessage(ctx,ADMIN_ID,'No image for '+name+'')

return}
const ul = lvls[name]
let m = Math.max(ul.split('-')[0]*1,5)
let m2 = ul.split('-')[1]*1
const evo2 = chains.evolution_chains.filter((chain)=>chain.evolved_pokemon==name.toLowerCase() && chain.evolution_level && chain.evolution_method == 'level-up')[0]
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==name.toLowerCase() && chain.evolution_level && chain.evolution_method == 'level-up')[0]

if(evo){
m2 = evo.evolution_level
}
if(evo2){
m=evo2.evolution_level
}
if(!m){
m=20
}
if(!m2){
m2 = Math.min((m+30),60)
}

const level = Math.floor(Math.random()*(m2-m))+m
if(s=='🪅'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Found A *Event* 🪅 Pokemon',{reply_markup:{remove_keyboard:true}})
ctx.session.key = false
}


if(s=='✨'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Found A *Shiny* ✨ Pokemon',{reply_markup:{remove_keyboard:true}})
ctx.session.key = false
}
if(!data.pokecaught){
data.pokecaught = []
}
if(data.pokecaught.includes(name)){
var re = '✧ '
}else{
var re = ''
}
let msg = 'A wild *'+c(name)+'* (*Lv.* '+level+') '+s+' has appeared '+re+''
if(data.extra.evhunt && data.extra.evhunt > 0){
const data699 = pokes[name]
let highestEV = { stat: "", value: 0 };

    const evYield = data699.ev_yield;
    evYield.forEach(([stat, value]) => {
      if (value > highestEV.value) {
        highestEV = { stat, value };
      }
    });
msg += '\n+'+highestEV.value+' *'+c(data.extra.evh)+' EV*'
if(data.extra.evhunt == 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You *EV Training* Has Completed')
}
data.extra.evhunt -= 1
await saveUserData(ctx.from.id,data)
}
const m62 = await sendMessage(ctx,ctx.chat.id,p,{caption:msg,parse_mode:'markdown',reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Capture',callback_data:'catch_'+name+'_'+level+'_'+s+'_'+org+''},{text:'EV yield',callback_data:'ev_'+name+''}]]}})
ctx.session.name = m62
});
bot.action(/run_/,async ctx => {
const messageData = await loadMessageData();
if(messageData[ctx.from.id]) {
messageData.battle = messageData.battle.filter((chats)=> chats !==ctx.from.id)
delete messageData[ctx.from.id];
await saveMessageData(messageData)
}
const data = await getUserData(ctx.from.id)
data.extra.hunting = false
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Successfully Escaped')
})
bot.action(/exrtbt_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const name = ctx.callbackQuery.data.split('_')[1]
if(ctx.session.name!=ctx.callbackQuery.message.message_id){
ctx.answerCbQuery(''+c(name)+' Has already gone.')
return
}
const mdata = await loadMessageData();
if(mdata.battle.includes(ctx.from.id)){
ctx.answerCbQuery('You Are In A Battle')
return
}

const level = ctx.callbackQuery.data.split('_')[2]*1
const f = ctx.callbackQuery.data.split('_')[3]
let msg = '<b>✦ The Pokomon battle commences!</b>'
const data = await getUserData(ctx.from.id)
if(data.teams[data.inv.team].length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},' Add Some *Pokes* In Main Team.')
return
}
const bword = word(10)
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const ss = data.teams[data.inv.team][0]
const p = data.pokes.filter((poke)=>poke.pass==ss)[0]
const ut = {}
const p2 = pokes[p.name]
const base2 = pokestats[p.name]
const uname = he.encode(ctx.from.first_name)
const clevel = plevel(p.name,p.exp)
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
const hp = stats.hp
battleData.ot = {}
battleData.omoves = {}
battleData.ivs = {}
battleData.evs = {}
battleData.nat = {}
battleData.level = {}
for(let i=0; i<6;i++){
const o = ['common','medium']
const yr = rdata[data.inv.region].filter((i)=> !Object.keys(ut).includes(i) && !o.includes(spawn[i]))
const nam = yr[Math.floor(Math.random()*yr.length)]
const iv = await generateRandomIVs(spawn[nam].toLowerCase())
  const ev = {
"hp":0,
"attack":0,
"defense":0,
"special_attack":0,
"special_defense":0,
"speed":0
};
const nat = getRandomNature()
const base = pokestats[nam]
const level = 100
const stats2 = await Stats(base,iv,ev,c(nat),level)
const hp2 = stats2.hp
const moves5 = pokemoves[nam]
const moves2 = moves5.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < level && dmoves[move.id].power && dmoves[move.id].accuracy)
const am = Math.min(Math.max(moves2.length,1),4)
const omoves = moves2.slice(-am)
battleData.ot[nam] = hp2
battleData.omoves[nam] = omoves
battleData.ivs[nam] = iv
battleData.evs[nam] = ev
battleData.nat[nam] = nat
battleData.level[nam] = level
}
const cy = Object.keys(battleData.ot)[Math.floor(Math.random()*Object.keys(battleData.ot).length)]
const op = pokes[cy]
battleData.o = cy
const hp2 = battleData.ot[cy]
battleData.ohp = hp2
battleData.name = name
msg += '\n\n<b>Opponent :</b> <a href="tg://user?id='+bot.botInfo.id+'"><b>'+battleData.name+'</b></a>'
msg += '\n<b>'+c(cy)+'</b> ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+level+' | <b>HP :</b> '+hp2+'/'+hp2+''
msg += '\n<code>'+Bar(hp2,hp2)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+hp+'/'+hp+''
msg += '\n<code>'+Bar(hp,hp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'exrmv_'+word+'_'+bword+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'bag_'+bword+''},{text:'Escape',callback_data:'run_'+bword+''},{text:'Pokemon',callback_data:'exrtpk_'+bword+''}]
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows,key2
  };
battleData.c = p.pass
battleData.chp = hp
battleData.name = name
battleData.ded = []
battleData.symbol = ''
if(f && f=='🪅'){
battleData.symbol = '🪅'
}
if(f && f=='✨'){
battleData.symbol = '✨'
}
var la = {}
var tem = {}
for(const p of data.teams[data.inv.team]){
const pk = data.pokes.filter((poke)=> poke.pass == p)
if(pk){
const base = pokestats[pk[0].name]
const clevel = plevel(pk[0].name,pk[0].exp)
const stats = await Stats(base,pk[0].ivs,pk[0].evs,c(pk[0].nature),clevel)
la[pk[0].pass] = clevel
tem[pk[0].pass] = stats.hp
}
}
battleData.team = tem
battleData.la = la
await saveBattleData(bword, battleData);
ctx.session.name = ''
var mg = await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},msg,{reply_markup:keyboard})
const messageData = await loadMessageData();
messageData.battle.push(ctx.from.id)
    messageData[ctx.chat.id] = { mid: mg, timestamp: Date.now(),id:ctx.from.id };
await saveMessageData(messageData);
})
bot.action(/catch_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const name = ctx.callbackQuery.data.split('_')[1]
const data56 = await getUserData(ctx.from.id)
await checkseen(ctx,name)
console.log(ctx.session.name,ctx.callbackQuery.message.message_id)
if(!ctx.session.name || ctx.session.name!=ctx.callbackQuery.message.message_id){
ctx.answerCbQuery(''+c(name)+' Has been fled')
return
}
const mdata = await loadMessageData();
if(mdata.battle.includes(ctx.from.id)){
ctx.answerCbQuery('You Are In A Battle')
return
}

const level = ctx.callbackQuery.data.split('_')[2]*1
const f = ctx.callbackQuery.data.split('_')[3]
const org = ctx.callbackQuery.data.split('_')[4]
let msg = '<b>✦ The Pokomon battle commences!</b>'
const op = pokes[name]
const data = await getUserData(ctx.from.id)
if(data.teams[data.inv.team].length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},' Add Some *Pokes* In Main Team.')
return
}
const ss = data.teams[data.inv.team][0]
const p = data.pokes.filter((poke)=>poke.pass==ss)[0]
const p2 = pokes[p.name]
k = 0
if(spawn[name].toLowerCase() == 'legendry' || spawn[name].toLowerCase()== 'legendary'){
k = 15
}
const iv = await generateRandomIVs(spawn[name].toLowerCase())

  const ev = {
"hp":0,
"attack":0,
"defense":0,
"special_attack":0,
"special_defense":0,
"speed":0
};
const nat = getRandomNature()
const base = pokestats[name]
const base2 = pokestats[p.name]
const uname = he.encode(ctx.from.first_name)
const stats2 = await Stats(base,iv,ev,c(nat),level)
const hp2 = stats2.hp
const clevel = plevel(p.name,p.exp)
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
const hp = stats.hp
const moves5 = pokemoves[name]
const moves2 = moves5.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < level && dmoves[move.id].power && dmoves[move.id].accuracy)
const am = Math.min(Math.max(moves2.length,1),4)
const omoves = moves2.slice(-am)

msg += '\n\n<b>wild</b> '+c(name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+level+' | <b>HP :</b> '+hp2+'/'+hp2+''
msg += '\n<code>'+Bar(hp2,hp2)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+hp+'/'+hp+''
msg += '\n<code>'+Bar(hp,hp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
const bword = word(10)
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'atk_'+word+'_'+bword+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'bag_'+bword+''},{text:'Escape',callback_data:'run_'+bword+''},{text:'Pokemon',callback_data:'pokemon_'+bword+''}]
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows,key2
  };
const cp = word(8)
battleData.c = p.pass
battleData.org = org
battleData.chp = hp
battleData.ochp = hp2
battleData.ohp = hp2
battleData.ivs = iv
battleData.evs = ev
battleData.nat = nat
battleData.cpass = cp
battleData.level = level
battleData.name = name
battleData.omoves = omoves
battleData.ded = []
battleData.ot = {}
battleData.ot[battleData.name] = battleData.ohp
battleData.symbol = ''
if(omoves.length < 1){
ctx.answerCbQuery('Unable To Catch This Poke, Admins Trying To Fix It. Till Please Hunt Another Pokemon',{show_alert:true})
return
}
if(f && f=='🪅'){
battleData.symbol = '🪅'
}
if(f && f=='✨'){
battleData.symbol = '✨'
}
var la = {}
var tem = {}
for(const p of data.teams[data.inv.team]){
const pk = data.pokes.filter((poke)=> poke.pass == p)
if(pk){
const base = pokestats[pk[0].name]
const clevel = plevel(pk[0].name,pk[0].exp)
const stats = await Stats(base,pk[0].ivs,pk[0].evs,c(pk[0].nature),clevel)
la[pk[0].pass] = clevel
tem[pk[0].pass] = stats.hp
}
}
battleData.team = tem
battleData.la = la
await saveBattleData(bword, battleData);
ctx.session.name = ''
if(data.balls.safari && data.balls.safari > 0){
var mg = await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<b>wild</b> '+c(name)+' ['+c(op.types.join(' / '))+'] - <b>Level :</b> '+level+'\n\n<b>Safari Balls:</b> '+data.balls.safari+'',{
reply_markup:{
inline_keyboard:[[{text:'Use Safari Ball',callback_data:'ball_safari_'+bword+''},
{text:'Escape',callback_data:'run_'+bword+''}]]}})
}else{
var mg = await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},msg,{reply_markup:keyboard})
}
const messageData = await loadMessageData();
data.extra.hunting = true
await saveUserData(ctx.from.id,data)
messageData.battle.push(ctx.from.id)
    messageData[ctx.chat.id] = { mid: mg, timestamp: Date.now(),id:ctx.from.id };
await saveMessageData(messageData);
})
bot.action(/atk_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const move = ctx.callbackQuery.data.split('_')[1]
const bword = ctx.callbackQuery.data.split('_')[2]
console.log(bword)
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
const move1 = dmoves[move]
const move2 = dmoves[battleData.omoves[Math.floor(Math.random()*battleData.omoves.length)].id]
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const base = pokestats[battleData.name]
const base2 = pokestats[p.name]
const uname = he.encode(ctx.from.first_name)
const stats2 = await Stats(base,battleData.ivs,battleData.evs,c(battleData.nat),battleData.level)
const clevel = plevel(p.name,p.exp)
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
let a = stats.attack
let d = stats2.defense
let a2 = stats2.attack
let d2 = stats.defense
const t1 = pokes[battleData.name].types[0]
const t2 = pokes[battleData.name].types[1] ? c(pokes[battleData.name].types[1]) : null
const eff1 = await eff(c(move1.type),c(t1),t2)
const t3 = pokes[p.name].types[0]
const t4 = pokes[p.name].types[1] ? c(pokes[p.name].types[1]) : null
const eff2 = await eff(c(move2.type),c(t3),t4)
if(move1.category=='special' || move2.category == 'special'){
a = stats.special_attack
d = stats2.special_defense
a2 = stats2.special_attack
d2 = stats.special_defense
}
const damage = calc(a,d,clevel,move1.power,eff1)
const damage2 = calc(a2,d2,battleData.level,move2.power,eff2)
battleData.chp = Math.max((battleData.chp-damage2),0)
battleData.team[battleData.c] = Math.max((battleData.team[battleData.c]-damage2),0)
battleData.ochp -= damage
battleData.ot[battleData.name] -= damage
await saveBattleData(bword, battleData);
let ms2 = '➩ <b>'+c(p.name)+'</b> Used <b>'+c(move1.name)+'</b> And Dealt <b>'+c(battleData.name)+'</b> <code>'+damage+'</code> HP.'
if(eff1 == 0){
ms2 += '\n<b>✶ It\'s 0x effective!</b>'
}else if(eff1 == 0.5){
ms2 += '\n<b>✶ It\'s not very effective...</b>'
}else if(eff1 == 2){
ms2 += '\n<b>✶ It\'s super effective!</b>'
}else if(eff1 == 4){
ms2 += '\n<b>✶ It\'s incredibly super effective!</b>'
}
if(battleData.ochp < 1){
const baseexp = expdata.filter((poke)=> poke.name == battleData.name)[0]
const g = growth_rates[p.name]
const exp69 = chart[g.growth_rate]["100"]
const clevel = battleData.la[p.pass]
if(baseexp && clevel!=100){
const ee = await calcexp(baseexp.baseExp,battleData.level,clevel)
p.exp = Math.min((p.exp+ee),exp69)
var l2 = await plevel(p.name,p.exp)
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==p.name)[0]
if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= l2 &&  evo.evolution_level > clevel){
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+uname+'</b></a> Your Pokemon <b>'+c(p.name)+'</b> Is Ready To Evolve',{reply_markup:{inline_keyboard:[[{text:'Evolve',url:'t.me/'+bot.botInfo.username+''}]]}})
}
await sendMessage(ctx,ctx.from.id,'*'+c(p.name)+'* Is Ready To Evolve',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Evolve',callback_data:'evy_'+p.name+'_'+p.pass+''}]]}})
}
if((l2-clevel)!= 0){
const moves = pokemoves[p.name]
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at > clevel && move.level_learned_at <= l2 && dmoves[move.id].power && dmoves[move.id].accuracy && dmoves[move.id].category != 'status')
if(moves2.length > 0){
for(const m of moves2){
if(!p.moves.includes(m.id)){
if(p.moves.length < 4){
p.moves.push(m.id)
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.from.id,'<b>'+c(p.name)+'</b> (<b>Lv.</b> '+l2+') Has Learnt A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].',{parse_mode:'HTML'})
}else{
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a>, <b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Wants To Learn A New Move',{reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+''}]]}})
}
const d = new Date().toLocaleString('en-US', options)
const mdata = await loadMessageData();
const m77 = await sendMessage(ctx,ctx.from.id,'<b>'+c(p.name)+'</b> (<b>Lv.</b> '+l2+') Wants To Learn A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].\n\nBut <b>'+c(p.name)+'</b> Already Knows 4 Moves He Have To Forget One Move To Learn <b>'+c(dmoves[m.id].name)+'</b>\n<i>You Have 15 Min To Choose.</i>',{reply_markup:{inline_keyboard:[[{text:'Go Next',callback_data:'lrn_'+p.pass+'_'+m.id+'_'+d+''}]]},parse_mode:'HTML'})
if(!mdata.moves){
mdata.moves = {}
}
mdata.moves[m77.message_id] = {chat:ctx.from.id,td:d,poke:p.name,move:dmoves[m.id].name}
await saveMessageData(mdata)
}
}
}
}
}
await saveUserData(ctx.from.id,data)
}
const data99 = pokes[battleData.name]
let highestEv = { stat: "", value: 0 };

    const evYield = data99.ev_yield;
    evYield.forEach(([stat, value]) => {
      if (value > highestEv.value) {
        highestEv = { stat, value };
      }
    });
if(highestEv.stat=='special-attack'){
highestEv.stat = 'special_attack'
}
if(highestEv.stat=='special-defense'){
highestEv.stat = 'special_defense'
}
const t2 = calculateTotal(p.evs)
console.log(l2)
if((p.evs[highestEv.stat]+highestEv.value) < 252 && (t2+highestEv.value) < 510 && clevel*1!=100){
p.evs[highestEv.stat] = Math.min((highestEv.value+p.evs[highestEv.stat]),252)
await saveUserData(ctx.from.id,data)
}
const al = Object.keys(battleData.ot).filter((pk) => battleData.ot[pk] > 0)
if(al.length < 1){
const ai = Math.floor(battleData.level/10)+1
if(!data.inv.pc){
data.inv.pc = 0
}
data.inv.pc += ai
if(!data.inv.exp){
data.inv.exp = 0
}
const ei = Math.floor(Math.random()*700)+200
data.inv.exp += ei
data.extra.hunting = false
await saveUserData(ctx.from.id,data)
const messageData = await loadMessageData();
if(messageData[ctx.from.id]) {
delete messageData[ctx.from.id];
}
messageData.battle = messageData.battle.filter((chats) => chats !== ctx.from.id)
await saveMessageData(messageData)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(battleData.name)+'* Has Been Fainted\n+'+ai+' 💷',{parse_mode:'markdown'})
return
}else{
	const nu = battleData.name
battleData.name = al[Math.floor(Math.random() *al.length) ]
battleData.ohp = battleData.ot[battleData.c]
ms2 += '\n\n<b>'+c(nu)+'</b> has fainted. <b>'+c(battleData.name) +'</b> came for battle. '
return
}
return
}
ms2 += '\n\n<b><i>'+c(battleData.name) +' is attacking....</i></b> '
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,ms2,{parse_mode:'html'})
await sleep(3000)
if(battleData.chp < 1){
const baseexp = expdata.filter((poke)=> poke.name == battleData.name)[0]
const g = growth_rates[p.name]
const exp69 = chart[g.growth_rate]["100"]
const clevel = battleData.la[p.pass]
if(baseexp && clevel!=100){
const ee = Math.floor(await calcexp(baseexp.baseExp,battleData.level,clevel)/5.5)
p.exp = Math.min((p.exp+ee),exp69)
var l2 = await plevel(p.name,p.exp)
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==p.name)[0]
if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= l2 &&  evo.evolution_level > clevel){
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+uname+'</b></a> Your Pokemon <b>'+c(p.name)+'</b> Is Ready To Evolve',{reply_markup:{inline_keyboard:[[{text:'Evolve',url:'t.me/'+bot.botInfo.username+''}]]}})
}
await sendMessage(ctx,ctx.from.id,'*'+c(p.name)+'* Is Ready To Evolve',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Evolve',callback_data:'evy_'+p.name+'_'+p.pass+''}]]}})
}
if((l2-clevel)!= 0){
const moves = pokemoves[p.name]
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at > clevel && move.level_learned_at <= l2 && dmoves[move.id].power && dmoves[move.id].accuracy && dmoves[move.id].category != 'status')
if(moves2.length > 0){
for(const m of moves2){
if(!p.moves.includes(m.id)){
if(p.moves.length < 4){
p.moves.push(m.id)
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.from.id,'<b>'+c(p.name)+'</b> (<b>Lv.</b> '+l2+') Has Learnt A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].',{parse_mode:'HTML'})
}else{
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a>, <b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Wants To Learn A New Move',{reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+''}]]}})
}
const d = new Date().toLocaleString('en-US', options)
const mdata = await loadMessageData();
const m77 = await sendMessage(ctx,ctx.from.id,'<b>'+c(p.name)+'</b> (<b>Lv.</b> '+l2+') Wants To Learn A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].\n\nBut <b>'+c(p.name)+'</b> Already Knows 4 Moves He Have To Forget One Move To Learn <b>'+c(dmoves[m.id].name)+'</b>\n<i>You Have 15 Min To Choose.</i>',{reply_markup:{inline_keyboard:[[{text:'Go Next',callback_data:'lrn_'+p.pass+'_'+m.id+'_'+d+''}]]},parse_mode:'HTML'})
if(!mdata.moves){
mdata.moves = {}
}
mdata.moves[m77.message_id] = {chat:ctx.from.id,td:d,poke:p.name,move:dmoves[m.id].name}
await saveMessageData(mdata)
}
}
}
}
}
await saveUserData(ctx.from.id,data)
}
let av2 = []
for(const p in battleData.team){
if(battleData.team[p] > 0){
av2.push(p)
}
}
if(av2.length > 0){
const av = [];
for (const p in battleData.team) {
  const al = data.pokes.filter((poke) => poke.pass == p)[0];
  if (al) {
    av.push({ name: p, displayText: '' + c(al.name) + ' (' + battleData.team[p] + ' HP)' });
  }
}

const buttons = av.map((poke) => ({ text: poke.displayText, callback_data: 'snd_' + poke.name + '_' + bword + '' }));
while (buttons.length < 6) {
  buttons.push({ text: 'empty', callback_data: 'empty' });
}

const rows = [];
for (let i = 0; i < buttons.length; i += 2) {
  rows.push(buttons.slice(i, i + 2));
}
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
const key = []
rows.push(key)
const op = pokes[battleData.name]
const uname = he.encode(ctx.from.first_name)
let msg = '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
const move = dmoves[move2]
msg += '\n<b>'+c(move.name)+'</b>['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Which Poke Send For Battle:</i>'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
return
}else{
const messageData = await loadMessageData();
if(messageData[ctx.from.id]) {
messageData.battle = messageData.battle.filter((chats)=> chats!== ctx.from.id)
delete messageData[ctx.from.id];
await saveMessageData(messageData)
}
data.extra.hunting = false
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<b>'+c(battleData.name)+'</b> Used <b>'+c(move2.name)+'</b> And Dealt <b>'+c(p.name)+'</b> <code>'+damage2+'</code> HP.\n\n- <b>'+c(p.name)+'</b> has fainted And You Got <b>Defeated</b>.',{parse_mode:'html'})
return
}
}

const op = pokes[battleData.name]
let msg = '➩ <b>'+c(battleData.name)+'</b> Used <b>'+c(move2.name)+'</b> And Dealt <b>'+c(p.name)+'</b> <code>'+damage2+'</code> HP.'
if(eff1 == 0){
msg += '\n<b>✶ It\'s 0x effective!</b>'
}else if(eff1 == 0.5){
msg += '\n<b>✶ It\'s not very effective...</b>'
}else if(eff1 == 2){
msg += '\n<b>✶ It\'s super effective!</b>'
}else if(eff1 == 4){
msg += '\n<b>✶ It\'s incredibly super effective!</b>'
}
msg += '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Your Next Move:</i>'
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'atk_'+word+'_'+bword+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'bag_'+bword+''},{text:'Escape',callback_data:'run_'+bword+''},{text:'Pokemon',callback_data:'pokemon_'+bword+''}]
const isstone = [...new Set(data.inv.stones)].filter(stone => stones[stone]?.pokemon === p.name)
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows,key2
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard})
const messageData = await loadMessageData();
    messageData[ctx.chat.id] = { mid: ctx.callbackQuery.message.message_id, timestamp: Date.now(),id:ctx.from.id };
    await saveMessageData(messageData);
})
bot.action(/bajkw_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const clevel = plevel(p.name,p.exp)
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
const key = [[{text:'Balls',callback_data:'ballpks_'+bword+''}],
//{text:'Potions',callback_data:'potion_'+bword+''}],
[{text:'⬅️ Back',callback_data:'btl_'+bword+''}]]
const op = pokes[battleData.name]
const uname = he.encode(ctx.from.first_name)
let msg = '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Option In Your Bag:</i>'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:key}})
})
bot.action(/bag_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
if(data.extra.evhunt && data.extra.evhunt > 0){
ctx.answerCbQuery('Cant Catch Poke In Training Zone')
return
}
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const clevel = plevel(p.name,p.exp)
const balls = []
for(const ball in data.balls){
if(data.balls[ball] > 0){
balls.push(ball)
}
}
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
const buttons = balls.map((word) => ({ text: c(word), callback_data: 'ball_'+word+'_'+bword+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
const key = [{text:'⬅️ Back',callback_data:'btl_'+bword+''}]
rows.push(key)
const op = pokes[battleData.name]
const uname = he.encode(ctx.from.first_name)
let msg = '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Which Ball To Use:</i>'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
})
bot.action(/ball_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const ball = ctx.callbackQuery.data.split('_')[1]
const bword = ctx.callbackQuery.data.split('_')[2]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You Thrown A '+c(ball)+' Ball')
const data = await getUserData(ctx.from.id)
data.balls[ball] -= 1
await saveUserData(ctx.from.id,data)
await sleep(600)
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const uname = he.encode(ctx.from.first_name)
const clevel = plevel(p.name,p.exp)
const op = pokes[battleData.name]
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
let msg = '<i>Your <b>'+c(ball)+'</b> Failed.</i>'
msg += '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Your Next Move:</i>'
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'atk_'+word+'_'+bword+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'bag_'+bword+''},{text:'Escape',callback_data:'run_'+bword+''},{text:'Pokemon',callback_data:'pokemon_'+bword+''}]
const isstone = [...new Set(data.inv.stones)].filter(stone => stones[stone]?.pokemon === p.name)
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows,key2
  };
let bonusBall = ballsdata[ball];
if(ball=='level'){
if(clevel <= battleData.level){
bonusBall = 2
}else if(clevel > battleData.level && clevel < battleData.level*2){
bonusBall = 4
}else if(clevel > battleData.level*2 && clevel<battleData.level*4){
bonusBall = 8
}else if(clevel>battleData.level*4){
bonusBall = 16
}
}
if(ball=='net'){
if(op.types.includes('water') || op.types.includes('bug')){
bonusBall = 5.5
}
}
if(ball=='nest'){
if(battleData.level < 30){
bonusBall = ((52-battleData.level*1)/10)
}
}
if(ball == 'repeat'){
if(data.pokecaught.includes(battleData.name)){
bonusBall = 4.7
}
}
if(ball=='quick' && battleData.ochp == battleData.ohp){
bonusBall = 6
}
if(ball=='beast' && spawn[battleData.name].toLowerCase()== 'mythical'){
bonusBall = 7
}

const catchRate = catch_rates[battleData.name]
  const a = Math.floor(((3 * battleData.ohp - 2 * battleData.ochp) * catchRate * bonusBall) / (3 * battleData.ohp))

  for (let i = 0; i < 3; i++) {
    const shakeProbability = Math.floor((65536 / Math.pow((255 / a), 0.25)));
    if (Math.random() * 65536 > shakeProbability) {
if(Math.random()< 0.4){
if(Math.random()< 0.00003){
const idr = ctx.from.id
const dr = await getUserData(idr)
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const d = new Date().toLocaleString('en-US', options)
const my = String(tutors[Math.floor(Math.random()*tutors.length)])
const m77 = await sendMessage(ctx,idr,'As you were <b>Capturing</b> a <b>Pokemon</b>, an adept <b>Move Tutor</b> noticed your deliberate efforts in <b>Catching Pokemon</b>. He approaches you with a <b>Move Tutor</b> called "<b>'+c(dmoves[my].name)+'</b>." This move will only be accessible for the next <b>15 Minutes.</b>\n\n✦ <b>'+c(dmoves[my].name)+'</b> ['+c(dmoves[my].type)+' '+emojis[dmoves[my].type]+']\n<b>Power:</b> '+dmoves[my].power+', <b>Accuracy:</b> '+dmoves[my].accuracy+' (<i>'+c(dmoves[my].category)+'</i>) \n\n• Click below to <b>Select</b> pokemon to teach <b>'+c(dmoves[my].name)+'</b>',{parse_mode:'html',reply_markup:{inline_keyboard:[[{text:'Select',callback_data:'tyrt_'+my+'_'+d+''}]]}})
const mdata = await loadMessageData();
if(!mdata.tutor){
mdata.tutor = {}
}
mdata.tutor[m77.message_id] = {chat:idr,tdy:d,mv:dmoves[my].name}
await saveMessageData(mdata)
}
data.extra.hunting = false
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Your *'+c(ball)+'* Failed And wild *'+c(battleData.name)+'* Has fled.',{parse_mode:'markdown'})
const messageData = await loadMessageData();
if(messageData[ctx.from.id]) {
messageData.battle = messageData.battle.filter((chats)=> chats!== ctx.from.id)
delete messageData[ctx.from.id];
await saveMessageData(messageData)
}
return
}
const messageData = await loadMessageData();
    messageData[ctx.chat.id] = { mid: ctx.callbackQuery.message.message_id, timestamp: Date.now(),id:ctx.from.id };
    await saveMessageData(messageData);
if(ball=='safari'){
if(data.balls.safari && data.balls.safari > 0){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<i>Your Safari Ball Failed.</i>\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+'] - <b>Level :</b> '+battleData.level+'\n\n<b>Safari Balls:</b> '+data.balls.safari+'',{
parse_mode:'HTML',
reply_markup:{
inline_keyboard:[[{text:'Use Safari Ball',callback_data:'ball_safari_'+bword+''},
{text:'Escape',callback_data:'run_'+bword+''}]]}})
return
}else{
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*You are out of safari balls*',{parse_mode:'markdown'})
const messageData = await loadMessageData();
if(messageData[ctx.from.id]) {
messageData.battle = messageData.battle.filter((chats)=> chats!== ctx.from.id)
delete messageData[ctx.from.id];
await saveMessageData(messageData)
}
return
}
return
}
      await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard})
await sleep(800)
      return;
    }
if(i==0){
var a2 = '★'
}else if(i==1){
var a2 = '★ ★'
}else if(i==2){
var a2 = '★ ★ ★'
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,a2)
await sleep(800)
  }
let m = ''
const g = growth_rates[battleData.name]
const exp = chart[g.growth_rate][String(battleData.level)]
const de = pokes[battleData.name]
const nyio = battleData.name
if(battleData.org == 'yes' && Math.random()< 0.98){
const maxlv = plevel(battleData.name,exp)
battleData.name = (Math.random() < 0.7) ? 'ditto' : 'mew'
if(battleData.symbol == '✨'){
battleData.symbol = (Math.random() < 0.85) ? '' : '✨'
}
m = '*OH Shit!* That wasn\'t *'+(nyio)+'* that was *'+c(battleData.name)+'* who was in the form of *'+(nyio)+'*'
const g = growth_rates[battleData.name]
const exp5 = chart[g.growth_rate][String(maxlv)]
battleData.exp = exp5
const moves5 = pokemoves[battleData.name]
const moves2 = moves5.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < maxlv && dmoves[move.id].power && dmoves[move.id].accuracy)
const am = Math.min(Math.max(moves2.length,1),4)
const omoves = moves2.slice(-am)
battleData.omoves = omoves
}
const ms = []
for(const m of battleData.omoves){
ms.push(m.id)
}
const pass2 = word(8)
data.pokes.push({
name:battleData.name,
nature:battleData.nat,
ivs:battleData.ivs,
evs:battleData.evs,
moves:ms,
exp:exp,
id:de.pokedex_number,
pass:pass2,
cpass:battleData.cpass,
symbol:battleData.symbol
})
if(!data.pokecaught){
data.pokecaught = []
}
if(!data.pokecaught.includes(battleData.name)){
data.pokecaught.push(battleData.name)
}
await saveUserData(ctx.from.id,data)
const messageData = await loadMessageData();
if(messageData[ctx.from.id]) {
messageData.battle = messageData.battle.filter((chats)=> chats !== ctx.from.id)
delete messageData[ctx.from.id];
await saveMessageData(messageData)
}
if(Math.random()< 0.00003){
const idr = ctx.from.id
const dr = await getUserData(idr)
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const d = new Date().toLocaleString('en-US', options)
const my = String(tutors[Math.floor(Math.random()*tutors.length)])
const m77 = await sendMessage(ctx,idr,'As you were <b>Capturing</b> a <b>Pokemon</b>, an adept <b>Move Tutor</b> noticed your deliberate efforts in <b>Catching Pokemon</b>. He approaches you with a <b>Move Tutor</b> called "<b>'+c(dmoves[my].name)+'</b>." This move will only be accessible for the next <b>15 Minutes.</b>\n\n✦ <b>'+c(dmoves[my].name)+'</b> ['+c(dmoves[my].type)+' '+emojis[dmoves[my].type]+']\n<b>Power:</b> '+dmoves[my].power+', <b>Accuracy:</b> '+dmoves[my].accuracy+' (<i>'+c(dmoves[my].category)+'</i>) \n\n• Click below to <b>Select</b> pokemon to teach <b>'+c(dmoves[my].name)+'</b>',{parse_mode:'html',reply_markup:{inline_keyboard:[[{text:'Select',callback_data:'tyrt_'+my+'_'+d+''}]]}})
const mdata = await loadMessageData();
if(!mdata.tutor){
mdata.tutor = {}
}
mdata.tutor[m77.message_id] = {chat:idr,tdy:d,mv:dmoves[my].name}
await saveMessageData(mdata)
}
data.extra.hunting = false
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,5432006093,'#caught\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) caught <code>'+c(battleData.name)+'</code>',{parse_mode:'HTML'})
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,''+m+'\n\nSuccessfully Caught *'+c(battleData.name)+'*',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Check Stats',callback_data:'stats_'+pass2+'_'+ctx.from.id+'_0'}]]}})
})
bot.action(/btl_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const uname = he.encode(ctx.from.first_name)
const clevel = plevel(p.name,p.exp)
const op = pokes[battleData.name]
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
let msg = '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Your Next Move:</i>'
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'atk_'+word+'_'+bword+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'bag_'+bword+''},{text:'Escape',callback_data:'run_'+bword+''},{text:'Pokemon',callback_data:'pokemon_'+bword+''}]
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows,key2
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard})
})
bot.action(/pokemon_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const clevel = plevel(p.name,p.exp)
const av = [];
for (const p in battleData.team) {
  const al = data.pokes.filter((poke) => poke.pass == p)[0];
  if (al) {
    av.push({ name: p, displayText: '' + c(al.name) + ' (' + battleData.team[p] + ' HP)' });
  }
}

const buttons = av.map((poke) => ({ text: poke.displayText, callback_data: 'snd_' + poke.name + '_' + bword + '' }));
while (buttons.length < 6) {
  buttons.push({ text: 'empty', callback_data: 'empty' });
}

const rows = [];
for (let i = 0; i < buttons.length; i += 2) {
  rows.push(buttons.slice(i, i + 2));
}
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
const key = [{text:'⬅️ Back',callback_data:'btl_'+bword+''}]
rows.push(key)
const op = pokes[battleData.name]
const uname = he.encode(ctx.from.first_name)
let msg = '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n<b>'+c(move.name)+'</b>['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Which Poke Send For Battle:</i>'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
})
bot.action(/snd_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[2]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
    } catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
const ps = ctx.callbackQuery.data.split('_')[1]
if(battleData.team[ps] < 1){
ctx.answerCbQuery('This Poke Has Died')
return
}
const p = data.pokes.filter((poke)=>poke.pass==ps)[0]
if(!p){
ctx.answerCbQuery('Poke Not Found In Database')
return
}

battleData.c = ps
battleData.chp = battleData.team[ps]
await saveBattleData(bword, battleData);
const uname = he.encode(ctx.from.first_name)
const clevel = plevel(p.name,p.exp)
const op = pokes[battleData.name]
const base2 = pokestats[p.name]
const stats = await Stats(base2,p.ivs,p.evs,c(p.nature),clevel)
let msg = '<i> Sent '+p.name+' For Battle</i>'
msg += '\n\n<b>wild</b> '+c(battleData.name)+' ['+c(op.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+battleData.level+' | <b>HP :</b> '+battleData.ochp+'/'+battleData.ohp+''
msg += '\n<code>'+Bar(battleData.ohp,battleData.ochp)+'</code>'
msg += '\n\n<b>Turn :</b> <code>'+uname+'</code>'
const p2 = pokes[p.name]
msg += '\n<b>'+c(p.name)+'</b> ['+c(p2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+clevel+' | <b>HP :</b> '+battleData.chp+'/'+stats.hp+''
msg += '\n<code>'+Bar(stats.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n<b>'+c(move.name)+'</b>['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
msg += '\n\n<i>Choose Your Next Move:</i>'
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'atk_'+word+'_'+bword+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'bag_'+bword+''},{text:'Escape',callback_data:'run_'+bword+''},{text:'Pokemon',callback_data:'pokemon_'+bword+''}]
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows,key2
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard})
})
bot.action(/ev_/,async ctx => {
const name = ctx.callbackQuery.data.split('_')[1]
const data = pokes[name]
let highestEV = { stat: "", value: 0 };

    const evYield = data.ev_yield;
    evYield.forEach(([stat, value]) => {
      if (value > highestEV.value) {
        highestEV = { stat, value };
      }
    });
ctx.answerCbQuery('For Defeating '+c(name)+' You Poke Will Gain :\n\n'+highestEV.value+' '+highestEV.stat+' EV',{show_alert:true})
})
bot.command('travel',check,check2,async (ctx,next) => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
if(data.balls.safari && data.balls.safari > 0){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Are In *'+c(data.extra.saf)+' Safari Zone*',{reply_to_message_id:ctx.message.message_id})
return
}
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const userLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined
const key = [
  [{ text: userLevel >= 75 ? 'National' : '  ',  callback_data: userLevel >= 75 ? 'travel_national_'+ctx.from.id+'' : 'locked' },],
  [
    { text: 'Kanto', callback_data: 'travel_kanto2_'+ctx.from.id+'' },
    { text: userLevel >= 5 ? 'Johto' : '  ', callback_data: userLevel >= 5 ? 'travel_johto_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 10 ? 'Hoenn' : '  ', callback_data: userLevel >= 10 ? 'travel_hoenn_'+ctx.from.id+'' : 'locked' }
  ],
  [
    { text: userLevel >= 15 ? 'Sinnoh' : '  ',  callback_data: userLevel >= 15 ? 'travel_sinnoh_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 40 ? 'Hisui' : '  ', callback_data: userLevel >= 40 ? 'travel_hisui_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 20 ? 'Unova' : '  ', callback_data: userLevel >= 20 ? 'travel_unova_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 25 ? 'Kalos' : '  ',  callback_data: userLevel >= 25 ? 'travel_kalos_'+ctx.from.id+'' : 'locked' }
  ],
  [
    { text: userLevel >= 30 ? 'Alola' : '  ', callback_data: userLevel >= 30 ? 'travel_alola2_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 50 ? 'Galar' : '  ',  callback_data: userLevel >= 50 ? 'travel_galar2_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 60 ? 'Paldea' : '  ',  callback_data: userLevel >= 60 ? 'travel_paldea2_'+ctx.from.id+'' : 'locked' }
  ],
  [
    { text: userLevel >= 65 ? 'Conquest Gallery' : '  ', callback_data: userLevel >= 65 ? 'travel_conquest-gallery_'+ctx.from.id+'' : 'locked' }
  ]
];

await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Which Region You Wanna Travel?*\n\n*Currently :* _'+c(data.inv.region || 'N/A')+'_',{reply_markup:{inline_keyboard:key}})
})
bot.action('locked',async ctx => {
ctx.answerCbQuery();
})
bot.action(/travel_/,check2q,async ctx => {
const region = ctx.callbackQuery.data.split('_')[1]
let place = false
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
ctx.answerCbQuery()
return
}
const data = await getUserData(ctx.from.id)
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const userLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(region=='back'){
place = true
var key = [
  [{ text: userLevel >= 75 ? 'National' : '  ',  callback_data: userLevel >= 75 ? 'travel_national_'+ctx.from.id+'' : 'locked' },],
  [
    { text: 'Kanto', callback_data: 'travel_kanto2_'+ctx.from.id+'' },
    { text: userLevel >= 5 ? 'Johto' : '  ', callback_data: userLevel >= 5 ? 'travel_johto_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 10 ? 'Hoenn' : '  ', callback_data: userLevel >= 10 ? 'travel_hoenn_'+ctx.from.id+'' : 'locked' }
  ],
  [
    { text: userLevel >= 15 ? 'Sinnoh' : '  ',  callback_data: userLevel >= 15 ? 'travel_sinnoh_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 40 ? 'Hisui' : '  ', callback_data: userLevel >= 40 ? 'travel_hisui_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 20 ? 'Unova' : '  ', callback_data: userLevel >= 20 ? 'travel_unova_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 25 ? 'Kalos' : '  ',  callback_data: userLevel >= 25 ? 'travel_kalos_'+ctx.from.id+'' : 'locked' }
  ],
  [
    { text: userLevel >= 30 ? 'Alola' : '  ', callback_data: userLevel >= 30 ? 'travel_alola2_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 50 ? 'Galar' : '  ',  callback_data: userLevel >= 50 ? 'travel_galar2_'+ctx.from.id+'' : 'locked' },
    { text: userLevel >= 60 ? 'Paldea' : '  ',  callback_data: userLevel >= 60 ? 'travel_paldea2_'+ctx.from.id+'' : 'locked' }
  ],
  [
    { text: userLevel >= 65 ? 'Conquest Gallery' : '  ', callback_data: userLevel >= 65 ? 'travel_conquest-gallery_'+ctx.from.id+'' : 'locked' }
  ]
];
var msg = '*Which Region You Wanna Travel?*'
}else if(region=='kanto2'){
place = true
var key = [
[{text:'Kanto',callback_data:'travel_kanto_'+ctx.from.id+''},{text:'LetsGo-Kanto',callback_data:'travel_letsgo-kanto_'+ctx.from.id+''}],
[{text:'⬅️ Back',callback_data:'travel_back_'+ctx.from.id+''}]
]
var msg = 'Which Place Wanna Go In *Kanto*?'
}else if(region=='kalos'){
place = true
var key = [
[{text:'Central',callback_data:'travel_kalos-central_'+ctx.from.id+''},{text:'Coastal',callback_data:'travel_kalos-coastal_'+ctx.from.id+''},{text:'Mountain',callback_data:'travel_kalos-mountain_'+ctx.from.id+''}],
[{text:'⬅️ Back',callback_data:'travel_back_'+ctx.from.id+''}]
]
var msg = 'Which Place In *Kalos* You Wanna Travel?'
}else if(region=='galar2'){
place = true
var key = [
[{text:'Galar',callback_data:'travel_galar_'+ctx.from.id+''},{text:'Isle Of Armour',callback_data:'travel_isle-of-armor_'+ctx.from.id+''}],
[{text:'Crown Tundra',callback_data:'travel_crown-tundra_'+ctx.from.id+''},{text:'⬅️ Back',callback_data:'travel_back_'+ctx.from.id+''}]
]
var msg = 'Which Place In *Galar* You Wanna Travel?'
}else if(region=='paldea2'){
place = true
var key = [
[{text:'Paldea',callback_data:'travel_paldea_'+ctx.from.id+''},{text:'KitaKami',callback_data:'travel_kitakami_'+ctx.from.id+''},{text:'Blueberry',callback_data:'travel_blueberry_'+ctx.from.id+''}],
[{text:'⬅️ Back',callback_data:'travel_back_'+ctx.from.id+''}]
]
var msg = 'Which Place In *Paldea* You Wanna Travel?'
}else if(region=='alola2'){
place = true
var key = [
[{text:'Alola',callback_data:'travel_alola_'+ctx.from.id+''},{text:'Melemele',callback_data:'travel_melemele_'+ctx.from.id+''},{text:'Akala',callback_data:'travel_akala_'+ctx.from.id+''}],
[{text:'Ulaula',callback_data:'travel_ulaula_'+ctx.from.id+''},{text:'Poni',callback_data:'travel_poni_'+ctx.from.id+''}],
[{text:'⬅️ Back',callback_data:'travel_back_'+ctx.from.id+''}]
]
var msg = 'Which Place In *Aloka* You Wanna Travel?'
}

if(place){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
return
}

if(data.balls.safari && data.balls.safari > 0){
ctx.answerCbQuery('You Are In *'+c(data.extra.saf)+' Safari Zone*')
return
}
data.inv.region = ctx.callbackQuery.data.split('_')[1]
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Successfully Arrived To *'+c(ctx.callbackQuery.data.split('_')[1])+'*',{parse_mode:'markdown'})
})
bot.command('open',async ctx => {
if(ctx.chat.type!='private'){
return
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Opening Keyboard.....*',{reply_markup:{keyboard:[['/hunt','/close']],resize_keyboard:true}})
})
bot.command('close',async ctx => {
ctx.session.key = false
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Closing Keyboard...*',{reply_markup:{remove_keyboard:true}})
})
commands.set('myteams',async ctx => {
const userData = await getUserData(ctx.from.id)
if(!userData.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
if (!userData.teams) {
        userData.teams = {};
userData.inv.team = "1"
    }
    for (let i = 1; i <= 6; i++) {
        if (!userData.teams[i]) {
            userData.teams[i] = [];
        }
    }

    await saveUserData(ctx.from.id, userData);
const team = userData.inv.team*1 || 1
const teampokes = userData.teams[team];
var matching = [];
let b = 1
    for (const pass of teampokes) {
        const matchings = userData.pokes.find((poke) => poke.pass === pass);
        if (matchings) {
            matching.push(pass);
         b++;
}
}
    const list = matching.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
const tea = userData.inv[team] ?userData.inv[team] : team
    let messageText = '❖ *Main Team : '+tea+'*\n\n'
 messageText += await pokelist(matching,ctx,0)
if(ctx.chat.type=='private'){
messageText+='\n\n_Which Team Want To Edit?_'
}else{
messageText+='\n\n_Which Team You Wanna Set As Main?_'
}
if(ctx.message.chat.type=='private'){
var key = [
  [{text:userData.inv["1"] ? userData.inv["1"] : 'Team 1',callback_data:'set_1'},
   {text:userData.inv["2"] ? userData.inv["2"] : 'Team 2',callback_data:'set_2'}],
  [{text:userData.inv["3"] ? userData.inv["3"] : 'Team 3',callback_data:'set_3'},
   {text:userData.inv["4"] ? userData.inv["4"] : 'Team 4',callback_data:'set_4'}],
  [{text:userData.inv["5"] ? userData.inv["5"] : 'Team 5',callback_data:'set_5'},
   {text:userData.inv["6"] ? userData.inv["6"] : 'Team 6',callback_data:'set_6'}]
];
}else{
var key = [
  [{text:userData.inv["1"] ? userData.inv["1"] : 'Team 1',callback_data:'main_1_'+ctx.from.id+''},
   {text:userData.inv["2"] ? userData.inv["2"] : 'Team 2',callback_data:'main_2_'+ctx.from.id+''}],
  [{text:userData.inv["3"] ? userData.inv["3"] : 'Team 3',callback_data:'main_3_'+ctx.from.id+''},
   {text:userData.inv["4"] ? userData.inv["4"] : 'Team 4',callback_data:'main_4_'+ctx.from.id+''}],
  [{text:userData.inv["5"] ? userData.inv["5"] : 'Team 5',callback_data:'main_5_'+ctx.from.id+''},
   {text:userData.inv["6"] ? userData.inv["6"] : 'Team 6',callback_data:'main_6_'+ctx.from.id+''}],
 [{text:'Edit Teams',url:'t.me/'+bot.botInfo.username+'?start=myteams'}]
];
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},messageText,{reply_markup:{inline_keyboard:key}})
})
bot.action(/set_/, check2q,async (ctx) => {
const userData = await getUserData(ctx.from.id);
    const team = ctx.callbackQuery.data.split('_')[1];

    if (!userData.teams || !userData.teams[team]) {
        ctx.answerCbQuery('Team not found or has no pokes.', { show_alert: true });
        return;
    }

    const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass);
         b++;
}
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
let messageText = '*Main :* `' + main + '`\n';
messageText += await pokelist(matchings,ctx,0)
messageText += '\n\n_Choose Any Option Below_'
ctx.answerCbQuery('Edit Your Team '+team+'')
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'Markdown',reply_markup:{inline_keyboard:[[{text:'Add Poke',callback_data:'add_'+team+''},{text:'Remove Poke',callback_data:'remove_'+team+''}],[{text:'Change Order',callback_data:'change_order_'+team+''},{text:'Randomize',callback_data:'randomize_'+team+''}],[{text:'Reset Team',callback_data:'rest_'+team+''},{text:'Main',callback_data:'main_'+team+''}],[{text:'Rename',callback_data:'rename_'+team+''},{text:'🔙Back',callback_data:'teams'}]]}})
})
bot.action(/rename_/,async ctx => {
const team = ctx.callbackQuery.data.split('_')[1]
ctx.deleteMessage();
const message = await sendMessage(ctx,ctx.chat.id,'Tell A New Name For *Team '+team+'*',{parse_mode:'markdown',reply_markup:{force_reply:true}})
const userData = {
      messageId: message,
      teamn: team // You can set the name to whatever you like
    };
    userState.set(ctx.from.id, userData);
  });
bot.action(/randomize_/,check2q,async ctx => {
const data = await getUserData(ctx.from.id)
const team = ctx.callbackQuery.data.split('_')[1]
const pk5 = []
for(let i = 1; i <=6; i++){
const pk = data.pokes.filter((pk2)=> !pk5.includes(pk2.pass))
if(pk.length > 0){
const ran = pk[Math.floor(Math.random()*pk.length)]
pk5.push(ran.pass)
}
}
if(data.teams[team] == pk5){
return
}
data.teams[team] = pk5
await saveUserData(ctx.from.id, data);
const userData = data
const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass)
         b++;
}
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
let messageText = '*Main :* `' + main + '`\n';
messageText += await pokelist(matchings,ctx,0)
messageText += '\n\n_Choose Any Option Below_'
ctx.answerCbQuery('Created Random Team')
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'Markdown',reply_markup:{inline_keyboard:
[[{text:'Add Poke',callback_data:'add_'+team+''},{text:'Remove Poke',callback_data:'remove_'+team+''}],
[{text:'Change Order',callback_data:'change_order_'+team+''},{text:'Randomize',callback_data:'randomize_'+team+''}],
[{text:'Reset Team',callback_data:'rest_'+team+''},{text:'Main',callback_data:'main_'+team+''}],
[{text:'Rename',callback_data:'rename_'+team+''},{text:'🔙Back',callback_data:'teams'}]]}})
})

bot.action('teams',check2q,async ctx => {
const userData = await getUserData(ctx.from.id);
const team = userData.inv.team*1 || 1
const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass);
         b++;
}
    }
    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
var main = '✅';
    }
const tea = userData.inv[team] ?userData.inv[team] : team
    let messageText = '❖ *Main Team : '+tea+'*\n\n'
 messageText += await pokelist(matchings,ctx,0)

messageText+='\n\n_Which Team Want To Edit?_'

await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'markdown',reply_markup:{inline_keyboard: [
  [{text:userData.inv["1"] ? userData.inv["1"] : 'Team 1',callback_data:'set_1'},
   {text:userData.inv["2"] ? userData.inv["2"] : 'Team 2',callback_data:'set_2'}],
  [{text:userData.inv["3"] ? userData.inv["3"] : 'Team 3',callback_data:'set_3'},
   {text:userData.inv["4"] ? userData.inv["4"] : 'Team 4',callback_data:'set_4'}],
  [{text:userData.inv["5"] ? userData.inv["5"] : 'Team 5',callback_data:'set_5'},
   {text:userData.inv["6"] ? userData.inv["6"] : 'Team 6',callback_data:'set_6'}]
]}})
})
bot.action(/rest_/,check2q,async ctx => {
let userData = {};
  try {
    userData = await getUserData(ctx.from.id);
    } catch (error) {
 userData = {};
  }
 const team = ctx.callbackQuery.data.split('_')[1]
const count = userData.teams[team].length
if(count<1){
ctx.answerCbQuery('Add Some Pokes First')
return
}
userData.teams[team] = []
await saveUserData(ctx.from.id, userData);;
if (!userData.teams || !userData.teams[team]) {
        ctx.answerCbQuery('Team not found or has no pokes.', { show_alert: true });
        return;
    }

    const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass)
         b++;
}
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }

let messageText = '*Main :* `' + main + '`\n';
messageText += await pokelist(matchings,ctx,0)
messageText += '\n\n_Choose Any Option Below_'
ctx.answerCbQuery('Reseted Team '+team+'')
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'Markdown',reply_markup:{inline_keyboard:[[{text:'Add Poke',callback_data:'add_'+team+''},{text:'Remove Poke',callback_data:'remove_'+team+''}],[{text:'Change Order',callback_data:'change_order_'+team+''},{text:'Randomize',callback_data:'randomize_'+team+''}],[{text:'Reset Team',callback_data:'rest_'+team+''},{text:'Main',callback_data:'main_'+team+''}],[{text:'Rename',callback_data:'rename_'+team+''},{text:'🔙Back',callback_data:'teams'}]]}})
})
bot.action(/main_/,check2q,async ctx => {
const userData = await getUserData(ctx.from.id);
 const team = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2] || false
if(id && ctx.from.id!=id){
ctx.answerCbQuery()
return
}
const count = userData.teams[team].length
if(userData.inv.team && userData.inv.team==team){
ctx.answerCbQuery('Already Main')
return
}
if(count<1){
ctx.answerCbQuery('Add Some Pokes First')
return
}
userData.inv.team = team
await saveUserData(ctx.from.id, userData);;
if (!userData.teams || !userData.teams[team]) {
        ctx.answerCbQuery('Team not found or has no pokes.', { show_alert: true });
        return;
    }

    const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass)
         b++;
}
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
const tea = userData.inv[team] ?userData.inv[team] : team
    let messageText = '❖ *Main Team : '+tea+'*\n'
 messageText += await pokelist(matchings,ctx,0)
if(ctx.chat.type=='private'){
messageText+='\n\n_Which Team Want To Edit?_'
}else{
messageText+='\n\n_Which Team You Wanna Set As Main?_'
}
if(ctx.chat.type=='private'){
var key = [
  [{text:userData.inv["1"] ? userData.inv["1"] : 'Team 1',callback_data:'set_1'},
   {text:userData.inv["2"] ? userData.inv["2"] : 'Team 2',callback_data:'set_2'}],
  [{text:userData.inv["3"] ? userData.inv["3"] : 'Team 3',callback_data:'set_3'},
   {text:userData.inv["4"] ? userData.inv["4"] : 'Team 4',callback_data:'set_4'}],
  [{text:userData.inv["5"] ? userData.inv["5"] : 'Team 5',callback_data:'set_5'},
   {text:userData.inv["6"] ? userData.inv["6"] : 'Team 6',callback_data:'set_6'}]
];
}else{
var key = [
  [{text:userData.inv["1"] ? userData.inv["1"] : 'Team 1',callback_data:'main_1_'+ctx.from.id+''},
   {text:userData.inv["2"] ? userData.inv["2"] : 'Team 2',callback_data:'main_2_'+ctx.from.id+''}],
  [{text:userData.inv["3"] ? userData.inv["3"] : 'Team 3',callback_data:'main_3_'+ctx.from.id+''},
   {text:userData.inv["4"] ? userData.inv["4"] : 'Team 4',callback_data:'main_4_'+ctx.from.id+''}],
  [{text:userData.inv["5"] ? userData.inv["5"] : 'Team 5',callback_data:'main_5_'+ctx.from.id+''},
   {text:userData.inv["6"] ? userData.inv["6"] : 'Team 6',callback_data:'main_6_'+ctx.from.id+''}]
];
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{reply_markup:{inline_keyboard:key},parse_mode:'markdown'})
})
bot.action(/add_/, check2q,async ctx => {
const userData = await getUserData(ctx.from.id);
  const team = ctx.callbackQuery.data.split('_')[1];
let pokes = await sort(ctx.from.id,userData.pokes);
if(userData.inv.sort){
pokes = await sort(ctx.from.id,userData.pokes,userData.inv.sort)
}
  const buttonsPerRow = 5;
  let page = parseInt(ctx.callbackQuery.data.split('_')[2]) || 1
  const itemsPerPage = 20;
const totalPages = Math.ceil(userData.pokes.length / itemsPerPage);
if(page<1 || page > totalPages){
return
}
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pokes.length);
  const inlineKeyboard = [];
  let row = [];

for (let i = startIndex; i < endIndex; i++) {
  const sortedIndex = userData.pokes.indexOf(pokes[i]);
  row.push({
    text: `${sortedIndex + 1}`,
    callback_data: `select_${userData.pokes[i].pass}_${team}`,
  });

  if ((sortedIndex + 1) % buttonsPerRow === 0 || sortedIndex === endIndex - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(page>1 || endIndex<pokes.length){
const row2 = []
row2.push({text:'<',callback_data:'add_'+team+'_'+(page-1)+''})
row2.push({text:'>',callback_data:'add_'+team+'_'+(page+1)+''})
inlineKeyboard.push(row2)
}
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'add_'+team+'_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'add_'+team+'_'+(page+5)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'add_'+team+'_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'add_'+team+'_'+(page+10)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'add_'+team+'_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'add_'+team+'_'+(page+25)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}


inlineKeyboard.push([{text:'⬅️ Back',callback_data:'set_'+team+''}])
const pk = pokes.slice(startIndex,endIndex)
  let messageText = `*List Of Your Pokes (Page ${page}):*\n`;
messageText += await pokelist(pk.map(item => item.pass),ctx,startIndex)
  messageText += '\n\n_Select Poke To Add In Team ' + team + '_';

  const keyboard = {
    inline_keyboard: inlineKeyboard,
  };
  await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'markdown', reply_markup: keyboard });
});
bot.action(/select_/,check2q, async (ctx) => {
    const pass = ctx.callbackQuery.data.split('_')[1];
    const team = ctx.callbackQuery.data.split('_')[2];

    const userId = ctx.from.id;
    const userData = await getUserData(ctx.from.id);

    if (!userData.pokes) {
        userData.pokes = [];
    }

    if (!userData.teams) {
        userData.teams = {};
    }

    if (!userData.teams[team]) {
        userData.teams[team] = [];
    }

    let io = [];
    for (const t of userData.teams[team]) {
        for (const poke of userData.pokes) {
            if (poke.pass == t) {
                io.push(poke);
            }
        }
    }

    if (io.length >= 6) {
        ctx.answerCbQuery(userData.inv[team] ? userData.inv[team] : 'Team ' + team + ' already has 6 pokes.', { show_alert: true });
        return;
    }

    const pok = userData.pokes.find((poke) => poke.pass === pass);

    if (!pok) {
        ctx.answerCbQuery('Poke not found.', { show_alert: true });
        return;
    }

    if (userData.teams[team].includes(pass)) {
        ctx.answerCbQuery('Poke is already in Team ' + team, { show_alert: true });
return
}
userData.teams[team].push(pass);
            await saveUserData(userId, userData);
if (!userData.teams || !userData.teams[team]) {
        ctx.answerCbQuery('Team not found or has no pokes.', { show_alert: true });
        return;
    }

    const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass)
         b++;
}
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
let messageText = '*Main :* `' + main + '`\n';
messageText += await pokelist(matchings,ctx,0)
messageText += '\n\n_Choose Any Option Below_'
ctx.answerCbQuery('Added Pokemon To Team')
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'Markdown',reply_markup:{inline_keyboard:[[{text:'Add Poke',callback_data:'add_'+team+''},{text:'Remove Poke',callback_data:'remove_'+team+''}],[{text:'Change Order',callback_data:'change_order_'+team+''},{text:'Randomize',callback_data:'randomize_'+team+''}],[{text:'Reset Team',callback_data:'rest_'+team+''},{text:'Main',callback_data:'main_'+team+''}],[{text:'Rename',callback_data:'rename_'+team+''},{text:'🔙Back',callback_data:'teams'}]]}})
})
bot.action(/remove_/,check2q,async ctx => {
const userData = await getUserData(ctx.from.id);
const team = ctx.callbackQuery.data.split('_')[1]
let pokes = userData.pokes
const buttonsPerRow = 2;
let inlineKeyboard = [];
let row = [];
let buttonNumber = 1; // Initialize the button number
const pok = userData.teams[team]
for(const sl of pok){
for(const sl2 of pokes){
if(sl==sl2.pass){
row.push({
      text: `${buttonNumber}. ${sl2.name}`,
      callback_data: `rjem_${sl2.pass}_${team}`,
    });
    if (row.length === buttonsPerRow || buttonNumber === pokes.length - 1) {
      inlineKeyboard.push(row);
      row = [];
    }
    buttonNumber++; // Increment the button number
  }
}
}
if (row.length > 0 && row.length < buttonsPerRow) {
  while (row.length < buttonsPerRow) {
    row.push({ text: ' ', callback_data: 'empty' });
  }
  inlineKeyboard.push(row);
}
inlineKeyboard.push([{ text: '🔙Back', callback_data: 'set_'+team+'' }]);
let messageText = '';
messageText += '\n*Select Poke To Remove From Team ' + team + '*';
const keyboard = {
  inline_keyboard: inlineKeyboard,
};
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'markdown',reply_markup:keyboard})
})
bot.action(/rjem_/,check2q, async (ctx) => {
    const pass = ctx.callbackQuery.data.split('_')[1];
    const team = ctx.callbackQuery.data.split('_')[2];
    const userId = ctx.from.id;
    const userData = await getUserData(ctx.from.id);


    if (!userData.teams) {
        userData.teams = {};
    }

    if (!userData.teams[team]) {
        userData.teams[team] = [];
    }
        userData.teams[team] = userData.teams[team].filter(p => p !== pass);
        await saveUserData(userId, userData);
const pokes = userData.teams[team];
    const matchings = [];
let b = 1
    for (const pass of pokes) {
        const matching = userData.pokes.find((poke) => poke.pass === pass);
        if (matching) {
            matchings.push(pass)
         b++;
}
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
let messageText = '*Main :* `' + main + '`\n';
messageText += await pokelist(matchings,ctx,0)
messageText += '\n\n_Choose Any Option Below_'
ctx.answerCbQuery('Removed Pokemon From Team')
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'Markdown',reply_markup:{inline_keyboard:
[[{text:'Add Poke',callback_data:'add_'+team+''},{text:'Remove Poke',callback_data:'remove_'+team+''}],
[{text:'Change Order',callback_data:'change_order_'+team+''},{text:'Randomize',callback_data:'randomize_'+team+''}],
[{text:'Reset Team',callback_data:'rest_'+team+''},{text:'Main',callback_data:'main_'+team+''}],
[{text:'Rename',callback_data:'rename_'+team+''},{text:'🔙Back',callback_data:'teams'}]]}})
})
bot.action(/change_order_/, check2q,async (ctx) => {
    const userData = await getUserData(ctx.from.id);
    const team = ctx.callbackQuery.data.split('_')[2];
    let slugsInTeam = [];

    if (userData && userData.teams && userData.teams[team]) {
        slugsInTeam = userData.teams[team];
    } else {
        ctx.answerCbQuery('Team Is Invalid Or Empty.', { show_alert: true });
        return;
    }

    const slugPasses = slugsInTeam.map((pass) => {
        const matchingSlug = userData.pokes.find((slug) => slug.pass === pass);
        return matchingSlug ? matchingSlug.pass : '';
    });

    // Filter out empty passes
    const validSlugPasses = slugPasses

    // Initial message to select two slugs to swap
    let messageText = '';
    messageText += '\n\nWhich Pokemon You Wanna Swap?';

    const inlineKeyboard = validSlugPasses.map((pass) => {
for(const slug of userData.pokes){
        if (slug.pass == pass) {
            return {
                text: c(slug.name),
                callback_data: `fswc_${team}_${slug.pass}`,
            };
        }
}
        return null;
    }).filter((button) => button !== null);

    inlineKeyboard.push({ text: '🔙Back', callback_data: 'set_' + team });

    const buttonsPerRow = 2;
    const keyboardChunks = [];
    for (let i = 0; i < inlineKeyboard.length; i += buttonsPerRow) {
        keyboardChunks.push(inlineKeyboard.slice(i, i + buttonsPerRow));
    }

    const keyboard = {
        inline_keyboard: keyboardChunks,
    };

    await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'markdown', reply_markup: keyboard });
});

bot.action(/fswc_/, check2q,async (ctx) => {
    const userData = await getUserData(ctx.from.id);


    const team = ctx.callbackQuery.data.split('_')[1];
    const selectedSlugPass = ctx.callbackQuery.data.split('_')[2];
let slugsInTeam = [];
    if (userData && userData.teams && userData.teams[team]) {
slugsInTeam = userData.teams[team];
    } else {
ctx.answerCbQuery('Team Is Invalid Or Empty.', { show_alert: true });
        return;                                                                                     }                                                                                                                                                                                               // Ensure that the user has the slugs with these passes
const slugPasses = slugsInTeam.map((pass) => {
        const matchingSlug = userData.pokes.find((slug) => slug.pass === pass);
return matchingSlug ? matchingSlug.pass : '';
    });
// Filter out empty passes
    const validSlugPasses = slugPasses



    // Check if the user has a slug with the selected pass
    const selectedSlugIndex = validSlugPasses.findIndex((pass) => pass === selectedSlugPass);

    if (selectedSlugIndex === -1) {
        ctx.answerCbQuery('You not have the choosen pokemon anymore.', { show_alert: true });
        return;
    }
const p6 = userData.pokes.filter((p7) =>p7.pass==selectedSlugPass)[0]
    // Edit the message to ask for the second slug to swap
    let messageText = 'Which Pokemon You Wanna Replace With *'+c(p6.name)+'*';

    const inlineKeyboard = validSlugPasses.map((pass) => {
for(const slug of userData.pokes){
if (pass == slug.pass) {
            return {
                text: (pass==selectedSlugPass) ? ' ' : c(slug.name),
                callback_data: `swap_confirm_${team}_${selectedSlugPass}_${slug.pass}`,
            };
        }
}
        return null;
    }).filter((button) => button !== null);

    inlineKeyboard.push({ text: '🔙Back', callback_data: 'set_' + team });

    const buttonsPerRow = 2;
    const keyboardChunks = [];
    for (let i = 0; i < inlineKeyboard.length; i += buttonsPerRow) {
        keyboardChunks.push(inlineKeyboard.slice(i, i + buttonsPerRow));
    }

    const keyboard = {
        inline_keyboard: keyboardChunks,
    };

    await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'markdown', reply_markup: keyboard });
});

bot.action(/swap_confirm_/, check2q,async (ctx) => {
    const userData = await getUserData(ctx.from.id);

    const team = ctx.callbackQuery.data.split('_')[2];
    const pass1 = ctx.callbackQuery.data.split('_')[3];
    const pass2 = ctx.callbackQuery.data.split('_')[4];
    const slugsInTeam = userData.teams[team];

    // Find the indices of the slugs with pass1 and pass2
    const index1 = slugsInTeam.findIndex((pass) => pass === pass1);
    const index2 = slugsInTeam.findIndex((pass) => pass === pass2);

    // Swap the passes
    if (index1 !== -1 && index2 !== -1) {
        slugsInTeam[index1] = pass2;
        slugsInTeam[index2] = pass1;
    }

    // Save the updated data
    await saveUserData(ctx.from.id, userData);

    // Edit the message to show the updated order
    const matchings = [];
    let b = 1;

    for (const pass of slugsInTeam) {
        const matchingSlug = userData.pokes.find((slug) => slug.pass === pass);
        if (matchingSlug) {
            matchings.push(pass);
            b++;
        }
    }

    const list = matchings.join('\n');

    if (!userData.inv || userData.inv.team !== team) {
        var main = '❌';
    } else {
        var main = '✅';
    }
let messageText = '*Main :* `' + main + '`\n';
messageText += await pokelist(matchings,ctx,0)
messageText += '\n\n_Choose Any Option Below_'
ctx.answerCbQuery('Swapped Both Pokemons')

await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText,{parse_mode:'Markdown',reply_markup:{inline_keyboard:
[[{text:'Add Poke',callback_data:'add_'+team+''},{text:'Remove Poke',callback_data:'remove_'+team+''}],
[{text:'Change Order',callback_data:'change_order_'+team+''},{text:'Randomize',callback_data:'randomize_'+team+''}],
[{text:'Reset Team',callback_data:'rest_'+team+''},{text:'Main',callback_data:'main_'+team+''}],
[{text:'Rename',callback_data:'rename_'+team+''},{text:'🔙Back',callback_data:'teams'}]]}})
})

bot.command('mybag',async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
if(!data.inv.pc){
data.inv.pc = 0
}
let msg = '*💷 PokeCoins:* '+data.inv.pc+'\n'
let msgg = ''
if(data.inv.candy && data.inv.candy > 0){
msg += '\n• *🍬 Candies:* '+data.inv.candy+''
}
if(data.inv.vitamin && data.inv.vitamin > 0){
msg += '\n• *💉 Vitamins:* '+data.inv.vitamin+''
}
if(data.inv.berry && data.inv.berry > 0){
msg += '\n• *🍒 Berries:* '+data.inv.berry+''
}
if(data.inv.ring){
msgg += '\n• *🧬 Key Stone:* Equipped'
}
if(data.inv.pass && data.inv.pass > 0){
msg += '\n• *🀄 Safari Pass:* '+data.inv.pass+''
}
const items = ['inventory','balls','tms','items']
let item = 'inventory'
const ind = items.indexOf(item)
const t1 = items[ind-1] || 'hh'
const t2 = items[ind+1] || 'hh'
const rows = [{text:'<',callback_data:'poag_'+t1+'_'+ctx.from.id+''},{text:c(item),callback_data:'nouse'},
{text:'>',callback_data:'poag_'+t2+'_'+ctx.from.id+''}]
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[rows]}})
})
bot.action(/vyast:/,async ctx => {
const id = ctx.callbackQuery.data.split(':')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const item = ctx.callbackQuery.data.split(':')[1]
const sts = [...new Set(data.inv.stones)]
const stone = sts[item]
const counts = data.inv.stones.reduce((count, word) => word.toLowerCase() === stone ? count + 1 : count, 0);
u = ''
if(!data.inv.ring){
u = '(_Key Stone Required_)'
}
const msg = 'This item known as *'+c(stone)+'*\n• This *Transformational Item* can transform *'+c(stones[stone].pokemon)+'* into *'+c(stones[stone].mega)+'* in a battle '+u+'.\n\n*Total Owned:* '+counts+''
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Back',callback_data:'poag_transformational_'+ctx.from.id+''}]]},link_preview_options:{url:stones[stone].image,show_above_text:true}})
})
bot.action(/sysu:/,async ctx => {
const id = ctx.callbackQuery.data.split(':')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const item = ctx.callbackQuery.data.split(':')[1]
if(item=='mega-ring'){
var img = 'https://graph.org/file/0f09364d4e44755595dea.jpg'
var des = 'This *Special Item* is required to use *MegaStone* within a battle. Without it you won\'t able to use a *MegaStone*'
}
if(item=='gmax-band'){
var img = gmax
var des = 'This *Special Item* is required to *Giantamax* a gmax capable *Pokemon* within a battle.'
}
var msg = 'This Item knows as *'+c(item)+'*\n• '+des+''
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Back',callback_data:'poag_special_'+ctx.from.id+''}]]},link_preview_options:{url:img,show_above_text:true}})
})

bot.action(/poag_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const item = ctx.callbackQuery.data.split('_')[1]
const items = ['inventory','balls','tms','items']
const data = await getUserData(ctx.from.id)
const store = items.filter((storeitem)=>storeitem!=item)
const ind = items.indexOf(item)
const t1 = items[ind-1] || 'hh'
const t2 = items[ind+1] || 'hh'
const rows = [{text:'<',callback_data:'poag_'+t1+'_'+ctx.from.id+''},{text:c(item),callback_data:'nouse'},
{text:'>',callback_data:'poag_'+t2+'_'+ctx.from.id+''}]
if(item=='potions'){
let msg = '*Coming Soon*'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:[rows]}})
return
}
if(item=='tms'){
let msg = '*TMs ⚙*\n\n'
if(!data.tms){
data.tms = {}
}
for(const tm in data.tms){
if(data.tms[tm] >0){
let h = ''
if(data.tms[tm] > 1){
h = '('+data.tms[tm]+')'
}
const t = tms.tmnumber[String(tm)]
msg += '• */TM'+tm+' -* '+c(dmoves[t].name)+' '+h+'\n'
}
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:[rows]}})
return
}
if(item=='special'){
const its = []
if(data.inv.ring){
its.push('mega-ring')
}
if(data.inv.gmax_band){
its.push('gmax-band')
}
const bt = [{text:'Back',callback_data:'poag_items_'+ctx.from.id+''}]
if(its.length < 1){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You does not have any *Special Item*',{parse_mode:'markdown',reply_markup:{inline_keyboard:[bt]}})
return
}
const ore = []
let message = 'You Have Following *Special Items* :-'
const page = ctx.callbackQuery.data.split('_')[3]*1 || 1
const pageSize = 15
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
if(ctx.callbackQuery.data.split('_')[3]*1 < 1 || startIdx > its.length){
return
}
const stn = its.slice(startIdx,endIdx)
let b = startIdx
for(const p of stn){
ore.push({text:c(p),callback_data:'sysu:'+p+':'+ctx.from.id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 3) {
    rows.push(ore.slice(i, i + 3));
}
rows.push(bt)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,message,{reply_markup:{inline_keyboard:rows},parse_mode:'markdown'})
return
}
if(item=='transformational'){
const sts = [...new Set(data.inv.stones)]
const bt = [{text:'Back',callback_data:'poag_items_'+ctx.from.id+''}]
if(sts.length < 1){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You does not have any *Transformational Item*',{parse_mode:'markdown',reply_markup:{inline_keyboard:[bt]}})
return
}
const ore = []
let message = 'You Have Following *Transformational Items* :-'
const page = ctx.callbackQuery.data.split('_')[3]*1 || 1
const pageSize = 15
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
if(ctx.callbackQuery.data.split('_')[3]*1 < 1 || startIdx > sts.length){
return
}
const stn = sts.slice(startIdx,endIdx)
let b = startIdx
for(const p of stn){
ore.push({text:c(p),callback_data:'vyast:'+b+':'+ctx.from.id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 3) {
    rows.push(ore.slice(i, i + 3));
}
if(sts.length > 15){
rows.push([{text:'<',callback_data:'poag_transformational_'+ctx.from.id+'_'+(page-1)+''},{text:'>',callback_data:'poag_transformational_'+ctx.from.id+'_'+(page+1)+''}])
}
rows.push(bt)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,message,{reply_markup:{inline_keyboard:rows},parse_mode:'markdown'})
return
}
if(item=='evolution'){
const sts = [...new Set(data.inv.evostones)]
const bt = [{text:'Back',callback_data:'poag_items_'+ctx.from.id+''}]
if(sts.length < 1){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You does not have any *Evolution Item*',{parse_mode:'markdown',reply_markup:{inline_keyboard:[bt]}})
return
}
const ore = []
let message = 'You Have Following *Evolution Items* :-'
const page = ctx.callbackQuery.data.split('_')[3]*1 || 1
const pageSize = 15
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
if(ctx.callbackQuery.data.split('_')[3]*1 < 1 || startIdx > sts.length){
return
}
const stn = sts.slice(startIdx,endIdx)
let b = startIdx
for(const p of stn){
ore.push({text:c(p),callback_data:'evsty:'+b+':'+ctx.from.id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 3) {
    rows.push(ore.slice(i, i + 3));
}
if(sts.length > 15){
rows.push([{text:'<',callback_data:'poag_evolution_'+ctx.from.id+'_'+(page-1)+''},{text:'>',callback_data:'poag_evolution_'+ctx.from.id+'_'+(page+1)+''}])
}
rows.push(bt)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,message,{reply_markup:{inline_keyboard:rows},parse_mode:'markdown'})
return
}
if(item=='items'){
const key = [[{text:'Key Items',callback_data:'poag_transformational_'+ctx.from.id+''},{text:'Evo Items',callback_data:'poag_evolution_'+ctx.from.id+''}],[{text:'Special Items',callback_data:'poag_special_'+ctx.from.id+''}]]
key.push(rows)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Which category of *Items* you wanna check?',{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
return
}
if(item=='balls'){
const sts = Object.keys(data.balls).filter(ball => data.balls[ball] > 0)
const bt = {text:'Back',callback_data:'poag_inventory_'+ctx.from.id+''}
const ore = []
let message = 'You Have Following *PokeBalls* :-'
const page = ctx.callbackQuery.data.split('_')[3]*1 || 1
const pageSize = 20
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
if(ctx.callbackQuery.data.split('_')[3]*1 < 1 || startIdx > sts.length){
return
}
const stn = sts.slice(startIdx,endIdx)
let b = 0
for(const p of stn){
ore.push({text:c(p)+' : '+data.balls[p]+'',callback_data:'vyabll:'+p+':'+ctx.from.id+''})
b++;
}
  const rows5 = [];
  for (let i = 0; i < ore.length; i += 3) {
    rows5.push(ore.slice(i, i + 3));
}
rows5.push(rows)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,message,{parse_mode:'markdown',reply_markup:{inline_keyboard:rows5}})
return
}
if(item=='inventory'){
if(!data.inv.pc){
data.inv.pc = 0
}
let msg = '*💷 PokeCoins:* '+data.inv.pc+'\n'
if(data.inv.candy && data.inv.candy > 0){
msg += '\n• *🍬 Candies:* '+data.inv.candy+''
}
if(data.inv.vitamin && data.inv.vitamin > 0){
msg += '\n• *💉 Vitamins:* '+data.inv.vitamin+''
}
if(data.inv.berry && data.inv.berry > 0){
msg += '\n• *🍒 Berries:* '+data.inv.berry+''
}
if(data.inv.pass && data.inv.pass > 0){
msg += '\n• *🀄 Safari Pass:* '+data.inv.pass+''
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:[rows]}})
return
}
})
bot.action(/vyabll:/,async ctx => {
const balls = {};
const ball = ctx.callbackQuery.data.split(':')[1]
const id = ctx.callbackQuery.data.split(':')[2]
if(ctx.from.id==id){
const data = await getUserData(ctx.from.id)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*★ PokeBall Name:* '+c(balls[ball].name)+'.\n• *Description:* '+balls[ball].description+'\n\n*Total Owned :* '+data.balls[ball]+'',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Back',callback_data:'poag_balls_'+ctx.from.id+''}]]}, link_preview_options:{show_above_text:true, url: balls[ball].image}})
}
})


bot.action(/lrn_/,check2q,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const mid = ctx.callbackQuery.data.split('_')[2]
const time = ctx.callbackQuery.data.split('_')[3]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((poke)=> poke.pass == pass)[0]
if(!poke){
ctx.answerCbQuery('You Not Have This Poke AnyMore')
return
}
const queryTime = new Date(time)
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
console.log(timeDifference)
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *'+c(poke.name)+'* Did Not Learnt *'+c(dmoves[mid].name)+'*',{parse_mode:'markdown'})
return
}
let msg = '<b>Pokemon :</b> '+c(poke.name)+' (Lv. '+plevel(poke.name,poke.exp)+')\n\n'
const moves = []
for(const move2 of poke.moves){
let move = dmoves[move2]
msg += '• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+', <b>Accuracy:</b> '+move.accuracy+'% <i>('+c(move.category.charAt(0))+')</i>\n'
moves.push(move2)
}
msg += '\n<i>Which Move Should Be Forgotten?</i>'

const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'elr_'+word+'_'+pass+'_'+mid+'_'+time+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
})
bot.action(/elr_/,check2q,async ctx => {
const move9 = ctx.callbackQuery.data.split('_')[1]
const pass = ctx.callbackQuery.data.split('_')[2]
const mid = ctx.callbackQuery.data.split('_')[3]
const time = ctx.callbackQuery.data.split('_')[4]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((poke)=> poke.pass == pass)[0]
if(!poke){
ctx.answerCbQuery('You Not Have This Poke AnyMore')
return
}
const queryTime = new Date(time)
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
console.log(timeDifference)
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *'+c(poke.name)+'* Did Not Learnt *'+c(dmoves[mid].name)+'*',{parse_mode:'markdown'})
return
}
let msg = 'Are You Sure To Your <b>'+c(poke.name)+'</b> (<b>Lv.</b> '+plevel(poke.name,poke.exp)+')\n\n'
msg += '<b>Forget The Move:</b>'
const move = dmoves[String(move9)]
const move2 = dmoves[String(mid)]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
msg += '\n\n<b>And Learn The Move:</b>'
msg += '\n• <b>'+c(move2.name)+'</b> ['+c(move2.type)+' '+emojis[move2.type]+']\n<b>Power:</b> '+move2.power+'<b>, Accuracy:</b> '+move2.accuracy+' ('+c(move2.category.charAt(0))+')'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:[[{text:'Confirm',callback_data:'mhusz_'+move9+'_'+mid+'_'+pass+'_'+time+''},{text:'Cancel',callback_data:'lrn_'+pass+'_'+mid+'_'+time+''}]]}})
})
bot.action('crncl',async ctx => {
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Cancelled')
})
bot.action(/mhusz_/,check2q,async ctx => {
const move = ctx.callbackQuery.data.split('_')[1]
const pass = ctx.callbackQuery.data.split('_')[3]
const mid = ctx.callbackQuery.data.split('_')[2]
const time = ctx.callbackQuery.data.split('_')[4]
const data = await getUserData(ctx.from.id)
console.log(pass)
const poke = data.pokes.filter((poke)=> poke.pass == pass)[0]
if(!poke){
ctx.answerCbQuery('You Not Have This Poke AnyMore')
return
}
const queryTime = new Date(time)
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
console.log(timeDifference)
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *'+c(poke.name)+'* Did Not Learnt *'+c(dmoves[mid].name)+'*',{parse_mode:'markdown'})
return
}
if(!poke.moves.includes(parseInt(move))){
ctx.answerCbQuery('Your Poke Does Not Know This Move')
return
}
const index = poke.moves.indexOf(parseInt(move));

if (index !== -1) {
  poke.moves[index] = parseInt(mid);
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(poke.name)+'* Has Learnt *'+c(dmoves[mid].name)+'*',{parse_mode:'markdown'})
const mdata = await loadMessageData();
if(mdata.moves[ctx.callbackQuery.message.message_id]){
delete mdata.moves[ctx.callbackQuery.message.message_id]
await saveMessageData(mdata)
}
}
})

bot.command('pokestore',async ctx => {
const store2 = ['buy','tms','sell']
const store = store2.filter((storeitem)=>storeitem!='buy')
const buttons = store.map((word) => ({ text: c(word), callback_data: 'store_'+word+'_'+ctx.from.id+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }

await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},`*Welcome To Poke Store (Buy Section) 🏦 :-

★ PokeBalls :-
• Regular Ball -* 15 💷
*• Great Ball -* 25 💷
*• Ultra Ball -* 40 💷
*• Repeat Ball -* 50 💷
*• Beast Ball -* 100 💷
*• Quick Ball -* 65 💷
*• Net Ball -* 45 💷
*• Nest Ball -* 55 💷

*★ Items :-*
*• Candy -* 100 💷
*• Berry -* 75 💷
*• Vitamin -* 100 💷
*• Key Stone -* 5000 💷

*Example :-*
• /buy regular 1
• /buy nest 5
• /buy candy 3
• /buy key

_Use /pokeballs To Get Details About PokeBalls._
_Use /buy To Buy From PokeStore_`,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
})
bot.action(/store_/,async ctx => {
const item = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
if(item=='sell'){
const store2 = ['buy','tms','sell']
const store = store2.filter((storeitem)=>storeitem!=item)
const buttons = store.map((word) => ({ text: c(word), callback_data: 'store_'+word+'_'+ctx.from.id+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,`*Welcome To Poke Store (Sell Section) 🏦 :-

★ PokeBalls :-
• Regular Ball -* 7 💷
*• Great Ball -* 12 💷
*• Ultra Ball -* 20 💷
*• Repeat Ball -* 25 💷
*• Beast Ball -* 50 💷
*• Quick Ball -* 40 💷
*• Net Ball -* 25 💷
*• Nest Ball -* 30 💷
*• Friend Ball -* 25 💷
*• Level Ball -* 25 💷
*• Moon Ball -* 35 💷
*• Sport Ball -* 15 💷
*• Luxury Ball -* 10 💷
*• Premier Ball -* 8 💷
*• Park Ball -* 75 💷
*• Master Ball -* 3000 💷

*★ Items :-*
*• Candy -* 50 💷
*• Berry -* 40 💷
*• Vitamin -* 50 💷
*• Item -* 5000 💷

*Example :-*
• /sell regular 1
• /sell candy 1
• /sell items
• /sell master 1

_Use /pokeballs To Get Details About PokeBalls._
_Use /sell To Sell Item To PokeStore_`,{parse_mode:'markdown',
reply_markup:{inline_keyboard:rows}})
}

if(item=='buy'){
const store2 = ['buy','tms','sell']
const store = store2.filter((storeitem)=>storeitem!=item)
const buttons = store.map((word) => ({ text: c(word), callback_data: 'store_'+word+'_'+ctx.from.id+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,`*Welcome To Poke Store (Buy Section) 🏦 :-

★ PokeBalls :-
• Regular Ball -* 15 💷
*• Great Ball -* 25 💷
*• Ultra Ball -* 40 💷
*• Repeat Ball -* 50 💷@
*• Beast Ball -* 100 💷
*• Quick Ball -* 65 💷
*• Net Ball -* 45 💷
*• Nest Ball -* 55 💷

*★ Items :-*
*• Candy -* 100 💷
*• Berry -* 75 💷
*• Vitamin -* 100 💷
*• Key Stone -* 5000 💷

*Example :-*
• /buy regular 1
• /buy nest 5
• /buy candy 3
• /buy key

_Use /pokeballs To Get Details About PokeBalls._
_Use /buy To Buy From PokeStore_`,{parse_mode:'markdown',
reply_markup:{inline_keyboard:rows}})
}
if(item=='tms'){
const page = ctx.callbackQuery.data.split('_')[3]*1 || 1
const startIdx = (page - 1) * 7;
const endIdx = startIdx + 6;
if(page<1 || startIdx > Object.keys(tms.tmnumber).length){
return
}
const userData = await getUserData(ctx.from.id)
const matchingLevels = Object.keys(trainerlevel).filter(level => userData.inv.exp >= trainerlevel[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(level < 35){
ctx.answerCbQuery('Reach Level 35 To Unlock TMs Store')
return
}

let msg = '<b>Welcome To Poke Store (TMs Section) 🏦 :-</b>\n\n'
const tm = tms.tmnumber
let b = 1
for(const t in tm){
const m = tms.tmnumber[String(t)]
if(tmprices.buy[String(t)]){
if(startIdx <= b && b<= endIdx){
msg += '<b>'+b+'. TM'+t+'</b> - '+tmprices.buy[String(t)]+' 💷\n<b> '+c(dmoves[m].name)+'</b> ['+c(dmoves[m].type)+' '+emojis[dmoves[m].type]+']\n<b>Power :</b> '+dmoves[m].power+', <b>Accuracy :</b> '+dmoves[m].accuracy+' ('+c(dmoves[m].category)+')\n\n'
}
b++;
}
}
msg += '\n• <b>Example :-</b> /buy tm2'
const store2 = ['buy','tms','sell']
const store = store2.filter((storeitem)=>storeitem!=item)
const buttons = store.map((word) => ({ text: c(word), callback_data: 'store_'+word+'_'+ctx.from.id+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
let key2 = [[{text:'<',callback_data:'store_tms_'+ctx.from.id+'_'+(page-1)+''},{text:'>',callback_data:'store_tms_'+ctx.from.id+'_'+(page+1)+''}]]
var key = key2.concat(rows)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:key}})
}
})


bot.command('sell',check,check2,async ctx => {
const data = await getUserData(ctx.from.id)
const sellInfo = {
"regular":7,
"ultra":20,
"great":12,
"repeat":25,
"beast":50,
"quick":40,
"net":25,
"nest":30,
"candy":50,
"vitamin":50,
"berry":40,
"master":3000,
"friend":25,
"level":25,
"moon":35,
"sport":15,
"luxury":10,
"premier":8,
"park":75,
}
const item2= ctx.message.text.split(' ')[1]
const amount = Math.max(Math.floor(ctx.message.text.split(' ')[2]*1),0)
if(!item2){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Usage: /sell <item> <amount>*',{reply_to_message_id:ctx.message.message_id})
return
}
const item = item2.toLowerCase()
if(!data.inv.stones){
data.inv.stones = []
}
const yt = ['item','items','stone','stones']
if(yt.includes(item)){
if(data.inv.stones.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You does not have any *Item*',{reply_to_message_id:ctx.message.message_id})
return
}
const ore = []
let message = '*You Have Following Key Items :-*'
const page = 1
const pageSize = 15
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
const stn = data.inv.stones.slice(startIdx,endIdx)
let b = 0
for(const p of stn){
ore.push({text:c(p),callback_data:'keyitem_'+b+'_'+ctx.from.id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 3) {
    rows.push(ore.slice(i, i + 3));
}
if(data.inv.stones.length > 15){
rows.push([{text:'<',callback_data:'keyitem_page_'+ctx.from.id+'_'+(page-1)+''},{text:'>',callback_data:'keyitem_page_'+ctx.from.id+'_'+(page+1)+''}])
}
const msg5 = await sendMessage(ctx,ctx.chat.id,message,{reply_markup:{inline_keyboard:rows},parse_mode:'markdown',reply_to_message_id:ctx.message.message_id})
ctx.session.itm = msg5
return
}
if(!amount){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Usage: /sell <item> <amount>*',{reply_to_message_id:ctx.message.message_id})
return
}
if(isNaN(amount) || amount < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Invalid amount*',{reply_to_message_id:ctx.message.message_id})
return
}
if(!Object.keys(sellInfo).includes(item)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Invalid Item*',{reply_to_message_id:ctx.message.message_id})
return
}
if(!data.balls){
data.balls = {}
}
if(!data.balls[item] && !data.inv[item]){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You Don\'t Have This Item*',{reply_to_message_id:ctx.message.message_id})
return
}
if(data.balls[item] && data.balls[item] < amount){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You does not have *Enough* item',{reply_to_message_id:ctx.message.message_id})
return
}
if(data.inv[item] && data.inv[item] < amount){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You does not have *Enough* item',{reply_to_message_id:ctx.message.message_id})
return
}
if(data.inv[item]){
data.inv[item] -= amount
data.inv.pc += amount*sellInfo[item]
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Successfully *Sold '+amount+' '+c(item)+'* for *'+amount*sellInfo[item]+' PokeCoins 💷*',{
reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#sell\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) sold <code>'+amount+' '+item+'</code>'
,{parse_mode:'HTML'})
}else if(data.balls[item]){
data.balls[item] -= amount
data.inv.pc += amount*sellInfo[item]
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Successfully *Sold '+amount+' '+c(item)+' Balls* for *'+amount*sellInfo[item]+' PokeCoins 💷*',{
reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#sell\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) sold <code>'+amount+' '+item+'</code>'
,{parse_mode:'HTML'})
}
})
bot.action(/keyitem_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const item = ctx.callbackQuery.data.split('_')[1]
if(item=='page'){
const ore = []
let message = '*You Have Following Key Items :-*'
const page = ctx.callbackQuery.data.split('_')[3]*1
const pageSize = 15
const startIdx = (page - 1) * pageSize;
let b = startIdx
if(page < 1 || startIdx > data.inv.stones.length){
return
}

const endIdx = startIdx + pageSize;
const stn = data.inv.stones.slice(startIdx,endIdx)
for(const p of stn){
ore.push({text:c(p),callback_data:'keyitem_'+b+'_'+ctx.from.id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 3) {
    rows.push(ore.slice(i, i + 3));
}
if(data.inv.stones.length > 15){
rows.push([{text:'<',callback_data:'keyitem_page_'+ctx.from.id+'_'+(page-1)+''},{text:'>',callback_data:'keyitem_page_'+ctx.from.id+'_'+(page+1)+''}])
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,message,{parse_mode:'markdown',reply_markup:{inline_keyboard:rows}})
return
}
if(!data.inv.stones[item*1]){
ctx.answerCbQuery('Something Went Wrong With This Stone')
return
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'★ This *Key Item* known as *'+c(data.inv.stones[item*1])+'*\n• Which helps *'+c(stones[data.inv.stones[item*1]].pokemon)+'* to transform into *'+c(stones[data.inv.stones[item*1]].mega)+'* in a battle.\n\n_Do you wanna sell your_ *'+c(data.inv.stones[item*1])+'*',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Yes',callback_data:'syllity_'+item+'_'+ctx.from.id+''},{text:'No',callback_data:'keyitem_page_'+ctx.from.id+'_1'}]]}, link_preview_options:{show_above_text:true, url: stones[data.inv.stones[item*1]].image}})
})
bot.action(/syllity_/,check2q,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const item = ctx.callbackQuery.data.split('_')[1]*1
if(!data.inv.stones[item*1]){
ctx.answerCbQuery('Something Went Wrong With This Stone')
return
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Are You Sure To Sell Your *'+c(data.inv.stones[item*1])+'* For *5000 PokeCoinS* 💷',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Yes',callback_data:'syr_'+item+'_'+ctx.from.id+''},{text:'No',callback_data:'dlt_'+ctx.from.id+''}]]}, link_preview_options:{show_above_text:true, url: stones[data.inv.stones[item*1]].image}})
})
bot.action(/syr_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const item = ctx.callbackQuery.data.split('_')[1]
if(ctx.session.itm && ctx.session.itm != ctx.callbackQuery.message.message_id){
ctx.answerCbQuery('This query is old. Try using command again to sell stone',{show_alert:true})
return
}
if(!data.inv.stones[item*1]){
ctx.answerCbQuery('Something Went Wrong With This Stone')
return
}
const it = data.inv.stones[item*1]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Successfully *Sold* your *'+c(it)+'* for *5000 PokeCoins* 💷',{parse_mode:'markdown', link_preview_options:{show_above_text:true, url: stones[data.inv.stones[item*1]].image}})
await sendMessage(ctx,5432006093,'#sell\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) sold <code>'+c(it)+'</code>'
,{parse_mode:'HTML'})
data.inv.stones.splice(item*1,1)
data.inv.pc += 5000
await saveUserData(ctx.from.id,data)
})

bot.command('buy',check,check2,async ctx => {
const messageData = await loadMessageData();
if(messageData.battle.includes(ctx.from.id)) {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Are In A *Battle*',{reply_to_message_id:ctx.message.message_id})
return
}

const item2 = ctx.message.text.split(' ')[1]
if(!item2){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Usage:* /buy <item>',{reply_to_message_id:ctx.message.message_id})
return
}
const data = await getUserData(ctx.from.id)
if(item2.toLowerCase()=='card10'){
if(data.inv.pc < 1000){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You not have enough PokeCoins💷*',{reply_to_message_id:ctx.message.message_id})
return
}
if(!data.extra.unlocks){
data.extra.unlocks = []
}
if(data.extra.unlocks.includes('10')){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You already have bought *Template 10*',{reply_to_message_id:ctx.message.message_id})
return
}
data.extra.unlocks.push('10')
data.inv.pc -= 1000
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Bought *Template 10* For *1000* PokeCoins 💷',{reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#buy\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) bought <code>Template 10</code>',
{parse_mode:'HTML'})
return
}
if(item2.toLowerCase()=='key' || ctx.message.text.split(' ').slice(1).join(' ').toLowerCase()== 'key stone'){
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(level<25){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Have To Reach *25 Level* To Buy Key Stone',{parse_mode:'markdown',reply_to_message_id:ctx.message.message_id})
return
}
if(data.inv.pc < 5000){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You not have enough PokeCoins💷*',{reply_to_message_id:ctx.message.message_id})
return
}
if(data.inv.ring){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You already have bought *Key Stone*',{reply_to_message_id:ctx.message.message_id})
return
}
data.inv.ring = true
data.inv.pc -= 5000
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Bought *Key Stone* For *5000* PokeCoins 💷',{reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#buy\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) bought <code>Mega Ring</code>',
{parse_mode:'HTML'})
return
}
if(item2.toLowerCase().includes('tm')){
const num = item2.toLowerCase().replace('tm','')
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(level < 35){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Have To Reach *35 Level* To Unlock TMs Store',{parse_mode:'markdown',reply_to_message_id:ctx.message.message_id})
return
}
if(!tms.tmnumber[String(num)] || !tmprices.buy[String(num)]){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Invalid TM*',{reply_to_message_id:ctx.message.message_id})
return
}
if(!data.tms){
data.tms = {}
}
if(!data.tms[String(num)]){
data.tms[String(num)] = 0
}
const price = tmprices.buy[String(num)]
if(data.inv.pc < price){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You not have enough PokeCoins💷*',{reply_to_message_id:ctx.message.message_id})
return
}
data.tms[String(num)] += 1
data.inv.pc -= price
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Bought *TM'+num+'* For *'+price+'* PokeCoins 💷',{reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#buy\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) bought <code>TM'+num+'</code>',{parse_mode:'HTML'})
return
}
const Store2 = {
"vitamin":100,
"candy":100,
"berry":75
}
const amount = Math.max(Math.floor(ctx.message.text.split(' ')[2]),0)
if(!amount){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Usage:* /buy <item> <amount>',{reply_to_message_id:ctx.message.message_id})
return
}
if(isNaN(amount)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Invalid amount*',{reply_to_message_id:ctx.message.message_id})
return
}
for(const item in Store2){
if(item2.toLowerCase()== item){
const price = Store2[item]
const pay = amount*price
if(pay>data.inv.pc){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You not have enough PokeCoins💷*',{reply_to_message_id:ctx.message.message_id})
return
}
data.inv.pc -= pay
if(!data.inv[item]){
data.inv[item] = 0
}
data.inv[item] += amount
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Bought *'+amount+'* '+c(item)+' for *'+pay+'* PokeCoins 💷',{reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#buy\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) bought <code>'+amount+' '+c(item)+'</code>',{parse_mode:'HTML'})
return
}
}
let Store = {
"regular":15,
"great":25,
"ultra":40,
"repeat":50,
"beast":100,
"quick":65,
"net":45,
"nest":55
}
if(ctx.from.id==ADMIN_ID){
Store["master"] = 1
}
for(const item in Store){
if(item2.toLowerCase()== item){
const price = Store[item]
const pay = amount*price
if(pay>data.inv.pc){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*You not have enough PokeCoins💷*',{reply_to_message_id:ctx.message.message_id})
return
}
data.inv.pc -= pay
if(!data.balls){
data.balls = {}
}
if(!data.balls[item]){
data.balls[item] = 0
}
data.balls[item] += amount
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Bought *'+amount+'* '+c(item)+' Balls for *'+pay+'* PokeCoins 💷',{reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#buy\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) bought <code>'+amount+' '+c(item)+'</code>',{parse_mode:'HTML'})
return
}
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Invalid item*',{reply_to_message_id:ctx.message.message_id})
})
bot.command('transfer',check ,async ctx => {
const data = await getUserData(ctx.from.id)
const reply = ctx.message.reply_to_message
if(!reply || reply.from.id == ctx.from.id){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Reply to a *User* to send *PokeCoins* 💷',{reply_to_message_id:ctx.message.message_id})
return
}
const data2 = await getUserData(reply.from.id)
if(!data2.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:reply.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const matchingLevels = Object.keys(trainerlevel).filter(level => data.inv.exp >= trainerlevel[level]);
const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(level<7){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Have To Reach *7 Level* To Transfer PokeCoins 💷',{reply_to_message_id:ctx.message.message_id})
return
}
const amount = Math.max(Math.floor(ctx.message.text.split(' ')[1]),1)
if(!amount){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Give a amount of *PokeCoins* 💷 Also',{reply_to_message_id:ctx.message.message_id})
return
}
if(data.inv.pc < amount){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You not have enough *PokeCoins* 💷',{reply_to_message_id:ctx.message.message_id})
return
}
data.inv.pc -= amount
data2.inv.pc += amount
await saveUserData(ctx.from.id,data)
await saveUserData(reply.from.id,data2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'Sent <b>'+amount+'</b> 💷 to <b>'+he.encode(reply.from.first_name)+'</b>',{reply_to_message_id:ctx.message.message_id})
await sendMessage(ctx,5432006093,'#transfer\n\n<b>'+he.encode(ctx.from.first_name)+'</b> (<code>'+ctx.from.id+'</code>) sent <code>'+amount+'</code> 💷 to <b>'+he.encode(reply.from.first_name)+'</b> (<code>'+reply.from.id+'</code>)',{parse_mode:'HTML'})
})
bot.action(/evy_/,check2q,async ctx => {
const data = await getUserData(ctx.from.id)
//const name = ctx.callbackQuery.data.split('_')[1]
const pass = ctx.callbackQuery.data.split('_')[2]
const id = ctx.callbackQuery.data.split('_')[3]
if(id && id!=ctx.from.id){
ctx.answerCbQuery()
return
}
const poke = data.pokes.filter((poke)=> poke.pass == pass)[0]
if(!poke){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Poke not found')
return
}
let name2 = poke.name
const pokemonNames = Object.keys(forms);
  for (const name3 of pokemonNames) {
    const forms2 = forms[name3];
    const matchingForm = forms2.filter(form => form.identifier === name2);
    if (matchingForm.length > 0) {
var name = name3;
    }
  }


const evo2 = chains.evolution_chains.filter((chain)=>chain.current_pokemon==name && chain.evolution_method == 'level-up')
const evo = evo2[Math.floor(Math.random()*evo2.length)]
if(!evo){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(name)+'* does not evolve futher or not via level up',{parse_mode:'markdown'})
return
}
if(poke.symbol == '🪅'){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*Event* Pokemons cant be evolved',{parse_mode:'markdown'})
return
}

if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= plevel(poke.name,poke.exp)){
const fr = forms[evo.evolved_pokemon].filter((p)=> !p.identifier.includes('gmax')
&& !p.identifier.includes('mega') && !p.identifier.includes('crowned')
&& !p.identifier.includes('primal'))
if(name2.includes('galar')){
const n2 = fr.filter((p)=> p.identifier.includes('galar'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(name2.includes('hisui')){
const n2 = fr.filter((p)=> p.identifier.includes('hisui'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(name2.includes('paldea')){
const n2 = fr.filter((p)=> p.identifier.includes('paldea'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(name2.includes('alola')){
const n2 = fr.filter((p)=> p.identifier.includes('alola'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else{
const fr2 = forms[evo.current_pokemon].filter((p)=> !p.identifier.includes('gmax')
&& !p.identifier.includes('mega') && !p.identifier.includes('crowned')
&& !p.identifier.includes('primal'))
const ye = fr2.filter((p)=> p.identifier.includes('galar') ||
p.identifier.includes('hisui') || p.identifier.includes('alola') || p.identifier.includes('paldea'))
if(ye.length > 0){
var rn = fr.filter((p)=> !p.identifier.includes('hisui') &&
!p.identifier.includes('galar') && !p.identifier.includes('alola') && !p.identifier.includes('paldea'))
}else{
var rn = fr
}
}


const nam = rn[Math.floor(Math.random()*rn.length)].identifier
const d = pokes[nam]
poke.name = nam
poke.id = d.pokedex_number
if(!d || !d.front_default_image){
ctx.answerCbQuery('This Evolution Cant Be Performed,Contact Admins',{show_alert:true})
return
}
if(!data.pokeseen){
data.pokeseen = []
}
if(!data.pokeseen.includes(nam)){
data.pokeseen.push(nam)
}
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(name)+'* Is Evolving.......',{parse_mode:'markdown'})
setTimeout(async()=> {
ctx.deleteMessage(ctx.callbackQuery.message.message_id)
//ctx.deleteMessage(m.message.id)
let img = d.front_default_image
const im = shiny.filter((poke)=>poke.name==nam)[0]
if(events[poke.name] && poke.symbol == '🪅') {
img = events[poke.name]
}
if(poke.symbol=='✨' && im.shiny_url){
img=im.shiny_url
}
const moves = pokemoves[nam]
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'evolution' && dmoves[move.id].power && dmoves[move.id].accuracy && dmoves[move.id].category != 'status')
if(moves2.length > 0){
for(const m of moves2){
if(poke.moves.length < 4){
poke.moves.push(m.id)
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.from.id,'<b>'+c(poke.name)+'</b> (<b>Lv.</b> '+(plevel(poke.name,poke.exp))+') Has Learnt A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].',{parse_mode:'HTML'})
}else{
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const d = new Date().toLocaleString('en-US', options)
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a>, <b>'+c(poke.name)+'</b> (<b>Lv.</b> '+(plevel(poke.name,poke.exp))+') Wants To Learn A New Move',{reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+''}]]}})
}
const mdata = await loadMessageData();
const m77 = await sendMessage(ctx,ctx.from.id,'<b>'+c(poke.name)+'</b> (<b>Lv.</b> '+(plevel(poke.name,poke.exp))+') Wants To Learn A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].\n\nBut <b>'+c(poke.name)+'</b> Already Knows 4 Moves He Have To Forget One Move To Learn <b>'+c(dmoves[m.id].name)+'</b>\n<i>You Have 15 Min To Choose.</i>',{reply_markup:{inline_keyboard:[[{text:'Go Next',callback_data:'lrn_'+poke.pass+'_'+m.id+'_'+d+''}]]},parse_mode:'HTML'})
if(!mdata.moves){
mdata.moves = {}
}
mdata.moves[m77.message_id] = {chat:ctx.from.id,td:d,poke:poke.name,move:dmoves[m.id].name}
await saveMessageData(mdata)
}
}
}
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,img,{caption:'*'+c(name)+'* Has Been Evolved Into *'+c(nam)+'*',parse_mode:'markdown'})
},3500)
}else{
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Your *'+c(name)+'* Does Not Match With Requirements To *Evolve*',{parse_mode:'markdown'})
}
})

bot.command('safari_zone',async ctx => {
const userData = await getUserData(ctx.from.id)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},`Welcome To *Safari Zone*, You can hunt rare, legendry, mythical types pokemons here.

*Info About Safari Zone :-*
_• You Will Get 20 Safari Balls (2x catch rate)
• You Can't Battle With Pokemon
• You Can't Use Any Other PokeBall
• You Will Automatically Ran Out After You Balls Over
• Using /exit Won't Refund Anything
• Max One Time In A Day Can Play Safari
• Entering Safari Will Reset The Next Day
• You Are Not Guaranteed To Catch A Pokemon_

*Entry Fees:* 200 💷
*/enter -* _To Enter Safari Zone_
*/exit -* _To Exit Safari Zone_`,{reply_to_message_id:ctx.message.message_id})
})
bot.command('enter',check,check2,async ctx => {
const userData = await getUserData(ctx.from.id);
const currentDate = moment().format('YYYY-MM-DD');
if(userData.balls.safari && userData.balls.safari > 0){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Are Already In *'+c(userData.extra.saf)+' Safari Zone*',{reply_to_message_id:ctx.message.message_id})
return
}
if(!userData.extra){
userData.extra = {}
}
if(userData.extra.evhunt && userData.extra.evhunt > 0){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You are doing *'+c(userData.extra.evh)+' EV* training.')
return
}
const regions = {
  'Kanto': ['kanto', 'letsgo-kanto'],
  'johto':['johto'],
  'hoenn':['hoenn'],
  'sinnoh':['sinnoh'],
'hisui': ['hisui'],
  'unova':['unova'],
   'kalos':['kalos-central','kalos-mountain','kalos-coastal'],
  'alola':['alola','poni','melemele','akala','ulaula'],
  'Galar': ['galar','isle-of-armor', 'crown-tundra'],
  'paldea':['paldea','kitakami','blueberry'],
};
const ry = Object.keys(regions).filter((r)=>regions[r].includes(userData.inv.region.toLowerCase()))[0]
if(userData.extra.lastsafari && userData.extra.lastsafari == currentDate){
let key5 = []
if(userData.inv.pass && userData.inv.pass > 0){
key5 = [{text:'Use Safari Pass 🀄',callback_data:'safari_'+ry+'_'+ctx.from.id+'_pass'}]
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Have Already Played *Safari* Today',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[key5]}})
return
}
if (userData.inv.pc < 200) {
    await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Entry Fees Is *200 PokeCoins 💷*',{reply_to_message_id:ctx.message.message_id});
    return;
  }
const matchingLevels = Object.keys(trainerlevel).filter(level => userData.inv.exp >= trainerlevel[level]);
const userLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined
if(!ry){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Travel* to any other *Region*. Current *Region* safari isn\'t *Available*',{reply_to_message_id:ctx.message.message_id})
return
}
const key = [[{text:'Yes',callback_data:'safari_'+ry+'_'+ctx.from.id+''},{text:'No',callback_data:'dlt_'+ctx.from.id+''}]];
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Are you *Sure* to enter *'+c(ry)+'* region *Safari Zone*',{reply_markup:{inline_keyboard:key}})
})
bot.action(/safari_/,check2q,async ctx => {
const reg = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const ext = ctx.callbackQuery.data.split('_')[3]
if(ctx.from.id!=id){
ctx.answerCbQuery()
return
}
const currentDate = moment().format('YYYY-MM-DD');
const userData = await getUserData(ctx.from.id);
if(!userData.balls.safari){
userData.balls.safari = 0
}
if(userData.balls.safari && userData.balls.safari > 0){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You Are Already In *'+c(userData.extra.saf)+' Safari Zone*',{parse_mode:'markdown'})
return
}
if(userData.extra.evhunt && userData.extra.evhunt > 0){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You are doing *'+c(userData.extra.evh)+' EV* training.',{parse_mode:'markdown'})
return
}
if(!userData.extra){
userData.extra = {}
}
if(ext && ext=='pass'){
if(!userData.inv.pass || userData.inv.pass < 1){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You does not have *🀄 Safari Pass*',{parse_mode:'markdown'})
return
}
}
if((!ext || ext!='pass') && userData.extra.lastsafari && userData.extra.lastsafari == currentDate){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You Have Already Played *Safari* Today',{parse_mode:'markdown'})
return
}
if ((!ext || ext!='pass') && userData.inv.pc < 200) {
    await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Entry Fees Is *200 PokeCoins 💷*',{parse_mode:'markdown'});
    return;
  }
const regions = {
  'Kanto': ['kanto', 'letsgo-kanto'],
  'johto':['johto'],
  'hoenn':['hoenn'],
'hisui': ['hisui'],
  'sinnoh':['sinnoh'],
  'unova':['unova'],
   'kalos':['kalos-central','kalos-mountain','kalos-coastal'],
  'alola':['alola','poni','melemele','akala','ulaula'],
  'Galar': ['galar','isle-of-armor', 'crown-tundra'],
  'paldea':['paldea','kitakami','blueberry'],
};

const ry = Object.keys(regions).filter((r)=>regions[r].includes(userData.inv.region.toLowerCase()))[0]
if(!ry){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*Travel* to any other *Region*. Current *Region* safari isn\'t *Available*',{parse_mode:'markdown'})
return
}
if(ext && ext=='pass'){
userData.inv.pass -= 1
userData.balls.safari = 30
userData.extra.saf = ry
userData.extra.lastsafari = currentDate
}else{
userData.inv.pc -= 200
userData.balls.safari = 20
userData.extra.saf = ry
userData.extra.lastsafari = currentDate
}
await saveUserData(ctx.from.id, userData);

  await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Successfully Entered *'+c(ry)+' Safari Zone*',{parse_mode:'markdown'});
});
bot.command('exit',check,check2,async ctx => {
const userData = await getUserData(ctx.from.id);
if(userData.extra.evhunt && userData.extra.evhunt > 0){
userData.extra.evhunt = 0
ctx.session.name = ''
await saveUserData(ctx.from.id,userData)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},' Successfully exited *'+c(userData.extra.evh)+' EV* training.')
return
}

  if (!userData.balls.safari || userData.balls.safari == 0) {
    await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Have Not Entered *Safari Zone*',{reply_to_message_id:ctx.message.message_id});
    return;
  }
userData.balls.safari = 0
ctx.session.name = ''
await saveUserData(ctx.from.id,userData)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},' Successfully Exited *'+c(userData.extra.saf|| 'Kanto')+' Safari Zone*')
})

const groupCommands = [
    { command: '/start', description: 'Start The Bot' },
    { command: '/hunt', description: 'hunt A Poke' },
{command:'/challenge',description:'Battle With Other Players'},
{command:'/mybag',description:'Check Your Bag'},
{ command: '/mypokemons', description: 'Check Your All Pokes' },
{command:'/mycard',description:'View Your Trainer Card'},
{command:'/trainer_card',description:'Customize Your Trainer Card'},
{command: '/stats', description: 'Check Stats Of A Poke' },
{command:'/buy',description:'Buy Items From Poke Store'},
{command:'/sell',description:'Sell Item To Poke Store'},
{command:'/transfer',description:'transfer PokeCoins To Other Users'},
{command: '/travel', description: 'Travel Another Place' },
{command:'/safari_zone',description:'Travel Into Safari Zone'},
{command:'/ev_train',description:'Train EVs Of Your Poke'},
{command:'/myteams',description:' Setup Your Teams'},
{command:'/pokestore',description:'Visit PokeStore'},
{command:'/trade',description:'Trade Pokemons With Others (Paid)'},
{command:'/nickname',description:'Nickname A Pokemon'},
{command:'/release',description:'Release A Pokemon'},
{command:'/candy',description:'Give Candy To Your Pokemon'},
{command:'/vitamin',description:'Give Vitamins To Your Pokemon'},
{command:'/berry',description:'Give Berry To Your Pokemon'},
{command:'/evolve',description:'Evolve Your Pokemon'},
{command:'/pokedex',description:'Pokedex A Pokemom'},
{command:'/referral',description:'Refer And Earn'},
{command:'/settings',description:'Battle Settings Information'}
    // Add more group chat commands as needed
  ];
  bot.telegram.setMyCommands(groupCommands, {scope: {type: "default"}});
bot.command('mycard', check, async (ctx) => {
  try {
    const userData = await getUserData(ctx.from.id);
    const bgUrl = bags[userData.inv?.template || '1'];
    const matchingLevels = Object.keys(trainerlevel).filter(lvl => (userData.inv?.exp || 0) >= trainerlevel[lvl]);
    const level = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : 1;
    let cardMsg = "<b>📇 TRAINER CARD</b>\n";
    cardMsg += "<b>Name:</b> " + (userData.inv?.name || ctx.from.first_name) + "\n";
    cardMsg += "<b>Level:</b> " + level + " (EXP: " + (userData.inv?.exp || 0) + ")\n";
    cardMsg += "<b>Battles:</b> " + (userData.inv?.battle || 0) + " | <b>Wins:</b> " + (userData.inv?.win || 0) + "\n";
    cardMsg += "<b>PokeCoins:</b> " + (userData.inv?.pc || 0) + " 💷\n";
    cardMsg += "<b>Pokemons:</b> " + (userData.pokes ? userData.pokes.length : 0) + "\n";
    await ctx.replyWithPhoto(bgUrl, {
      caption: cardMsg,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "More Info", callback_data: "cardmore" }]]
      }
    });
  } catch (e) {
    console.error("mycard error:", e);
  }
});
commands.set('trainer_card', async ctx => {
  try {
    if (ctx.chat.type != 'private') {
      await sendMessage(ctx, ctx.chat.id, { parse_mode: "markdown" }, "Use this command in *Private* to edit your *Trainer Card.*", { reply_to_message_id: ctx.message.message_id, reply_markup: { inline_keyboard: [[{ text: "Edit Card", url: "t.me/" + bot.botInfo.username + "?start=trainer_card" }]] } });
      return;
    }
    const userData = await getUserData(ctx.from.id);
    if (!userData.inv) {
      await sendMessage(ctx, ctx.chat.id, { parse_mode: "markdown" }, "*Start your journey now*", { reply_to_message_id: ctx.message.message_id, reply_markup: { inline_keyboard: [[{ text: "Start My Journey", url: "t.me/PokePlayBot?start=start" }]] } });
      return;
    }
    const bgUrl = bags[userData.inv?.template || '1'];
    await ctx.replyWithPhoto(bgUrl, {
      caption: "<b>📇 EDIT TRAINER CARD</b>\nChoose what you would like to edit:",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Templates", callback_data: "trainer_template" }, { text: "Avatar", callback_data: "trainer_avtar" }, { text: "Colour", callback_data: "trainer_colour" }]
        ]
      }
    });
  } catch (err) {
    console.error("trainer_card error:", err);
  }
});
bot.action(/trainer_/,async ctx => {
const edit = ctx.callbackQuery.data.split('_')[1]
const userData = await getUserData(ctx.from.id)
if(edit=='colour'){
if(userData.inv.template*1 == 10){
var key = [[{text:'Trainer Data',callback_data:'trainer_data'},{text:'Back',callback_data:'trainer_back'}]]
}else{
var key = [[{text:'Joined / ID',callback_data:'trainer_id'},{text:'Trainer Data',callback_data:'trainer_data'}],[{text:'Back',callback_data:'trainer_back'}]]
}
await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Which Text Colour You Wanna Channge?',{
reply_markup:{inline_keyboard:key}})
}
if(edit=='back'){
await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'What You Want To Edi?',{reply_markup:{inline_keyboard:[[{text:'Templates',callback_data:'trainer_template'},{text:'Avtar',callback_data:'trainer_avtar'},{text:'Colour',callback_data:'trainer_colour'}]]}})
}
if(edit=='id' || edit=='data'){
const row = []
for(let i = 0; i < colors.length; i++){
row.push({text:c(colors[i]),callback_data:'stcrd_'+edit+'_'+colors[i]})
}
let buttons = []
for (let i = 0; i < row.length; i += 4) {
   buttons.push(row.slice(i, i + 4));
  }
const co = userData.inv[edit] || 'white'
await editMessage('caption',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Choose New Colour For *'+c(edit)+'* Text\n\n*Current Colour:* '+co+'',{parse_mode:'markdown',
reply_markup:{inline_keyboard:buttons}})
}
if(edit=='template'){
const row = []
for(let i = 1; i <= 9; i++){
row.push({text:i,callback_data:'stcrd_tem_'+i})
}
let buttons = []
for (let i = 0; i < row.length; i += 3) {
    buttons.push(row.slice(i, i + 3));
  }
buttons.push([{text:'>',callback_data:'trainer_temp'}])
const tem = userData.inv.template || 1
await editMessage('media',ctx,ctx.chat.id, ctx.callbackQuery.message.message_id, {
        type: 'photo',
        media: "https://te.legra.ph/file/05b0d41d3b37e98e1f82f.jpg",
        caption:'Choose Your New Card New Template\n\n*Current Template:* '+tem+'',
parse_mode:'markdown'},{
reply_markup:{inline_keyboard:buttons}})
}
if(edit=='temp'){
if(userData.extra && userData.extra.unlocks && userData.extra.unlocks.includes('10')){
let buttons = [[{text:'10',callback_data:'stcrd_tem_10'}]]
buttons.push([{text:'<',callback_data:'trainer_template'}])
const tem = userData.inv.template || 1
await editMessage('media',ctx,ctx.chat.id, ctx.callbackQuery.message.message_id, {
        type: 'photo',
        media: "https://graph.org/file/5f0681dee62ffd3867a13.jpg",
        caption:'Choose Your New Card New Template\n\n*Current Template:* '+tem+'',
parse_mode:'markdown'},{
reply_markup:{inline_keyboard:buttons}})
}else{
ctx.answerCbQuery('Use "/buy card10" to buy template 10',{show_alert:true})
}
}


if(edit=='avtar'){
const row = []
for(let i = 1; i <= 12; i++){
row.push({text:i,callback_data:'stcrd_avtar_'+i})
}
let buttons = []
for (let i = 0; i < row.length; i += 4) {
    buttons.push(row.slice(i, i + 4));
  }
if(userData.inv.template*1 == 10){
var m = "https://graph.org/file/d9553f8751c3f42174b71.jpg"
}else{
var m = "https://te.legra.ph/file/f2aa8d685d6a7fdc0d02f.jpg"
}
const avtar = userData.inv.avtar || 1
await editMessage('media',ctx,ctx.chat.id, ctx.callbackQuery.message.message_id, {
        type: 'photo',
        media: m,
caption:'Choose Your New Avtar\n\n*Current Avtar:* '+avtar+'',parse_mode:'markdown'},{
reply_markup:{inline_keyboard:buttons}})
}
})
bot.action(/stcrd_/, async ctx => {
  const edit = ctx.callbackQuery.data.split("_")[1];
  const userData = await getUserData(ctx.from.id);
  if (edit == "avtar") {
    userData.inv.avtar = ctx.callbackQuery.data.split("_")[2];
    await saveUserData(ctx.from.id, userData);
  }
  if (edit == "id" || edit == "data") {
    userData.inv[edit] = ctx.callbackQuery.data.split("_")[2];
    await saveUserData(ctx.from.id, userData);
  }
  if (edit == "tem") {
    userData.inv.template = ctx.callbackQuery.data.split("_")[2];
    await saveUserData(ctx.from.id, userData);
  }
  try {
    const bgUrl = bags[userData.inv?.template || "1"];
    await ctx.replyWithPhoto(bgUrl, {
      caption: "<b>Card updated successfully!</b>",
      parse_mode: "HTML"
    });
  } catch (e) {
    console.error(e);
  }
});
bot.on('text',async (ctx,next) => {
if(ctx.message.text && ctx.message.text.toLowerCase().includes('/tm')){
let num = ctx.message.text.toLowerCase().replace('/tm','')
if(num.includes('@'+bot.botInfo.username.toLowerCase()+'')){
num = num.replace('@'+bot.botInfo.username.toLowerCase()+'','')
}
const data = await getUserData(ctx.from.id)
console.log(num)
if(tms.tmnumber[String(num)]){
if(!data.tms){
data.tms={}
}
console.log('tmfpund')
if(data.tms[num] && data.tms[num] > 0){
console.log('yes')
const m = tms.tmnumber[num]
let msg = '✦ *TM'+num+'* ('+c(dmoves[m].name)+' '+emojis[dmoves[m].type]+')\n'
msg += '*Power:* '+dmoves[m].power+', *Accuracy:* '+dmoves[m].accuracy+' (_'+c(dmoves[m].category)+'_)\n'
msg += '\n• You Can Sell *TM'+num+'* For *'+tmprices.sell[String(num)]+'* 💷'
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Use',callback_data:'tmuse_'+num+'_'+ctx.from.id+''},{text:'Sell',callback_data:'tmselly_'+num+'_'+tmprices.sell[String(num)]+'_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Don\'t Have *TM'+num+'*',{reply_to_message_id:ctx.message.message_id})
}
}
}
await next();
})
bot.action(/tmuse_/,check2q,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const tm = ctx.callbackQuery.data.split('_')[1]
const m = tms.tmnumber[tm]
const move = dmoves[m]
const poks = Object.keys(pokemoves)
    .filter(pokemonName =>
      (pokemoves[pokemonName].moves_info || []).some(move => move.id === m)
    );
const data = await getUserData(ctx.from.id)
const pks2 = await sort(ctx.from.id,data.pokes)
const pks = pks2.filter((poke)=>poks.includes(poke.name))
if(pks.length < 1){
ctx.answerCbQuery('You Don\'t Have Any Pokemon Learn This')
return
}
const buttonsPerRow = 5;
  let page = parseInt(ctx.callbackQuery.data.split('_')[3]) || 1
  const itemsPerPage = 20;
const totalPages = Math.ceil(pks.length / itemsPerPage);
if(page<1 || page > totalPages){
ctx.answerCbQuery('You Not Have Enough Pokes To Use This TM')
return
}
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pks.length);
const pks22 = pks.slice(startIndex,endIndex)
  const inlineKeyboard = [];
  let row = [];

for (let i = startIndex; i < endIndex; i++) {
  const sortedIndex = pks.indexOf(pks[i]);
  row.push({
    text: `${sortedIndex + 1}`,
    callback_data: `tundse_${tm}_${id}_${pks[i].pass}`,
  });

  if ((sortedIndex + 1) % buttonsPerRow === 0 || sortedIndex === endIndex - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(page>1 || endIndex<pks.length){
const row2 = []
row2.push({text:'<',callback_data:'tmuse_'+tm+'_'+id+'_'+(page-1)+''})
row2.push({text:'>',callback_data:'tmuse_'+tm+'_'+id+'_'+(page+1)+''})
inlineKeyboard.push(row2)
}
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'tmuse_'+tm+'_'+id+'_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'tmuse_'+tm+'_'+id+'_'+(page+5)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'tmuse_'+tm+'_'+id+'_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'tmuse_'+tm+'_'+id+'_'+(page+10)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'tmuse_'+tm+'_'+id+'_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'tmuse_'+tm+'_'+id+'_'+(page+25)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
  let messageText = `List Of Your Pokes (*Page ${page}*):\n\n`;
messageText += await pokelist(pks22.map(item => item.pass),ctx,startIndex)
  messageText += '\n_Select Poke To Use_ *TM' + tm + '*';

  const keyboard = {
    inline_keyboard: inlineKeyboard,
  };
  await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'markdown', reply_markup: keyboard });
})
bot.action(/tundse_/,check2q,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const tm = ctx.callbackQuery.data.split('_')[1]
const m = tms.tmnumber[tm]
const pass = ctx.callbackQuery.data.split('_')[3]
const data = await getUserData(ctx.from.id)
const pk = data.pokes.filter((poke)=>poke.pass == pass)[0]
if(!pk){
ctx.answerCbQuery('You Not Have This Poke')
return
}
if(!data.tms){
data.tms={}
}
if(!data.tms[tm] || data.tms[tm] < 1){
ctx.answerCbQuery('You Does Not Have This TM')
return
}
if(pk.moves.length < 4){
let msg = 'Are You Sure To Your <b>'+c(pk.name)+'</b> (<b>Lv.</b> '+plevel(pk.name,pk.exp)+')'
const move2 = dmoves[String(m)]
msg += '\n\n<b>Learn New Move:</b>'
msg += '\n• <b>'+c(move2.name)+'</b> ['+c(move2.type)+' '+emojis[move2.type]+']\n<b>Power:</b> '+move2.power+'<b>, Accuracy:</b> '+move2.accuracy+' ('+c(move2.category.charAt(0))+')'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:[[{text:'Confirm',callback_data:'lrtme_'+tm+'_'+id+'_'+pass+''},{text:'Cancel',callback_data:'crncl'}]]}})
}else{
let msg = '<b>Pokemon :</b> '+c(pk.name)+' (Lv. '+plevel(pk.name,pk.exp)+')\n\n'
const moves = []
for(const move2 of pk.moves){
let move = dmoves[move2]
msg += '• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+', <b>Accuracy:</b> '+move.accuracy+'% <i>('+c(move.category.charAt(0))+')</i>\n'
moves.push(move2)
}
msg += '\n<i>Which Move Should Be Forgotten?</i>'

const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'frgtm_'+word+'_'+tm+'_'+id+'_'+pass+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/frgtm_/,check2q,async ctx => {
const id = ctx.callbackQuery.data.split('_')[3]
if(ctx.from.id!=id){
return
}
const tm = ctx.callbackQuery.data.split('_')[2]
const m = tms.tmnumber[tm]
const pass = ctx.callbackQuery.data.split('_')[4]
const data = await getUserData(ctx.from.id)
const move9 = ctx.callbackQuery.data.split('_')[1]
const pk = data.pokes.filter((poke)=>poke.pass == pass)[0]
if(!pk){
ctx.answerCbQuery('You Not Have This Poke')
return
}
if(!data.tms){
data.tms={}
}
if(!data.tms[tm] || data.tms[tm] < 1){
ctx.answerCbQuery('You Does Not Have This TM')
return
}
const poke = pk
let msg = 'Are You Sure To Your <b>'+c(poke.name)+'</b> (<b>Lv.</b> '+plevel(poke.name,poke.exp)+')\n\n'
msg += '<b>Forget The Move:</b>'
const move = dmoves[String(move9)]
const move2 = dmoves[String(m)]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
msg += '\n\n<b>And Learn The Move:</b>'
msg += '\n• <b>'+c(move2.name)+'</b> ['+c(move2.type)+' '+emojis[move2.type]+']\n<b>Power:</b> '+move2.power+'<b>, Accuracy:</b> '+move2.accuracy+' ('+c(move2.category.charAt(0))+')'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:[[{text:'Confirm',callback_data:'lrtme_'+tm+'_'+id+'_'+pass+'_'+move9+''},{text:'Cancel',callback_data:'crncl'}]]}})
})



bot.action(/lrtme_/,check2q,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const tm = ctx.callbackQuery.data.split('_')[1]
const m = tms.tmnumber[tm]
const pass = ctx.callbackQuery.data.split('_')[3]
const data = await getUserData(ctx.from.id)
const pk = data.pokes.filter((poke)=>poke.pass == pass)[0]
if(!pk){
ctx.answerCbQuery('You Not Have This Poke')
return
}
if(!data.tms){
data.tms={}
}
if(!data.tms[tm] || data.tms[tm] < 1){
ctx.answerCbQuery('You Does Not Have This TM')
return
}
if(pk.moves.length < 4){
pk.moves.push(m)
data.tms[tm] -= 1
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(pk.name)+'* Learnt *'+c(dmoves[String(m)].name)+'* '+emojis[dmoves[String(m)].type]+'',{parse_mode:'markdown'})
}else{
const move = ctx.callbackQuery.data.split('_')[4]
if(!pk.moves.includes(parseInt(move))){
ctx.answerCbQuery('Your Poke Does Not Know This Move')
return
}
const index = pk.moves.indexOf(parseInt(move));

if (index !== -1) {
data.tms[tm] -= 1
  pk.moves[index] = parseInt(m);
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(pk.name)+'* Has Learnt *'+c(dmoves[m].name)+'* '+emojis[dmoves[String(m)].type]+'',{parse_mode:'markdown'})
}
}
})



bot.action(/tmselly_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[3]
if(ctx.from.id!=id){
return
}
const price = ctx.callbackQuery.data.split('_')[2]
const tm = ctx.callbackQuery.data.split('_')[1]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Are You Sure To *Sell* *TM'+tm+'* For *'+price+'* PokeCoins 💷 ?',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Yes',callback_data:'tsejl_'+tm+'_'+price+'_'+id+''},{text:'Cancel',callback_data:'crncl'}]]}})
})
bot.action(/tsejl_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[3]
if(ctx.from.id!=id){
return
}
const price = ctx.callbackQuery.data.split('_')[2]*1
const tm = ctx.callbackQuery.data.split('_')[1]
const data = await getUserData(ctx.from.id)
if(!data.tms){
data.tms={}
}
if(!data.tms[tm] || data.tms[tm] < 1){
ctx.answerCbQuery('You Does Not Have This TM')
return
}
data.tms[tm] -= 1
data.inv.pc += price
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Sold *TM'+tm+'* For *'+price+'* PokeCoins 💷',{parse_mode:'markdown'})
})
bot.command('challenge',check,async ctx => {
const data = await getUserData(ctx.from.id)
const reply = ctx.message.reply_to_message
if(!reply || reply.from.id==ctx.from.id){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Reply to a *User* to challenge them.',{reply_to_message_id:ctx.message.message_id})
return
}
const mdata = await loadMessageData();
if(mdata.battle.includes(ctx.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Are In A *Battle*',{reply_to_message_id:ctx.message.message_id})
return
}
if(mdata.battle.includes(reply.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Opponent Is In A *Battle*',{reply_to_message_id:ctx.message.message_id})
return
}

const data2 = await getUserData(reply.from.id)
if(!data2.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:reply.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
if(!data.inv.team || data.inv.team == "" || data.teams[data.inv.team].length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Create your *Teams* first.',{reply_to_message_id:ctx.message.message_id})
return
}
if(!data2.inv.team || data2.inv.team == "" || data2.teams[data2.inv.team].length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Create your *Teams* first.',{reply_to_message_id:reply.message_id})
return
}
const challanger = he.encode(ctx.from.first_name)
const challanged = he.encode(reply.from.first_name)
let msg = '⚔ <a href="tg://user?id='+ctx.from.id+'"><b>'+challanger+'</b></a> Has Challenged <a href="tg://user?id='+reply.from.id+'"><b>'+challanged+'</b></a>\n'
let f = false
let msg2 = ''
const bword = word(7)
let settings3 = {};
    try {
      settings3 = await getBattleData(bword);
} catch (error) {
      settings3 = {};
    }
settings3.set = data.settings
settings3.users = {}
settings3.users[ctx.from.id] = true
settings3.users[reply.from.id] = false
await saveBattleData(bword, settings3);
const settings = settings3.set
if(settings.max_poke < 6){
f = true
msg2 += '\n<b>• Max number of pokemon:</b> '+settings.max_poke+''
}
if(settings.min_6l > 0 || settings.max_6l < 6){
f = true
msg2 += '\n<b>• Number of legendaries:</b> '+settings.min_6l+'-'+settings.max_6l+''
}
if(settings.min_level > 1 || settings.max_level < 100){
f = true
msg2 += '\n<b>• Level gap of pokemon:</b> '+settings.min_level+'-'+settings.max_level+''
}
if(!settings.switch){
f = true
msg2 += '\n<b>• Switching pokemon:</b> Disabled'
}
if(!settings.key_item){
f = true
msg2 += '\n<b>• Form Changing:</b> Disabled'
}
if(settings.sandbox){
f = true
msg2 += '\n<b>• Sandbox mode:</b> Enabled'
}
if(settings.random){
f = true
msg2 += '\n<b>• Random mode:</b> Enabled'
}
if(settings.preview && settings.preview!='no'){
f = true
msg2 += '\n<b>• Preview mode:</b> '+settings.preview+''
}
if(settings.pin){
f = true
msg2 += '\n<b>• Pin mode:</b> Enabled'
}
if(!settings.type_effects){
f = true
msg2 += '\n<b>• Type efficiency:</b> Disabled'
}
if(!settings.dual_type){
f = true
msg2 += '\n<b>• Dual Types:</b> Disabled'
}
if(settings.allow_regions.length > 0){
f = true
msg2 += '\n<b>• Only regions:</b> ['+c(settings.allow_regions.join(' , '))+']'
}
if(settings.ban_regions.length > 0){
f = true
msg2 += '\n<b>• Banned regions:</b> ['+c(settings.ban_regions.join(' , '))+']'
}
if(settings.ban_types.length > 0){
f = true
msg2 += '\n<b>• Banned types:</b> ['+c(settings.ban_types.join(' , '))+']'
}
if(settings.allow_types.length > 0){
f = true
msg2 += '\n<b>• Types:</b> ['+c(settings.allow_types.join(' , '))+']'
}
if(f){
msg += msg2
msg += '\n\n-> <a href="tg://user?id='+ctx.from.id+'"><b>'+challanger+'</b></a> : ✓\n-> <a href="tg://user?id='+reply.from.id+'"><b>'+challanged+'</b></a> : ✗'
}else{
msg += '\n\n-> <a href="tg://user?id='+ctx.from.id+'"><b>'+challanger+'</b></a> : ✓\n-> <a href="tg://user?id='+reply.from.id+'"><b>'+challanged+'</b></a> : ✗'
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},msg,{reply_to_message_id:reply.message_id,reply_markup:{inline_keyboard:[[{text:'Agree ✓',callback_data:'battle_'+ctx.from.id+'_'+reply.from.id+'_'+bword+''},{text:'Reject ✗',callback_data:'reject_'+ctx.from.id+'_'+reply.from.id+'_'+bword+''}],[{text:'Battle Settings ⚔',callback_data:'sytbr_'+ctx.from.id+'_'+reply.from.id+'_'+bword+''}]]}})
})
bot.action(/sytbr_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[1]
const rid = ctx.callbackQuery.data.split('_')[2]
const bword = ctx.callbackQuery.data.split('_')[3]
if(ctx.from.id==id){
const bt = ['max-poke','min-/-max-6l','min-/-max-level','switch','form-change','sandbox-mode','random-mode','preview-mode','types-lock','regions-lock','type-efficiency','dual-type','save-settings']
const buttons = bt.map((word) => ({ text: '• '+c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_back_'+id+'_'+rid+'_'+bword+''})
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
const d1 = await getUserData(id)
const d2 = await getUserData(rid)
await editMessage('markup',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,{inline_keyboard:rows})
}
})
bot.action(/stbtlsyt_/,async ctx => {
const word = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const rid = ctx.callbackQuery.data.split('_')[3]
const bword = ctx.callbackQuery.data.split('_')[4]
if(ctx.from.id!=id){
return
}
let settings3 = {};
    try {
      settings3 = await getBattleData(bword);
} catch (error) {
      settings3 = {};
    }
const settings = settings3.set
const d1 = await getUserData(id)
const d2 = await getUserData(rid)
const challanger = d1.inv.name
const challanged = d2.inv.name
let msg = '⚔ <a href="tg://user?id='+id+'"><b>'+challanger+'</b></a> Has Challenged <a href="tg://user?id='+rid+'"><b>'+challanged+'</b></a>\n'
let f = false
let msg2 = ''
if(word=='maxs'){
const m = ctx.callbackQuery.data.split('_')[5]
settings.max_poke = parseInt(m*1)
if(settings.max_poke < settings.min_6l){
settings.min_6l = settings.max_poke
}
}
if(word=='min6l'){
const m = ctx.callbackQuery.data.split('_')[5]
settings.min_6l = parseInt(m*1)
if(settings.min_6l > settings.max_6l){
settings.max_6l = 6
}
if(settings.max_poke < settings.min_6l){
settings.max_poke = settings.min_6l
}
}
if(word=='max6l'){
const m = ctx.callbackQuery.data.split('_')[5]
settings.max_6l = parseInt(m*1)
if(settings.min_6l > settings.max_6l){
settings.min_6l = 0
}
}
if(word=='minlv'){
const m = ctx.callbackQuery.data.split('_')[5]
settings.min_level = parseInt(m*1)
if(settings.max_level < settings.min_level){
settings.max_level = 100
}
}
if(word=='maxlv'){
const m = ctx.callbackQuery.data.split('_')[5]
settings.max_level = parseInt(m*1)
if(settings.min_level > settings.max_level){
settings.min_level = 1
}
}
if(word=='switch'){
settings.switch = (settings.switch==true) ? false : true
}
if(word=='type-efficiency'){
settings.type_effects = (settings.type_effects==true) ? false : true
}
if(word=='form-change'){
settings.key_item = (settings.key_item==true) ? false : true
}
if(word=='sandbox-mode'){
settings.sandbox = (settings.sandbox==true) ? false : true
}
if(word=='preview-mode'){
if(settings.preview=='Upper'){
settings.preview = 'Down'
}else if(settings.preview=='Down'){
settings.preview = 'no'
}else if(settings.preview=='no'){
settings.preview = 'Upper'
}else{
settings.preview = 'Upper'
}
}
if(word=='random-mode'){
settings.random = (settings.random==true) ? false : true
}
if(word=='pin-mode'){
settings.pin = (settings.pin==true) ?false : true
}
if(word=='dual-type'){
settings.dual_type = (settings.dual_type==true) ?false : true
}
if(word=='allowty'){
const ty = ctx.callbackQuery.data.split('_')[5]
if(settings.allow_types.includes(ty)){
settings.allow_types = settings.allow_types.filter((ty2)=>ty2!=ty)
}else{
settings.allow_types.push(ty)
if(settings.allow_types.length > 4){
ctx.answerCbQuery('Max 4 Types can be only allowed.')
return
}
}
settings.ban_types = []
}
if(word=='banty'){
const ty = ctx.callbackQuery.data.split('_')[5]
if(settings.ban_types.includes(ty)){
settings.ban_types = settings.ban_types.filter((ty2)=>ty2!=ty)
}else{
settings.ban_types.push(ty)
if(settings.ban_types.length > 4){
ctx.answerCbQuery('Max 4 Types can be banned.')
return
}
}
settings.allow_types = []
}
if(word=='allowrg'){
const ty = ctx.callbackQuery.data.split('_')[5]
if(settings.allow_regions.includes(ty)){
settings.allow_regions = settings.allow_regions.filter((ty2)=>ty2!=ty)
}else{
settings.allow_regions.push(ty)
if(settings.allow_regions.length > 4){
ctx.answerCbQuery('Max 4 Regions can be only allowed.')
return
}
}
settings.ban_regions = []
}
if(word=='banrg'){
const ty = ctx.callbackQuery.data.split('_')[5]
if(settings.ban_regions.includes(ty)){
settings.ban_regions = settings.ban_regions.filter((ty2)=>ty2!=ty)
}else{
settings.ban_regions.push(ty)
if(settings.ban_regions.length > 4){
ctx.answerCbQuery('Max 4 regions can be banned.')
return
}
}
settings.allow_regions = []
}
for (let key in settings3.users) {
    settings3.users[key] = false;
  }
await saveBattleData(bword, settings3);
if(settings.max_poke < 6){
f = true
msg2 += '\n<b>• Max number of pokemon:</b> '+settings.max_poke+''
}
if(settings.min_6l > 0 || settings.max_6l < 6){
f = true
msg2 += '\n<b>• Number of legendaries:</b> '+settings.min_6l+'-'+settings.max_6l+''
}
if(settings.min_level > 1 || settings.max_level < 100){
f = true
msg2 += '\n<b>• Level gap of pokemon:</b> '+settings.min_level+'-'+settings.max_level+''
}
if(!settings.switch){
f = true
msg2 += '\n<b>• Switching pokemon:</b> Disabled'
}
if(!settings.key_item){
f = true
msg2 += '\n<b>• Form Changing:</b> Disabled'
}
if(settings.sandbox){
f = true
msg2 += '\n<b>• Sandbox mode:</b> Enabled'
}
if(settings.random){
f = true
msg2 += '\n<b>• Random mode:</b> Enabled'
}
if(settings.preview && settings.preview!= 'no'){
f = true
msg2 += '\n<b>• Preview mode:</b> '+settings.preview+''
}
if(settings.pin){
f = true
msg2 += '\n<b>• Pin mode:</b> Enabled'
}
if(!settings.type_effects){
f = true
msg2 += '\n<b>• Type efficiency:</b> Disabled'
}
if(!settings.dual_type){
f = true
msg2 += '\n<b>• Dual Types:</b> Disabled'
}
if(settings.allow_regions.length > 0){
f = true
msg2 += '\n<b>• Only regions:</b> ['+c(settings.allow_regions.join(' , '))+']'
}
if(settings.ban_regions.length > 0){
f = true
msg2 += '\n<b>• Banned regions:</b> ['+c(settings.ban_regions.join(' , '))+']'
}
if(settings.ban_types.length > 0){
f = true
msg2 += '\n<b>• Banned types:</b> ['+c(settings.ban_types.join(' , '))+']'
}
if(settings.allow_types.length > 0){
f = true
msg2 += '\n<b>• Types:</b> ['+c(settings.allow_types.join(' , '))+']'
}

if(settings3.users[id]){
var em1 = '✓'
}else{
var em1 = '✗'
}
if(settings3.users[rid]){
var em2 = '✓'
}else{
var em2 = '✗'
}

if(f){
msg += msg2
msg += '\n\n-> <a href="tg://user?id='+id+'"><b>'+challanger+'</b></a> : '+em1+'\n-> <a href="tg://user?id='+rid+'"><b>'+challanged+'</b></a> : '+em2+''
}else{
msg += '\n\n-> <a href="tg://user?id='+id+'"><b>'+challanger+'</b></a> : '+em1+'\n-> <a href="tg://user?id='+rid+'"><b>'+challanged+'</b></a> : '+em2+''
}
if(word=='ban-regions'){
const bt = ['kanto', 'jhoto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_banrg_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_regions-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Banned Regions</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='allow-regions'){
const bt = ['kanto', 'jhoto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
const buttons = bt.map((word) => ({ text: settings.allow_types.includes(word) ? c(word)+'✅' : c(word), callback_data: 'stbtlsyt_allowrg_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_regions-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Allow Only Regions</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}

if(word=='regions-lock'){
const bt = ['ban-regions','allow-regions']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_bac_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
msg += '\n\nSelect to <b>Ban / Allow Regions</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='allowrg'){
const bt = ['kanto', 'jhoto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_allowrg_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_regions-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Allow Only Regions</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='banrg'){
const bt = ['kanto', 'jhoto', 'hoenn', 'sinnoh', 'unova', 'kalos', 'alola', 'galar', 'paldea']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_banrg_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_regions-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Banned Regions</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='allowty'){
const bt = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',  'dragon', 'dark', 'steel', 'fairy']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_allowty_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_types-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Allow Only Types</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='banty'){
const bt = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_banty_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_types-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Banned Types</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='max-poke'){
const bt = ['1','2','3','4','5','6']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_maxs_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_bac_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 3) {
    rows.push(buttons.slice(i, i + 3));
}
msg += '\n\nSelect <b>Max Number</b> of pokemon each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='min-/-max-6l'){
const bt = ['min-6l','max-6l']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_bac_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
msg += '\n\nSelect <b>Min / Max Legendaries</b> of pokemon each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='ban-types'){
const bt = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_banty_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_types-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Banned Types</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='allow-types'){
const bt = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',  'dragon', 'dark', 'steel', 'fairy']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_allowty_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_types-lock_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
msg += '\n\nSelect <b>Allow Only Types</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}



if(word=='types-lock'){
const bt = ['ban-types','allow-types']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_bac_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
msg += '\n\nSelect to <b>Ban / Allow Types</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='regions-lock'){
const bt = ['ban-regions','allow-regions']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_bac_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
msg += '\n\nSelect to <b>Ban / Allow Regionss</b> of pokemon in each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='min-/-max-level'){
const bt = ['min-level','max-level']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_bac_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
msg += '\n\nSelect <b>Min / Max Level</b> of each pokemon in team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='min-level'){
const bt = ['1-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90','91-100']
const buttons = bt.map((word) => ({ text: word, callback_data: 'stbtlsyt_minlevel_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_min-/-max-level_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 3) {
    rows.push(buttons.slice(i, i + 3));
}
msg += '\n\nSelect <b>Min Level</b> of each pokemon in team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='maxlevel'){
const yu = ctx.callbackQuery.data.split('_')[5]
const bt = Array.from({ length: (yu.split('-')[1]*1-yu.split('-')[0]*1+1)}, (_, i) => (i + yu.split('-')[0]*1).toString());
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_maxlv_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_max-level_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 5) {
    rows.push(buttons.slice(i, i + 5));
}
msg += '\n\nSelect <b>Max Level</b> of each pokemon of teams can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='minlevel'){
const yu = ctx.callbackQuery.data.split('_')[5]
const bt = Array.from({ length: (yu.split('-')[1]*1-yu.split('-')[0]*1+1)}, (_, i) => (i + yu.split('-')[0]*1).toString());
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_minlv_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_min-level_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 5) {
    rows.push(buttons.slice(i, i + 5));
}
msg += '\n\nSelect <b>Min Level</b> of each pokemon of teams can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='max-level'){
const bt = ['1-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90','91-100']
const buttons = bt.map((word) => ({ text: word, callback_data: 'stbtlsyt_maxlevel_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_min-/-max-level_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 3) {
    rows.push(buttons.slice(i, i + 3));
}
msg += '\n\nSelect <b>Max Level</b> of each pokemon in team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}

if(word=='min-6l'){
const bt = ['0','1','2','3','4','5','6']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_min6l_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_min-/-max-6l_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 3) {
    rows.push(buttons.slice(i, i + 3));
}
msg += '\n\nSelect <b>Min Legendaries</b> of pokemon each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='max-6l'){
const bt = ['0','1','2','3','4','5','6']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'stbtlsyt_max6l_'+id+'_'+rid+'_'+bword+'_'+word+'' }));
  const rows = [];
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_min-/-max-6l_'+id+'_'+rid+'_'+bword+''})
  for (let i = 0; i < buttons.length; i += 3) {
    rows.push(buttons.slice(i, i + 3));
}
msg += '\n\nSelect <b>Max Legendaries</b> of pokemon each team can have.'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
return
}
if(word=='save-settings'){
const data = await getUserData(ctx.from.id)
data.settings = settings
await saveUserData(ctx.from.id,data)
ctx.answerCbQuery('Settings Saved!')
return
}
if(word=='back'){
var rows = [[{text:'Agree ✓',callback_data:'battle_'+id+'_'+rid+'_'+bword+''},{text:'Reject ✗',callback_data:'reject_'+id+'_'+rid+'_'+bword+''}],[{text:'Battle Settings ⚔',callback_data:'sytbr_'+id+'_'+rid+'_'+bword+''}]]
}else{
msg += '\n\nUse /settings to get more info about battle settings.'
const bt = ['max-poke','min-/-max-6l','min-/-max-level','switch','form-change','sandbox-mode','random-mode','preview-mode','types-lock','regions-lock','type-efficiency','dual-type','save-settings']
const buttons = bt.map((word) => ({ text: '• '+c(word), callback_data: 'stbtlsyt_'+word+'_'+id+'_'+rid+'_'+bword+'' }));
buttons.push({text:'🔙 Back',callback_data:'stbtlsyt_back_'+id+'_'+rid+'_'+bword+''})
  var rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
}
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:rows}})
})
bot.action(/battle_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const id1 = ctx.callbackQuery.data.split('_')[1]
const id2 = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id2 && ctx.from.id!=id1){
ctx.answerCbQuery();
return
}
const mdata = await loadMessageData();
if(mdata.battle.includes(parseInt(ctx.from.id))){
ctx.answerCbQuery('You Are In A Battle')
return
}
const bword = ctx.callbackQuery.data.split('_')[3]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
if(mdata.battle.includes(parseInt(Object.keys(battleData.users).filter((id)=>id!=ctx.from.id)[1]))){
ctx.answerCbQuery('Opponent Is In A Battle')
return
}
if(battleData.users[ctx.from.id]){
ctx.answerCbQuery('Wait For Opponent To Accept')
return
}
const data = await getUserData(id1);
const data2 = await getUserData(id2);
let pokes1 = []
let pokes2 = []
if(battleData.set.random){
pokes1 = data.pokes.map(p => p.pass)
pokes2 = data2.pokes.map(p => p.pass)
}else{
pokes1 = data.teams[data.inv.team]
pokes2 = data2.teams[data2.inv.team]
}
if(battleData.set.min_level > 1 || battleData.set.max_level < 100){
pokes1 = pokes1.filter(p=> {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && plevel(pk.name,pk.exp) >= battleData.set.min_level*1 && plevel(pk.name,pk.exp) <= battleData.set.max_level*1
})
pokes2 = pokes2.filter(p=> {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && plevel(pk.name,pk.exp) >= battleData.set.min_level*1 && plevel(pk.name,pk.exp) <= battleData.set.max_level*1
})
}
if(!battleData.set.dual_type){
pokes1 = pokes1.filter(p=> {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && pokes[pk.name].types.length == 1
})
pokes2 = pokes2.filter(p=> {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && pokes[pk.name].types.length == 1
})
}
if(battleData.set.allow_types.length > 0){
pokes1 = pokes1.filter(p=> {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && pokes[pk.name].types.every(type => battleData.set.allow_types.includes(type))
})
pokes2 = pokes2.filter(p=> {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && pokes[pk.name].types.every(type => battleData.set.allow_types.includes(type))
})
}
if(battleData.set.ban_types.length > 0){
pokes1 = pokes1.filter(p=> {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && pokes[pk.name].types.every(type => !battleData.set.ban_types.includes(type))
})
pokes2 = pokes2.filter(p=> {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && pokes[pk.name].types.every(type => !battleData.set.ban_types.includes(type))
})
}
const prg = {
  "kanto": {
    "start": 1,
    "end": 151
  },
  "johto": {
    "start": 152,
    "end": 251
  },
  "hoenn": {
    "start": 252,
    "end": 386
  },
  "sinnoh": {
    "start": 387,
    "end": 493
  },
  "unova": {
    "start": 494,
    "end": 649
  },
  "kalos": {
    "start": 650,
    "end": 721
  },
  "alola": {
    "start": 722,
    "end": 809
  },
  "galar": {
    "start": 810,
    "end": 898
  },
  "paldea": {
     "start":899,
     "end":1025
  }
}

if(battleData.set.allow_regions.length > 0){
pokes1 = pokes1.filter(p => {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && battleData.set.allow_regions.some(region => (pokes[pk.name].pokedex_number >= prg[region].start && pokes[pk.name].pokedex_number <= prg[region].end) || (pk.name.includes(region)))
})
pokes2 = pokes2.filter(p => {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && battleData.set.allow_regions.some(region => (pokes[pk.name].pokedex_number >= prg[region].start && pokes[pk.name].pokedex_number <= prg[region].end) || (pk.name.includes(region)))
})
}
if(battleData.set.ban_regions.length > 0){
pokes1 = pokes1.filter(p => {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && !battleData.set.ban_regions.some(region => (pokes[pk.name].pokedex_number >= prg[region].start && pokes[pk.name].pokedex_number <= prg[region].end) || (pk.name.includes(region)))
})
pokes2 = pokes2.filter(p => {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && !battleData.set.ban_regions.some(region => (pokes[pk.name].pokedex_number >= prg[region].start && pokes[pk.name].pokedex_number <= prg[region].end) || (pk.name.includes(region)))
})
}
if(battleData.set.random){
const pk2 = []
const pk1 = []
const ls = pokes1.filter(p => {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && (spawn[pk.name].toLowerCase()== 'legendry' || spawn[pk.name].toLowerCase()== 'legendary' || spawn[pk.name].toLowerCase() == 'mythical')
})
const ls2 = pokes2.filter(p => {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && (spawn[pk.name].toLowerCase()== 'legendry' || spawn[pk.name].toLowerCase()== 'legendary' || spawn[pk.name].toLowerCase() == 'mythical')
})
var pk2b = []
var pk1b = []
for(let i = 0; i < battleData.set.max_6l; i++){
const ls22 = ls2.filter(p => !pk2b.includes(p))
const ls1 = ls.filter(p => !pk1b.includes(p))
pk2b.push(ls22[Math.floor(Math.random() * ls22.length)])
pk1b.push(ls1[Math.floor(Math.random()* ls1.length)])
}
for(let i = 0; i < battleData.set.min_6l; i++){
const pk2bb = pk2b.filter(p => !pk2.includes(p))
const pk1bb = pk1b.filter(p => !pk1.includes(p))
pk2.push(pk2bb[Math.floor(Math.random() * pk2bb.length)])
pk1.push(pk1bb[Math.floor(Math.random()* pk1bb.length)])
}
for(let i = pk1.length; i < 6; i++){
const ls5 = pk1.filter(p => {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && (spawn[pk.name].toLowerCase()== 'legendry' || spawn[pk.name].toLowerCase()== 'legendary' || spawn[pk.name].toLowerCase() == 'mythical')
})
if(ls5.length >= battleData.set.max_6l){
pokes1 = pokes1.filter(p => {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && spawn[pk.name].toLowerCase() !== 'legendry' && spawn[pk.name].toLowerCase()!== 'legendary' && spawn[pk.name].toLowerCase() !== 'mythical'
})
}
const rns = pokes1.filter((p)=>!pk1.includes(p))
const rnd = rns[Math.floor(Math.random() * rns.length)]
if(rnd){
pk1.push(rnd)
}
}
for(let i = pk2.length; i < 6; i++){
const ls5 = pk2.filter(p => {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && (spawn[pk.name].toLowerCase()== 'legendry' || spawn[pk.name].toLowerCase()== 'legendary' || spawn[pk.name].toLowerCase() == 'mythical')
})
if(ls5.length >= battleData.set.max_6l){
pokes2 = pokes2.filter(p => {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && spawn[pk.name].toLowerCase() !== 'legendry' && spawn[pk.name].toLowerCase()!== 'legendary' && spawn[pk.name].toLowerCase() !== 'mythical'
})
}
const rns2 = pokes2.filter((p)=>!pk2.includes(p))
const rnd2 = rns2[Math.floor(Math.random()*rns2.length)]
if(rnd2){
pk2.push(rnd2)
}
}
pokes1 = pk1
pokes2 = pk2
}

pokes1 = pokes1.slice(0,battleData.set.max_poke*1)
pokes2 = pokes2.slice(0,battleData.set.max_poke*1)

battleData.users[ctx.from.id] = true
const leng = pokes1.filter(p => {
const pk = data.pokes.find(pok=>pok.pass == p)
return pk && (spawn[pk.name].toLowerCase()== 'legendry' || spawn[pk.name].toLowerCase()== 'legendary' || spawn[pk.name].toLowerCase() == 'mythical')
})
const leng2 = pokes2.filter(p => {
const pk = data2.pokes.find(pok=>pok.pass == p)
return pk && (spawn[pk.name].toLowerCase()== 'legendry' || spawn[pk.name].toLowerCase()== 'legendary' || spawn[pk.name].toLowerCase() == 'mythical')
})
console.log(leng,leng2)
if(pokes1.length < 1 || leng.length < battleData.set.min_6l || leng.length > battleData.set.max_6l){
battleData.users[id1] = false
}
if(pokes2.length < 1 || leng2.length < battleData.set.min_6l || leng2.length > battleData.set.max_6l){
battleData.users[id2] = false
}
if(!battleData.users[ctx.from.id]){
ctx.answerCbQuery('A valid team for this battle could not be formed')
return
}
await saveBattleData(bword, battleData);
if(Object.values(battleData.users).every(value => value === true)){
const mdata = await loadMessageData();
if(mdata.battle.includes(parseInt(id2))){
ctx.answerCbQuery('You Are In A Battle')
return
}
if(mdata.battle.includes(parseInt(id1))){
ctx.answerCbQuery('Opponent Is In A Battle')
return
}
var la = {}
var tem = {}
let spe = {}
for(const p of pokes1){
const pk = data.pokes.filter((poke)=> poke.pass == p)
if(pk[0]){
const base = pokestats[pk[0].name]
const clevel = plevel(pk[0].name,pk[0].exp)
const stats = await Stats(base,pk[0].ivs,pk[0].evs,c(pk[0].nature),clevel)
la[pk[0].pass] = clevel
tem[pk[0].pass] = stats.hp
spe[pk[0].pass] = stats.speed
}
}
var la2 = {}
var tem2 = {}
let spe2 = {}
for(const p of pokes2){
const pk = data2.pokes.filter((poke)=> poke.pass == p)
if(pk[0]){
const base = pokestats[pk[0].name]
const clevel = plevel(pk[0].name,pk[0].exp)
const stats = await Stats(base,pk[0].ivs,pk[0].evs,c(pk[0].nature),clevel)
la2[pk[0].pass] = clevel
tem2[pk[0].pass] = stats.hp
spe2[pk[0].pass] = stats.speed
}
}
const user1poke = data.pokes.filter((poke)=>poke.pass==pokes1[0])[0]
const user2poke = data2.pokes.filter((poke)=>poke.pass==pokes2[0])[0]
const base1 = pokestats[user1poke.name]
const base2 = pokestats[user2poke.name]
const result = spe[Object.keys(spe)[0]] > spe2[Object.keys(spe2)[0]] ? Object.keys(spe)[0] : Object.keys(spe2)[0];
console.log(result)
if(result in tem){
battleData.c = Object.keys(tem)[0]
battleData.chp = tem[battleData.c]
battleData.o = Object.keys(tem2)[0]
battleData.ohp = tem2[battleData.o]
battleData.cid = id1
battleData.oid = id2
battleData.tem = tem
battleData.la = la
battleData.tem2 = tem2
battleData.la2 = la2
battleData.ot = {}
battleData.ot[battleData.name] = battleData.ohp
}else if(result in tem2){
battleData.c = Object.keys(tem2)[0]
battleData.chp = tem2[battleData.c]
battleData.o = Object.keys(tem)[0]
battleData.ohp = tem[battleData.o]
battleData.cid = id2
battleData.oid = id1
battleData.tem = tem2
battleData.la = la2
battleData.tem2 = tem
battleData.la2 = la
battleData.ot = {}
battleData.ot[battleData.name] = battleData.ohp
}
await saveBattleData(bword, battleData);
const attacker = await getUserData(battleData.cid)
const defender = await getUserData(battleData.oid)
const p = attacker.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const p2 = defender.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const pp = pokes[p.name]
const pp2 = pokes[p2.name]
let msg = '<b>✦ The Pokomon battle commences!</b>'
msg += '\n\n<b>Opponent :</b> <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>'
msg += '\n<b>'+c(p2.name)+'</b> ['+c(pp2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p2.name,p2.exp)+' | <b>HP :</b> '+battleData.ohp+'/'+battleData.tem2[battleData.o]+''
msg += '\n<code>'+Bar(battleData.tem2[battleData.o],battleData.ohp)+'</code>'
msg += '\n\n<b>Turn :</b> <a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a>'
msg += '\n<b>'+c(p.name)+'</b> ['+c(pp.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p.name,p.exp)+' | <b>HP :</b> '+battleData.chp+'/'+battleData.tem[battleData.c]+''
msg += '\n<code>'+Bar(battleData.tem[battleData.c],battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
let img = pp.front_default_image
const im = shiny.filter((poke)=>poke.name==p.name)[0]
if(events[p.name] && p.symbol == '🪅') {
img = events[p.name]
}
if(im && p.symbol=='✨'){
img=im.shiny_url
}
for(const move2 of p.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
let ext = {}
if(battleData.set.preview=='Upper'){
ext = {link_preview_options:{url:img,show_above_text:true}}
}else if(battleData.set.preview=='Down'){
ext = {link_preview_options:{url:img,show_above_text:false}}
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'multimo_'+word+'_'+bword+'_'+battleData.cid+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'multybg_'+bword+''},{text:'Escape',callback_data:'multryn_'+bword+'_multi'},{text:'Pokemon',callback_data:'multichanpok_'+bword+'_'+battleData.cid+''}]
const isstone = [...new Set(attacker.inv.stones)].filter(stone => stones[stone]?.pokemon === p.name)
if(battleData.set.key_item && isstone.length > 0 && Object.keys(attacker.extra.megas).length == 0 && attacker.inv.ring){
const rows5 = []
for(const i of isstone){
rows5.push({text:'Use '+c(i)+'',callback_data:'megtst_'+i+'_'+bword+''})
}
rows.push(rows5)
}
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard,...ext})
const messageData = await loadMessageData();
messageData.battle.push(parseInt(battleData.cid))
messageData.battle.push(parseInt(battleData.oid))
    messageData[bword] = { chat:ctx.chat.id,mid: ctx.callbackQuery.message.message_id, times: Date.now(), turn:battleData.cid, oppo:battleData.oid };
    await saveMessageData(messageData);
}else{
let msg = '⚔ <a href="tg://user?id='+id1+'"><b>'+data.inv.name+'</b></a> Has Challenged <a href="tg://user?id='+id2+'"><b>'+data2.inv.name+'</b></a>\n'
let msg2 = ''
const settings = battleData.set
if(settings.max_poke < 6){
f = true
msg2 += '\n<b>• Max number of pokemon:</b> '+settings.max_poke+''
}
if(settings.min_6l > 0 || settings.max_6l < 6){
f = true
msg2 += '\n<b>• Number of legendaries:</b> '+settings.min_6l+'-'+settings.max_6l+''
}
if(settings.min_level > 1 || settings.max_level < 100){
f = true
msg2 += '\n<b>• Level gap of pokemon:</b> '+settings.min_level+'-'+settings.max_level+''
}
if(!settings.switch){
f = true
msg2 += '\n<b>• Switching pokemon:</b> Disabled'
}
if(!settings.key_item){
f = true
msg2 += '\n<b>• Form Changing:</b> Disabled'
}
if(settings.sandbox){
f = true
msg2 += '\n<b>• Sandbox mode:</b> Enabled'
}
if(settings.random){
f = true
msg2 += '\n<b>• Random mode:</b> Enabled'
}
if(settings.preview && settings.preview != 'no'){
f = true
msg2 += '\n<b>• Preview mode:</b> '+settings.preview+''
}
if(settings.pin){
f = true
msg2 += '\n<b>• Pin mode:</b> Enabled'
}
if(!settings.type_effects){
f = true
msg2 += '\n<b>• Type efficiency:</b> Disabled'
}
if(!settings.dual_type){
f = true
msg2 += '\n<b>• Dual Types:</b> Disabled'
}
if(settings.allow_regions.length > 0){
f = true
msg2 += '\n<b>• Only regions:</b> ['+c(settings.allow_regions.join(' , '))+']'
}
if(settings.ban_regions.length > 0){
f = true
msg2 += '\n<b>• Banned regions:</b> ['+c(settings.ban_regions.join(' , '))+']'
}
if(settings.ban_types.length > 0){
f = true
msg2 += '\n<b>• Banned types:</b> ['+c(settings.ban_types.join(' , '))+']'
}
if(settings.allow_types.length > 0){
f = true
msg2 += '\n<b>• Types:</b> ['+c(settings.allow_types.join(' , '))+']'
}
if(battleData.users[id1]){
var em1 = '✓'
}else{
var em1 = '✗'
}
if(battleData.users[id2]){
var em2 = '✓'
}else{
var em2 = '✗'
}
if(f){
msg += msg2
msg += '\n\n-> <a href="tg://user?id='+id1+'"><b>'+data.inv.name+'</b></a> : '+em1+'\n-> <a href="tg://user?id='+id2+'"><b>'+data2.inv.name+'</b></a> : '+em2+''
}else{
msg += '\n\n-> <a href="tg://user?id='+id1+'"><b>'+data.inv.name+'</b></a> : '+em1+'\n-> <a href="tg://user?id='+id2+'"><b>'+data2.inv.name+'</b></a> : '+em2+''
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:[[{text:'Agree ✓',callback_data:'battle_'+id1+'_'+id2+'_'+bword+''},{text:'Reject ✗',callback_data:'reject_'+id1+'_'+id2+'_'+bword+''}],[{text:'Battle Settings ⚔',callback_data:'sytbr_'+id1+'_'+id2+'_'+bword+''}]]}})
}
})

bot.action(/multimo_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const moveid = ctx.callbackQuery.data.split('_')[1]
const bword = ctx.callbackQuery.data.split('_')[2]
const id = ctx.callbackQuery.data.split('_')[3]
if(ctx.from.id!=id){
ctx.answerCbQuery('Not Your Turn')
return
}
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
const move = dmoves[moveid]
const data = await getUserData(battleData.cid)
const data2 = await getUserData(battleData.oid)
const p = data.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const op = data2.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const base1 = pokestats[p.name]
const base2 = pokestats[op.name]
const level1 = plevel(p.name,p.exp)
const level2 = plevel(op.name,op.exp)
const stats1 = await Stats(base1,p.ivs,p.evs,c(p.nature),level1)
const stats2 = await Stats(base2,op.ivs,op.evs,c(op.nature),level2)
let atk = stats1.attack
let def = stats1.defense
let atk2 = stats2.attack
let def2 = stats2.defense
const type1 = pokes[p.name].types[0]
const type2 = pokes[p.name].types[1] ? pokes[p.name].types[1] : null
const type3 = pokes[op.name].types[0]
const type4 = pokes[op.name].types[1] ? c(pokes[op.name].types[1]) : null
if(!battleData.set.type_effects){
var eff1 = 1
}else{
var eff1 = await eff(c(move.type),c(type3),type4)
}
if(move.category=='special'){
atk = stats1.special_attack
def = stats1.special_defense
atk2 = stats2.special_attack
def2 = stats2.special_defense
}
console.log(eff1,type3,type4)
if(Math.random()*100 > move.accuracy){
var msg2 = '➣ <b>'+c(p.name)+'</b> <b>'+c(move.name)+'</b> has missed.'
}else if(Math.random() < 0.05){
var msg2 = '➣ <b>'+c(op.name)+'</b> Dodged <b>'+c(p.name)+'</b>\'s <b>'+c(move.name)+'</b>'
}else{
var damage = Math.min(calc(atk,def2,level1,move.power,eff1),battleData.ohp)
battleData.ohp = Math.max((battleData.ohp-damage),0)
battleData.tem2[battleData.o] = Math.max((battleData.tem2[battleData.o]-damage),0)
var msg2 = '➣ <b>'+c(p.name)+'</b> used <b>'+c(move.name)+'</b> and dealt <code>'+damage+'</code> HP of <b>'+c(op.name)+'</b>'
}
let msg = msg2
await saveBattleData(bword, battleData);
const cc = battleData.c
const cc2 = battleData.chp
const cc3 = battleData.cid
const cc4 = battleData.tem
const cc5 = battleData.la
battleData.c = battleData.o
battleData.chp = battleData.ohp
battleData.cid = battleData.oid
battleData.tem = battleData.tem2
battleData.la = battleData.la2
battleData.o = cc
battleData.ohp = cc2
battleData.oid = cc3
battleData.tem2 = cc4
battleData.la2 = cc5
await saveBattleData(bword, battleData);

const attacker = await getUserData(battleData.cid)
const defender = await getUserData(battleData.oid)
const p1 = attacker.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const p2 = defender.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const pp = pokes[p1.name]
const pp2 = pokes[p2.name]
if(eff1 == 0){
msg += '\n<b>✶ It\'s 0x effective!</b>'
}else if(eff1 == 0.5){
msg += '\n<b>✶ It\'s not very effective...</b>'
}else if(eff1 == 2){
msg += '\n<b>✶ It\'s super effective!</b>'
}else if(eff1 == 4){
msg += '\n<b>✶ It\'s incredibly super effective!</b>'
}
msg += '\n\n<b>Opponent :</b> <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>'
msg += '\n<b>'+c(p2.name)+'</b> ['+c(pp2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p2.name,p2.exp)+' | <b>HP :</b> '+battleData.ohp+'/'+stats1.hp+''
msg += '\n<code>'+Bar(stats1.hp,battleData.ohp)+'</code>'
msg += '\n\n<b>Turn :</b> <a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a>'
msg += '\n<b>'+c(p1.name)+'</b> ['+c(pp.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p1.name,p1.exp)+' | <b>HP :</b> '+battleData.chp+'/'+stats2.hp+''
msg += '\n<code>'+Bar(stats2.hp,battleData.chp)+'</code>'
const messageData = await loadMessageData();
    messageData[bword] = { chat:ctx.chat.id,mid: ctx.callbackQuery.message.message_id, times: Date.now(),turn:battleData.cid,oppo:battleData.oid };

    await saveMessageData(messageData);
if(battleData.chp < 1){
msg += '\n\n<b>'+c(p1.name)+'</b> has fainted. Choose your next pokemon.'
if(!battleData.set.sandbox){
await incexp(defender,p2,attacker,p1,ctx,battleData,bot)
await incexp2(attacker,p1,defender,p2,ctx,battleData,bot)
}
const av = []
const al = []
let b = 1
for(const pok in battleData.tem){
if(battleData.tem[pok] > 0){
const ppe = attacker.pokes.filter((poke)=>poke.pass == pok)[0]
av.push({name:b,pass:pok})
al.push(pok)
}else{
av.push({name:b+' (0 HP)',pass:pok})
}
b++;
}
if(al.length < 1){
const gpc = Object.keys(battleData.tem).length*15
defender.inv.pc += gpc
if(!defender.inv.win){
defender.inv.win = 0
}
defender.inv.win += 1
if(!attacker.inv.lose){
attacker.inv.lose = 0
}
attacker.inv.lose += 1
await saveUserData(battleData.cid,attacker)
await saveUserData(battleData.oid,defender)
const messageData = await loadMessageData();
messageData.battle = messageData.battle.filter((chats)=> chats!==parseInt(messageData[bword].turn) && chats!==parseInt(messageData[bword].oppo))
delete messageData[bword];
await saveMessageData(messageData);
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<b>'+c(p1.name)+' </b>has fainted.\n<a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a> lost against <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>.\n+'+gpc+' PokeCoins 💷',{parse_mode:'HTML'})
if(Math.random()< 0.00005){
const idr = (Math.random()<0.5) ? battleData.oid : battleData.cid
const dr = await getUserData(idr)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+idr+'"><b>'+dr.inv.name+'</b></a>, A <b>Move Tutor</b> was watching your match. He wants to <b>Teach</b> one of your <b>Pokemon</b> a <b>Move.</b>',{reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+''}]]}})
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const d = new Date().toLocaleString('en-US', options)
const my = String(tutors[Math.floor(Math.random()*tutors.length)])
const m77 = await sendMessage(ctx,idr,'While you were <b>Battling</b> with a trainer, An expert <b>Move Tutor</b> saw your battle very interestingly. He Impressed with your <b>Battle</b> experience and strategy. He wants to <b>Teach</b> your any of <b>Pokemon</b> a move. It will be available only for next <b>15 Minutes.</b>\n\n✦ <b>'+c(dmoves[my].name)+'</b> ['+c(dmoves[my].type)+' '+emojis[dmoves[my].type]+']\n<b>Power:</b> '+dmoves[my].power+', <b>Accuracy:</b> '+dmoves[my].accuracy+' (<i>'+c(dmoves[my].category)+'</i>) \n\n• Click below to <b>Select</b> pokemon to teach <b>'+c(dmoves[my].name)+'</b>',{parse_mode:'html',reply_markup:{inline_keyboard:[[{text:'Select',callback_data:'tyrt_'+my+'_'+d+''}]]}})
const mdata = await loadMessageData();
if(!mdata.tutor){
mdata.tutor = {}
}
mdata.tutor[m77.message_id] = {chat:idr,tdy:d,mv:dmoves[my].name}
await saveMessageData(mdata)
}
}else{
const buttons = av.map((poke) => ({ text: poke.name, callback_data: 'multidne_' + poke.pass + '_' + bword + '_'+battleData.cid+'_fainted' }));
while (buttons.length < 6) {
  buttons.push({ text: '  ', callback_data: 'empty' });
}
const rows = [[{text:'View Team',callback_data:'viewteam_'+bword+'_'+battleData.cid+''}]];
for (let i = 0; i < buttons.length; i += 2) {
  rows.push(buttons.slice(i, i + 2));
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
return
}
return
}
msg += '\n\n<b>Moves :</b>'
const moves = []
let img = pp.front_default_image
const im = shiny.filter((poke)=>poke.name==p1.name)[0]
if(events[p1.name] && p1.symbol == '🪅'){
img = events[p1.name]
}
if(im && p1.symbol=='✨'){
img=im.shiny_url
}
for(const move2 of p1.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'multimo_'+word+'_'+bword+'_'+battleData.cid+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
let ext = {}
if(battleData.set.preview=='Upper'){
ext = {link_preview_options:{url:img,show_above_text:true}}
}else if(battleData.set.preview=='Down'){
ext = {link_preview_options:{url:img,show_above_text:false}}
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'multybg_'+bword+''},{text:'Escape',callback_data:'multryn_'+bword+'_multi'},{text:'Pokemon',callback_data:'multichanpok_'+bword+'_'+battleData.cid+''}]
if(!attacker.inv.stones){
attacker.inv.stones = []
}
const isstone = [...new Set(attacker.inv.stones)].filter(stone => stones[stone]?.pokemon === p1.name)
if(battleData.set.key_item && isstone.length > 0 && Object.keys(attacker.extra.megas).length == 0 && attacker.inv.ring){
const rows5 = []
for(const i of isstone){
rows5.push({text:'Use '+c(i)+'',callback_data:'megtst_'+i+'_'+bword+''})
}
rows.push(rows5)
}

rows.push(key2)
  const keyboard = {
    inline_keyboard: rows
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard,...ext})
})
bot.action(/multichanpok_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
ctx.answerCbQuery('Not Your Turn')
return
}
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
if(!battleData.set.switch){
ctx.answerCbQuery('Switch is diabled')
return
}
const attacker = await getUserData(battleData.cid)
const defender = await getUserData(battleData.oid)
const p1 = attacker.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const p2 = defender.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const pp = pokes[p1.name]
const pp2 = pokes[p2.name]
const base1 = pokestats[p2.name]
const base2 = pokestats[p1.name]
const level1 = plevel(p2.name,p2.exp)
const level2 = plevel(p1.name,p1.exp)
const stats1 = await Stats(base1,p2.ivs,p2.evs,c(p2.nature),level1)
const stats2 = await Stats(base2,p1.ivs,p1.evs,c(p1.nature),level2)
let msg = '\n\n<b>Opponent :</b> <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>'
msg += '\n<b>'+c(p2.name)+'</b> ['+c(pp2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p2.name,p2.exp)+' | <b>HP :</b> '+battleData.ohp+'/'+stats1.hp+''
msg += '\n<code>'+Bar(stats1.hp,battleData.ohp)+'</code>'
msg += '\n\n<b>Turn :</b> <a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a>'
msg += '\n<b>'+c(p1.name)+'</b> ['+c(pp.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p1.name,p1.exp)+' | <b>HP :</b> '+battleData.chp+'/'+stats2.hp+''
msg += '\n<code>'+Bar(stats2.hp,battleData.chp)+'</code>'
msg += '\n\n<i>Choose another pokemon for battle.</i>'
const av = []
let b = 1
let al = []
for(const pok in battleData.tem){
if(battleData.tem[pok] > 0){
const ppe = attacker.pokes.filter((poke)=>poke.pass == pok)[0]
av.push({name:b,pass:pok})
al.push(pok)
}else{
av.push({name:b+' (0 HP)',pass:pok})
}
b++;
}
const buttons = av.map((poke) => ({ text: poke.name, callback_data: 'multidne_' + poke.pass + '_' + bword + '_'+battleData.cid+'_change' }));
while (buttons.length < 6) {
  buttons.push({ text: '  ', callback_data: 'empty' });
}
const rows = [[{text:'View Team',callback_data:'viewteam_'+bword+'_'+battleData.cid+''}]];
for (let i = 0; i < buttons.length; i += 2) {
  rows.push(buttons.slice(i, i + 2));
}
rows.push([{text:'⬅️ Back',callback_data:'multibttle_'+bword+'_'+battleData.cid+''}])
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
})
bot.action(/multibttle_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
ctx.answerCbQuery('Not Your Turn')
return
}
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
const attacker = await getUserData(battleData.cid)
const defender = await getUserData(battleData.oid)
const p1 = attacker.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const p2 = defender.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const pp = pokes[p1.name]
const pp2 = pokes[p2.name]
const base1 = pokestats[p2.name]
const base2 = pokestats[p1.name]
const level1 = plevel(p2.name,p2.exp)
const level2 = plevel(p1.name,p1.exp)
const stats1 = await Stats(base1,p2.ivs,p2.evs,c(p2.nature),level1)
const stats2 = await Stats(base2,p1.ivs,p1.evs,c(p1.nature),level2)
let msg = '\n\n<b>Opponent :</b> <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>'
msg += '\n<b>'+c(p2.name)+'</b> ['+c(pp2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p2.name,p2.exp)+' | <b>HP :</b> '+battleData.ohp+'/'+stats1.hp+''
msg += '\n<code>'+Bar(stats1.hp,battleData.ohp)+'</code>'
msg += '\n\n<b>Turn :</b> <a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a>'
msg += '\n<b>'+c(p1.name)+'</b> ['+c(pp.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p1.name,p1.exp)+' | <b>HP :</b> '+battleData.chp+'/'+stats2.hp+''
msg += '\n<code>'+Bar(stats2.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
let img = pp.front_default_image
const im = shiny.filter((poke)=>poke.name==p1.name)[0]
if(events[p1.name] && p1.symbol == '🪅'){
img = events[p1.name]
}
if(im && p1.symbol=='✨'){
img=im.shiny_url
}
for(const move2 of p1.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
let ext = {}
if(battleData.set.preview=='Upper'){
ext = {link_preview_options:{url:img,show_above_text:true}}
}else if(battleData.set.preview=='Down'){
ext = {link_preview_options:{url:img,show_above_text:false}}
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'multimo_'+word+'_'+bword+'_'+battleData.cid+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'multybg_'+bword+''},{text:'Escape',callback_data:'multryn_'+bword+'_multi'},{text:'Pokemon',callback_data:'multichanpok_'+bword+'_'+battleData.cid+''}]
const isstone = [...new Set(attacker.inv.stones)].filter(stone => stones[stone]?.pokemon === p1.name)
if(battleData.set.key_item && isstone.length > 0 && Object.keys(attacker.extra.megas).length == 0 && attacker.inv.ring){
const rows5 = []
for(const i of isstone){
rows5.push({text:'Use '+c(i)+'',callback_data:'megtst_'+i+'_'+bword+''})
}
rows.push(rows5)
}
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard,...ext})
})
bot.action(/megtst_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const stone5 = ctx.callbackQuery.data.split('_')[1]
const bword = ctx.callbackQuery.data.split('_')[2]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
if(ctx.from.id!=battleData.cid){
ctx.answerCbQuery('Not Your Turn')
return
}
const stone = stones[stone5]
const d2b = await getUserData(battleData.cid)
const pke = d2b.pokes.filter((pk)=>pk.pass == battleData.c)[0]
const n = pke.name
if(stone.pokemon!=pke.name){
console.log(pke.name)
return
}
if(!d2b.extra.megas){
d2b.extra.megas = {}
}
if(!battleData.megas){
battleData.megas = {}
}
battleData.megas[pke.pass] = pke.name
d2b.extra.megas[pke.pass] = pke.name
pke.name = stone.mega
await saveUserData(ctx.from.id,d2b)
const pass = battleData.c
const atta = await getUserData(battleData.cid)
const deffa = await getUserData(battleData.oid)
const p12 = atta.pokes.filter((poke)=>poke.pass==pass)[0]
let msg = '<b>'+c(p12.name)+'</b> has transformed into <b>'+c(stone.mega)+'</b>'
const p22 = deffa.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const base12 = pokestats[p22.name]
const base22 = pokestats[p12.name]
const level12 = plevel(p22.name,p22.exp)
const level22 = plevel(p12.name,p12.exp)
const stats12 = await Stats(base12,p22.ivs,p22.evs,c(p22.nature),level12)
const stats22 = await Stats(base22,p12.ivs,p12.evs,c(p12.nature),level22)
const result = stats12.speed > stats22.speed ? p22.pass : p12.pass
if(result in battleData.tem2){
const cc = battleData.c
const cc2 = battleData.chp
const cc3 = battleData.cid
const cc4 = battleData.tem
const cc5 = battleData.la
battleData.c = battleData.o
battleData.chp = battleData.ohp
battleData.cid = battleData.oid
battleData.tem = battleData.tem2
battleData.la = battleData.la2
battleData.o = cc
battleData.ohp = cc2
battleData.oid = cc3
battleData.tem2 = cc4
battleData.la2 = cc5
}
const dl = await getUserData(battleData.cid)
const p169 = dl.pokes.filter((poke)=>poke.pass==battleData.c)[0]
msg += '\n<b>'+c(p169.name)+'</b> <i>speed advantage allows to move first</i>'
await saveBattleData(bword, battleData);
const attacker = await getUserData(battleData.cid)
const defender = await getUserData(battleData.oid)
const p1 = attacker.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const p2 = defender.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const pp = pokes[p1.name]
const pp2 = pokes[p2.name]
const base1 = pokestats[p2.name]
const base2 = pokestats[p1.name]
const level1 = plevel(p2.name,p2.exp)
const level2 = plevel(p1.name,p1.exp)
const stats1 = await Stats(base1,p2.ivs,p2.evs,c(p2.nature),level1)
const stats2 = await Stats(base2,p1.ivs,p1.evs,c(p1.nature),level2)
msg += '\n\n<b>Opponent :</b> <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>'
msg += '\n<b>'+c(p2.name)+'</b> ['+c(pp2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p2.name,p2.exp)+' | <b>HP :</b> '+battleData.ohp+'/'+stats1.hp+''
msg += '\n<code>'+Bar(stats1.hp,battleData.ohp)+'</code>'
msg += '\n\n<b>Turn :</b> <a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a>'
msg += '\n<b>'+c(p1.name)+'</b> ['+c(pp.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p1.name,p1.exp)+' | <b>HP :</b> '+battleData.chp+'/'+stats2.hp+''
msg += '\n<code>'+Bar(stats2.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
let img = pp.front_default_image
const im = shiny.filter((poke)=>poke.name==p1.name)[0]
if(events[p1.name] && p1.symbol == '🪅'){
img = events[p1.name]
}
if(im && p1.symbol=='✨'){
img=im.shiny_url
}
for(const move2 of p1.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
let ext = {}
if(battleData.set.preview=='Upper'){
ext = {link_preview_options:{url:img,show_above_text:true}}
}else if(battleData.set.preview=='Down'){
ext = {link_preview_options:{url:img,show_above_text:false}}
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'multimo_'+word+'_'+bword+'_'+battleData.cid+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'multybg_'+bword+''},{text:'Escape',callback_data:'multryn_'+bword+'_multi'},{text:'Pokemon',callback_data:'multichanpok_'+bword+'_'+battleData.cid+''}]
const isstone = [...new Set(attacker.inv.stones)].filter(stone => stones[stone]?.pokemon === p1.name)
if(battleData.set.key_item && isstone.length > 0 && Object.keys(attacker.extra.megas).length == 0 && attacker.inv.ring){
const rows5 = []
for(const i of isstone){
rows5.push({text:'Use '+c(i)+'',callback_data:'megtst_'+i+'_'+bword+''})
}
rows.push(rows5)
}
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows
  };
const pk = pokes[stone.mega]
let img2 = pokes[p12.name].front_default_image
const im2 = shiny.filter((poke)=>poke.name==p12.name)[0]
if(im2 && p12.symbol=='✨'){
img2=im2.shiny_url
}
await sendMessage(ctx,ctx.chat.id,img2,{caption:'*'+c(n)+'* has transformed into *'+c(pke.name)+'*.',parse_mode:'markdown',reply_to_message_id:ctx.callbackQuery.message.message_id})
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard,...ext})
})

bot.action(/multidne_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const pass = ctx.callbackQuery.data.split('_')[1]
const bword = ctx.callbackQuery.data.split('_')[2]
const id = ctx.callbackQuery.data.split('_')[3]
const prop = ctx.callbackQuery.data.split('_')[4]
if(ctx.from.id!=id){
ctx.answerCbQuery('Not Your Turn')
return
}
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
if(battleData.tem[pass] < 1){
ctx.answerCbQuery('This Poke Is Ded')
return
}
if(battleData.c==pass){
ctx.answerCbQuery('This Poke Is Already Batteling')
return
}

battleData.c = pass
battleData.chp = battleData.tem[pass]
const atta = await getUserData(battleData.cid)
const deffa = await getUserData(battleData.oid)
const p12 = atta.pokes.filter((poke)=>poke.pass==pass)[0]
let msg = '<b>'+c(p12.name)+'</b> came for battle'
const p22 = deffa.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const base12 = pokestats[p22.name]
const base22 = pokestats[p12.name]
const level12 = plevel(p22.name,p22.exp)
const level22 = plevel(p12.name,p12.exp)
const stats12 = await Stats(base12,p22.ivs,p22.evs,c(p22.nature),level12)
const stats22 = await Stats(base22,p12.ivs,p12.evs,c(p12.nature),level22)
const result = stats12.speed > stats22.speed ? p22.pass : p12.pass
if(prop == 'fainted'){
if(result in battleData.tem2){
const cc = battleData.c
const cc2 = battleData.chp
const cc3 = battleData.cid
const cc4 = battleData.tem
const cc5 = battleData.la
battleData.c = battleData.o
battleData.chp = battleData.ohp
battleData.cid = battleData.oid
battleData.tem = battleData.tem2
battleData.la = battleData.la2
battleData.o = cc
battleData.ohp = cc2
battleData.oid = cc3
battleData.tem2 = cc4
battleData.la2 = cc5
}
const dl = await getUserData(battleData.cid)
const p169 = dl.pokes.filter((poke)=>poke.pass==battleData.c)[0]
msg += '\n<b>'+c(p169.name)+'</b> <i>speed advantage allows to move first</i>'
}
if(prop == 'change'){
const cc = battleData.c
const cc2 = battleData.chp
const cc3 = battleData.cid
const cc4 = battleData.tem
const cc5 = battleData.la
battleData.c = battleData.o
battleData.chp = battleData.ohp
battleData.cid = battleData.oid
battleData.tem = battleData.tem2
battleData.la = battleData.la2
battleData.o = cc
battleData.ohp = cc2
battleData.oid = cc3
battleData.tem2 = cc4
battleData.la2 = cc5
}
await saveBattleData(bword, battleData);
const attacker = await getUserData(battleData.cid)
const defender = await getUserData(battleData.oid)
const p1 = attacker.pokes.filter((poke)=>poke.pass==battleData.c)[0]
const p2 = defender.pokes.filter((poke)=>poke.pass==battleData.o)[0]
const pp = pokes[p1.name]
const pp2 = pokes[p2.name]
const base1 = pokestats[p2.name]
const base2 = pokestats[p1.name]
const level1 = plevel(p2.name,p2.exp)
const level2 = plevel(p1.name,p1.exp)
const stats1 = await Stats(base1,p2.ivs,p2.evs,c(p2.nature),level1)
const stats2 = await Stats(base2,p1.ivs,p1.evs,c(p1.nature),level2)
msg += '\n\n<b>Opponent :</b> <a href="tg://user?id='+battleData.oid+'"><b>'+defender.inv.name+'</b></a>'
msg += '\n<b>'+c(p2.name)+'</b> ['+c(pp2.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p2.name,p2.exp)+' | <b>HP :</b> '+battleData.ohp+'/'+stats1.hp+''
msg += '\n<code>'+Bar(stats1.hp,battleData.ohp)+'</code>'
msg += '\n\n<b>Turn :</b> <a href="tg://user?id='+battleData.cid+'"><b>'+attacker.inv.name+'</b></a>'
msg += '\n<b>'+c(p1.name)+'</b> ['+c(pp.types.join(' / '))+']'
msg += '\n<b>Level :</b> '+plevel(p1.name,p1.exp)+' | <b>HP :</b> '+battleData.chp+'/'+stats2.hp+''
msg += '\n<code>'+Bar(stats2.hp,battleData.chp)+'</code>'
msg += '\n\n<b>Moves :</b>'
const moves = []
let img = pp.front_default_image
const im = shiny.filter((poke)=>poke.name==p1.name)[0]
if(events[p1.name] && p1.symbol == '🪅'){
img = events[p1.name]
}
if(im && p1.symbol=='✨'){
img=im.shiny_url
}
for(const move2 of p1.moves){
let move = dmoves[move2]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
moves.push(''+move2+'')
}
let ext = {}
if(battleData.set.preview=='Upper'){
ext = {link_preview_options:{url:img,show_above_text:true}}
}else if(battleData.set.preview=='Down'){
ext = {link_preview_options:{url:img,show_above_text:false}}
}
const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'multimo_'+word+'_'+bword+'_'+battleData.cid+'' }));
while(buttons.length < 4){
buttons.push({text:'  ',callback_data:'empty'})
}
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
const key2 = [{text:'Bag',callback_data:'multybg_'+bword+''},{text:'Escape',callback_data:'multryn_'+bword+'_multi'},{text:'Pokemon',callback_data:'multichanpok_'+bword+'_'+battleData.cid+''}]
const isstone = [...new Set(attacker.inv.stones)].filter(stone => stones[stone]?.pokemon === p1.name)
if(battleData.set.key_item && isstone.length > 0 && Object.keys(attacker.extra.megas).length == 0 && attacker.inv.ring){
const rows5 = []
for(const i of isstone){
rows5.push({text:'Use '+c(i)+'',callback_data:'megtst_'+i+'_'+bword+''})
}
rows.push(rows5)
}
rows.push(key2)
  const keyboard = {
    inline_keyboard: rows
  };
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:keyboard,...ext})
})
bot.action(/reject_/,async ctx => {
const id1 = ctx.callbackQuery.data.split('_')[1]
const id2 = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id2 && ctx.from.id!=id1){
ctx.answerCbQuery();
return
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'This challenge has been rejected by <a href="tg://user?id='+ctx.from.id+'"><b>'+he.encode(ctx.from.first_name)+'</b></a>',{parse_mode:'HTML'})
})
bot.action(/multryn_/,async ctx => {
if (battlec[ctx.chat.id] && Date.now() - battlec[ctx.chat.id] < 1600) {

  ctx.answerCbQuery('Try Again');
  return;
}
battlec[ctx.chat.id] = Date.now();
const bword = ctx.callbackQuery.data.split('_')[1]
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
if(ctx.from.id!=battleData.cid && ctx.from.id!=battleData.oid){
ctx.answerCbQuery();
return
}
if(!battleData.runs){
battleData.runs = []
}
if(battleData.runs.includes(ctx.from.id)){
ctx.answerCbQuery('You Have Already Escapped Waiting For Opponent')
}else{
battleData.runs.push(ctx.from.id)
ctx.answerCbQuery('Waiting For Opponent To Run')
await saveBattleData(bword, battleData);
}
if(battleData.runs.includes(parseInt(battleData.cid)) && battleData.runs.includes(parseInt(battleData.oid))){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Both Player Choosed To *Escape* Battle',{parse_mode:'markdown'})
const messageData = await loadMessageData();
messageData.battle = messageData.battle.filter((chats)=> chats!==parseInt(messageData[bword].turn) && chats!==parseInt(messageData[bword].oppo))
delete messageData[bword];
await saveMessageData(messageData);
}
})

async function editOverdueMessages() {
    const messageData = await loadMessageData();
for(const id in messageData.moves){
const time = messageData.moves[id].td
const queryTime = new Date(time)
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
console.log(timeDifference)
if(timeDifference > 900000){
bot.telegram.editMessageText(messageData.moves[id].chat,id, null,'Unfortunately, Timeout For *15 Min* Has Over & *'+c(messageData.moves[id].poke)+'* Did Not Learnt *'+c(messageData.moves[id].move)+'*',{parse_mode:'markdown'})
delete messageData.moves[id]
await saveMessageData(messageData)
}
}
for(const id in messageData.tutor){
const time = messageData.tutor[id].tdy
const queryTime = new Date(time)
const options = {
timeZone: 'Asia/Kolkata',
month: 'numeric',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
console.log(timeDifference)
if(timeDifference > 900000){
bot.telegram.editMessageText(messageData.tutor[id].chat,id, null,'Unfortunately, Timeout For *15 Min* Has Over & *Move Tutor* has gone, you *Missed* opportunity to teach your pokemon *'+c(messageData.tutor[id].mv)+'*',{parse_mode:'markdown'})
delete messageData.tutor[id]
await saveMessageData(messageData)
}
}

    Object.entries(messageData)
        .filter(([chatId, userMessageData]) =>
            (userMessageData.times && Date.now() - userMessageData.times > 90000) ||
            (userMessageData.timestamp && Date.now() - userMessageData.timestamp > 60000)
        )
        .map(async ([chatId, userMessageData]) => {
            if (userMessageData.times) {
                const { turn, oppo } = userMessageData;
                const d1 = await getUserData(turn);
                const d2 = await getUserData(oppo);

                const elapsedTime = Date.now() - userMessageData.times;

                if (elapsedTime > 130000) {
                    let newMessage = `<a href="tg://user?id=${turn}"><b>${d1.inv.name}</b></a> has not moved and losses <b>25</b> PokeCoins 💷.`;
                    newMessage += `\n<a href="tg://user?id=${oppo}"><b>${d2.inv.name}</b></a> <b>+25</b> PokeCoins 💷.`;

                    if (d1.inv.pc > 25) {
                        d1.inv.pc -= 25;
                    }

                    d2.inv.pc += 25;

                    await saveUserData(turn, d1);
                    await saveUserData(oppo, d2);
                    messageData.battle = messageData.battle.filter((chats) => chats !== parseInt(turn) && chats !== parseInt(oppo));
                    delete messageData[chatId];
await saveMessageData(messageData);
bot.telegram.editMessageText(userMessageData.chat, userMessageData.mid, null, newMessage, {
                        parse_mode: 'HTML'
})
                }
            } else if (userMessageData.timestamp) {
                const elapsedTime = Date.now() - userMessageData.timestamp;
const dr = await getUserData(chatId)
                if (elapsedTime > 60000 || !dr.extra.hunting) {
                    const newMessage = '*Timeover.*';
                    messageData.battle = messageData.battle.filter((chats) => chats !== userMessageData.id);
                    delete messageData[chatId];
                await saveMessageData(messageData);
bot.telegram.editMessageText(chatId, userMessageData.mid, null, newMessage, {
                        parse_mode: 'markdown'
})
}
            }
        });

}

// schedule.scheduleJob('*/2 * * * * *', editOverdueMessages);
bot.action(/viewteam_/,async ctx => {
const bword = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
let battleData = {};
    try {
      battleData = await getBattleData(bword);
} catch (error) {
      battleData = {};
    }
const data = await getUserData(ctx.from.id)
const te = Object.keys(battleData.tem)
const a = await pokelist(te,ctx,0)
ctx.answerCbQuery(a.replace(/\*/g, ''),{show_alert:true})
})
bot.command('reset_battle',async ctx => {
const data = await loadMessageData()
if(data.battle.includes(ctx.from.id)){
for(const a in data){
if(data[a].times && (data[a].turn == ctx.from.id || data[a].oppo == ctx.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Your One *Multiplayer Battle* Is Going On',{reply_to_message_id:ctx.message.message_id})
return
}
}
if(data[ctx.from.id]){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Your One *Hunt Battle* Is Going On',{reply_to_message_id:ctx.message.message_id})
return
}
data.battle = data.battle.filter((u)=>u!==ctx.from.id)
await saveMessageData(data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Your *Battle Bug* Has Fixed.',{reply_to_message_id:ctx.message.message_id})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Your *Battle Bug* Doesn\'t Seems Active.',{reply_to_message_id:ctx.message.message_id})
}
})
bot.command('record',async ctx => {
if(ctx.from.id==ADMIN_ID){
  const userFiles = (await getAllUserData()).map(u => u.user_id + '.json');
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},"Total *"+userFiles.length+"* Trainer Data Is Registered",{reply_to_message_id:ctx.message.message_id})
}
})
bot.command('trade',check,async ctx => {
const data = await getUserData(ctx.from.id)
const reply = ctx.message.reply_to_message
if(!reply || reply.from.id==ctx.from.id){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Reply to a *User* to trade pokemon with them.',{reply_to_message_id:ctx.message.message_id})
return
}
const mdata = await loadMessageData();
if(mdata.battle.includes(ctx.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Are In A *Battle*',{reply_to_message_id:ctx.message.message_id})
return
}
if(mdata.battle.includes(reply.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Opponent Is In A *Battle*',{reply_to_message_id:ctx.message.message_id})
return
}

const data2 = await getUserData(reply.from.id)
if(!data2.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:reply.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a> Wants To Trade A Pokemon With <a href = "tg://user?id='+reply.from.id+'"><b>'+data2.inv.name+'</b></a>.\n\n<a href = "tg://user?id='+reply.from.id+'"><b>'+data2.inv.name+'</b></a> do you accept it?',{reply_to_message_id:ctx.message.reply_to_message.message_id,reply_markup:{inline_keyboard:[[{text:'Accept',callback_data:'trade_'+ctx.from.id+'_'+reply.from.id+''},{text:'Decline',callback_data:'tradc_'+ctx.from.id+'_'+reply.from.id+''}]]}})
})
bot.action(/tradc_/,async ctx => {
const id1 = ctx.callbackQuery.data.split('_')[1]
const id2 = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id1 && ctx.from.id!=id2){
ctx.answerCbQuery()
return
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'This trade has been cancelled by <a href = "tg://user?id='+ctx.from.id+'"><b>'+he.encode(ctx.from.first_name)+'</b></a>.',{parse_mode:'html'})
})
bot.action(/trade_/,async ctx => {
const id1 = ctx.callbackQuery.data.split('_')[1]
const id2 = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id1 && ctx.from.id!=id2){
ctx.answerCbQuery()
return
}
if(ctx.from.id==id1){
ctx.answerCbQuery('You have already accepted')
return
}
if(ctx.from.id==id2){
const userData = await getUserData(id2)
let pokes = await sort(id2,userData.pokes);
if(userData.inv.sort){
pokes = await sort(userData.pokes,userData.inv.sort)
}
  const buttonsPerRow = 5;
  let page = parseInt(ctx.callbackQuery.data.split('_')[3]) || 1
  const itemsPerPage = 20;
const totalPages = Math.ceil(userData.pokes.length / itemsPerPage);
if(page<1 || page > totalPages){
return
}
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pokes.length);
  const inlineKeyboard = [];
  let row = [];

for (let i = startIndex; i < endIndex; i++) {
  const sortedIndex = userData.pokes.indexOf(pokes[i]);
  row.push({
    text: `${sortedIndex + 1}`,
    callback_data: `trdfe_${id2}_${userData.pokes[i].pass}_${id1}`,
  });

  if ((sortedIndex + 1) % buttonsPerRow === 0 || sortedIndex === endIndex - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(page>1 || endIndex<pokes.length){
const row2 = []
row2.push({text:'<',callback_data:'trade_'+id1+'_'+id2+'_'+(page-1)+''})
row2.push({text:'>',callback_data:'trade_'+id1+'_'+id2+'_'+(page+1)+''})
inlineKeyboard.push(row2)
}
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'trade_'+id1+'_'+id2+'_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'trade_'+id1+'_'+id2+'_'+(page+5)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'trade_'+id1+'_'+id2+'_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'trade_'+id1+'_'+id2+'_'+(page+10)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'trade_'+id1+'_'+id2+'_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'trade_'+id1+'_'+id2+'_'+(page+25)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
const data = await getUserData(id1)
const pk = pokes.slice(startIndex,endIndex)
  let messageText = '<a href = "tg://user?id='+id2+'"><b>'+userData.inv.name+'</b></a>\'s Pokemon List (Page: <b>'+page+'</b>)\n';
messageText += await pokelisthtml(pk.map(item => item.pass),id2,startIndex)
  messageText += '\n\n<b><u>❖ Select Which Poke Likes To Trade With</u></b> <a href = "tg://user?id='+id1+'"><b>'+data.inv.name+'</b></a>';

  const keyboard = {
    inline_keyboard: inlineKeyboard,
  };
  await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'html', reply_markup: keyboard });
}
});
bot.action(/trdfe_/,async ctx => {
const id1 = ctx.callbackQuery.data.split('_')[1]
const pass = ctx.callbackQuery.data.split('_')[2]
const id2 = ctx.callbackQuery.data.split('_')[3]
const page3 = ctx.callbackQuery.data.split('_')[4] || false
if(ctx.from.id!=id1 && ctx.from.id!=id2){
ctx.answerCbQuery()
return
}
if(ctx.from.id==id2 && !page3){
ctx.answerCbQuery('Wait, the other person didn\'t choosed his poke')
return
}
if((ctx.from.id==id1 && !page3) || (ctx.from.id==id2 && page3)){
const userData = await getUserData(id2)
let pokes = await sort(id2,userData.pokes);
if(userData.inv.sort){
pokes = await sort(userData.pokes,userData.inv.sort)
}
  const buttonsPerRow = 5;
  let page = parseInt(ctx.callbackQuery.data.split('_')[4]) || 1
  const itemsPerPage = 20;
const totalPages = Math.ceil(userData.pokes.length / itemsPerPage);
if(page<1 || page > totalPages){
return
}
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pokes.length);
  const inlineKeyboard = [];
  let row = [];

for (let i = startIndex; i < endIndex; i++) {
  const sortedIndex = userData.pokes.indexOf(pokes[i]);
  row.push({
    text: `${sortedIndex + 1}`,
    callback_data: `trfe_${id1}_${pass}_${id2}_${userData.pokes[i].pass}`,
  });

  if ((sortedIndex + 1) % buttonsPerRow === 0 || sortedIndex === endIndex - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(page>1 || endIndex<pokes.length){
const row2 = []
row2.push({text:'<',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page-1)+''})
row2.push({text:'>',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page+1)+''})
inlineKeyboard.push(row2)
}
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page+5)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page+10)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'trdfe_'+id1+'_'+pass+'_'+id2+'_'+(page+25)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
const data = await getUserData(id1)
const pk = pokes.slice(startIndex,endIndex)
  let messageText = '<a href = "tg://user?id='+id2+'"><b>'+userData.inv.name+'</b></a>\'s Pokemon List (Page: <b>'+page+'</b>)\n';
messageText += await pokelisthtml(pk.map(item => item.pass),id2,startIndex)
  messageText += '\n\n<b><u>❖ Select Which Poke Likes To Trade With</u></b> <a href = "tg://user?id='+id1+'"><b>'+data.inv.name+'</b></a>';

  const keyboard = {
    inline_keyboard: inlineKeyboard,
  };
  await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'html', reply_markup: keyboard });
}
});
bot.action(/trfe_/,async ctx => {
const id1 = ctx.callbackQuery.data.split('_')[1]
const pass1 = ctx.callbackQuery.data.split('_')[2]
const id2 = ctx.callbackQuery.data.split('_')[3]
const pass2 = ctx.callbackQuery.data.split('_')[4]
if(ctx.from.id!=id1 && ctx.from.id!=id2){
ctx.answerCbQuery()
return
}
if(ctx.from.id==id1){
ctx.answerCbQuery('Wait, other player is choosing poke to trade')
return
}
if(ctx.from.id==id2){
const data1 = await getUserData(id1)
const data2 = await getUserData(id2)
const poke = data1.pokes.filter((p)=>p.pass==pass1)[0]
const poke2 = data2.pokes.filter((p)=>p.pass==pass2)[0]
if(!poke2){
ctx.answerCbQuery('You does not have this poke anymore')
return
}
if(!poke){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<a href="tg://user?id='+id1+'"><b>'+data1.inv.name+'</b></a> does not have that poke anymore',{parse_mode:'html'})
return
}
let msg = '<a href="tg://user?id='+id1+'"><b>'+data1.inv.name+'</b></a> wants to trade:\n'
msg += '<b>'+c(poke.name)+'</b> - '+c(poke.nature)+' | <b>Lv.</b> '+plevel(poke.name,poke.exp)+'\n'
const ivs = poke.ivs
const evs = poke.evs
let ivsText = ''
    ivsText += '\nStats          IV |  EV\n';
    ivsText += '————————————————————————\n';
    ivsText += `HP              ${ivs.hp.toString().padStart(2)} |  ${evs.hp}\n`;
    ivsText += `Attack          ${ivs.attack.toString().padStart(2)} |  ${evs.attack}\n`;
    ivsText += `Defense         ${ivs.defense.toString().padStart(2)} |  ${evs.defense}\n`;
    ivsText += `Sp. Attack      ${ivs.special_attack.toString().padStart(2)} |  ${evs.special_attack}\n`;
    ivsText += `Sp. Defense     ${ivs.special_defense.toString().padStart(2)} |  ${evs.special_defense}\n`;
    ivsText += `Speed           ${ivs.speed.toString().padStart(2)} |  ${evs.speed}\n`;
    ivsText += '————————————————————————\n';
    ivsText += `Total           ${calculateTotal(ivs)} |  ${calculateTotal(evs)}\n\n`;
msg += '<code>'+ivsText+'</code>'

msg += '<a href="tg://user?id='+id2+'"><b>'+data2.inv.name+'</b></a> wants to trade:\n'
msg += '<b>'+c(poke2.name)+'</b> - '+c(poke2.nature)+' | <b>Lv.</b> '+plevel(poke2.name,poke2.exp)+'\n'
const ivs2 = poke2.ivs
const evs2 = poke2.evs
let ivsText2 = ''
    ivsText2 += '\nStats          IV |  EV\n';
    ivsText2 += '————————————————————————\n';
    ivsText2 += `HP              ${ivs2.hp.toString().padStart(2)} |  ${evs2.hp}\n`;
    ivsText2 += `Attack          ${ivs2.attack.toString().padStart(2)} |  ${evs2.attack}\n`;
    ivsText2 += `Defense         ${ivs2.defense.toString().padStart(2)} |  ${evs2.defense}\n`;
    ivsText2 += `Sp. Attack      ${ivs2.special_attack.toString().padStart(2)} |  ${evs2.special_attack}\n`;
    ivsText2 += `Sp. Defense     ${ivs2.special_defense.toString().padStart(2)} |  ${evs2.special_defense}\n`;
    ivsText2 += `Speed           ${ivs2.speed.toString().padStart(2)} |  ${evs2.speed}\n`;
    ivsText2 += '————————————————————————\n';
    ivsText2 += `Total           ${calculateTotal(ivs2)} |  ${calculateTotal(evs2)}\n\n`;
msg += '<code>'+ivsText2+'</code>'
msg += '<b>Both players have to accept the trade</b>'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'html',reply_markup:{inline_keyboard:[[{text:'Agree',callback_data:'agtr_'+id1+'n_'+pass1+'_'+id2+'n_'+pass2+''},{text:'Decline',callback_data:'tradc_'+id1+'_'+id2+''}]]}})
}
})
bot.action(/agtr_/,async ctx => {
const id1 = ctx.callbackQuery.data.split('_')[1]
const pass1 = ctx.callbackQuery.data.split('_')[2]
const id2 = ctx.callbackQuery.data.split('_')[3]
const pass2 = ctx.callbackQuery.data.split('_')[4]
const callback = ctx.callbackQuery.data
if(ctx.from.id+'n'!=id1 && ctx.from.id+'y'!=id1 && ctx.from.id+'y'!=id2 && ctx.from.id+'n'!=id2){
ctx.answerCbQuery()
return
}
if(callback.includes(ctx.from.id+'n')){
await editMessage('markup',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,{inline_keyboard:[[{text:'Agree',callback_data:callback.replace(ctx.from.id+'n',ctx.from.id+'y')},{text:'Decline',callback_data:'tradc_'+id1.replace(/[ny]/g,'')+'_'+id2.replace(/[ny]/g,'')+''}]]})
ctx.answerCbQuery('You Have Accepted The Trade')
}
await sleep(700)
const cl = callback.replace(ctx.from.id+'n',ctx.from.id+'y')
const id3 = cl.split('_')[1]
const id4 = cl.split('_')[3]
if(!id3.includes('n') && !id4.includes('n')){
const data1 = await getUserData(id1.replace(/[ny]/g,''))
const data2 = await getUserData(id2.replace(/[ny]/g,''))
const poke = data1.pokes.filter((p)=>p.pass==pass1)[0]
const poke2 = data2.pokes.filter((p)=>p.pass==pass2)[0]
if(!poke){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<a href="tg://user?id='+id1.replace(/[ny]/g,'')+'"><b>'+data1.inv.name+'</b></a> does not have the choosen poke any more.',{parse_mode:'html'})
return
}
if(!poke2){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<a href="tg://user?id='+id2.replace(/[ny]/g,'')+'"><b>'+data2.inv.name+'</b></a> does not have the choosen poke any more.',{parse_mode:'html'})
return
}
const mdata = await loadMessageData()
if(mdata.battle.includes(parseInt(id1)) || mdata.battle.includes(parseInt(id2))){
if(mdata.battle.includes(ctx.from.id)){
ctx.answerCbQuery('You Are In A Battle')
}else{
ctx.answerCbQuery('Another User Is In A Battle')
}
return
}


const ind1 = data1.pokes.findIndex((pk)=>pk.pass==pass1)
const ind2 = data2.pokes.findIndex((pk)=>pk.pass==pass2)
if(ind1!==-1){
data1.pokes[ind1] = poke2
}
if(ind2 !== -1){
data2.pokes[ind2] = poke
}
await saveUserData(id2.replace(/[ny]/g,''),data2)
await saveUserData(id1.replace(/[ny]/g,''),data1)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'<b>Trade Has Been Completed</b>\n\n• <a href="tg://user?id='+id1.replace(/[ny]/g,'')+'"><b>'+data1.inv.name+'</b></a> Receives <b>'+c(poke2.name)+'</b>\n\n• <a href="tg://user?id='+id2.replace(/[ny]/g,'')+'"><b>'+data2.inv.name+'</b></a> Receives <b>'+c(poke.name)+'</b>',{parse_mode:'html'})
await sendMessage(ctx,5432006093,'#trade\n\n<b>'+he.encode(data1.inv.name)+'</b> (<code>'+id1+'</code>) has traded <b>'+c(poke.name)+'</b> with <b>'+data2.inv.name+'</b> (<code>'+id2+'</code>) <b>'+c(poke2.name)+' </b>',{parse_mode:'HTML'})
}
if(callback.includes(ctx.from.id+'y')){
ctx.answerCbQuery('You Have Already Accepted The Trade.')
return
}
})
const admins = [ADMIN_ID]
requireAdminId(admins,'admins')
bot.command('add_band',async ctx => {
if(admins.includes(ctx.from.id)){
const amount = ctx.message.text.split(' ')[1]
const rarity = ctx.message.text.split(' ')[2]
if(!rarity || !amount){
return
}
gma = amount*1
rar = rarity*1
}
})
bot.command('add',async ctx => {
if(!admins.includes(ctx.from.id)){
return
}
const poke = ctx.message.text.split(' ')[1]
const level = ctx.message.text.split(' ')[2];
const am = isNaN(ctx.message.text.split(' ')[3]) ? 1 : parseFloat(ctx.message.text.split(' ')[3]);
if(am > 150){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Dont Keep Too High Amount')
return
}
const reply = ctx.message.reply_to_message
if(!poke || !level || !reply){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Wrong Format*')

return}
const data = await getUserData(reply.from.id)
if(poke=='stone'){
const st = stones[level]
if(!st){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*n/a*')
return
}
if(!data.inv.stones){
data.inv.stones=[]
}
data.inv.stones.push(level)
await saveUserData(reply.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Successfully Added *'+c(level)+'*')
return
}
let msg = ''
for(let i = 0; i < am; i++){
  const pokeName = poke.toLowerCase()
  const poked = pokes[pokeName]
  if (poked) {

const moves = pokemoves[pokeName]
if(moves){
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at < level*1 && dmoves[move.id].power && dmoves[move.id].accuracy)
const am = Math.min(Math.max(moves2.length,1),4)
const omoves = moves2.slice(-am)
const ms = []
for(const m of omoves){
ms.push(m.id)
}
  const iv2 = {
"hp":stat(pokeName),
"attack":stat(pokeName),
"defense":stat(pokeName),
"special_attack":stat(pokeName),
"special_defense":stat(pokeName),
"speed":stat(pokeName)
}
const iv = await generateRandomIVs(spawn[pokeName].toLowerCase())
  const ev = {
"hp":0,
"attack":0,
"defense":0,
"special_attack":0,
"special_defense":0,
"speed":0
};
const pass2 = word(8)
const nat = getRandomNature()
const g = growth_rates[pokeName]
if(ctx.message.text.includes('shiny')){
var sy = '✨'
}else{
var sy = ''
}
const exp = chart[g.growth_rate][level]
  const da = {
    name:pokeName,
    id: poked.pokedex_number,
    nature:nat,
    exp:exp,
    pass:pass2,
    ivs: iv,
    symbol: sy,
    evs: ev,
    moves: ms, // Push the randomly selected move ID
  };
if(!data.pokes){
data.pokes = []
}
data.pokes.push(da)
await saveUserData(reply.from.id,data)
}
}
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Successfully Added *'+am+' '+c(poke)+'*')
});
commands.set('candy', async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const nam3 = ctx.message.text.replace('/','').replace(/ /g,'-')
const nam2 = nam3.includes('@'+bot.botInfo.username) ? nam3.replace('@'+bot.botInfo.username,'') : nam3
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to give *Candy* to your *Pokemons.*', {reply_to_message_id:ctx.message.message_id, reply_markup:{inline_keyboard:[[{text:'Candy', url:'t.me/'+bot.botInfo.username+'?start='+nam2+''}]]}})
return
}
const mdata = await loadMessageData();
if(mdata.battle.includes(ctx.from.id)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You are in a *battle*',{reply_to_message_id:ctx.message.message_id})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell which pokemon candy you want to give.*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];
if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_candy_'+ctx.message.message_id+''},
{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(!data.inv.candy){
data.inv.candy = 0
}
if(data.inv.candy < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You are out of *Candies 🍬*')
return
}
if(currentLevel > 99){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*'+c(name2)+'* has already reached *100* level',{reply_to_message_id:ctx.message.message_id})
return
}
data.inv.candy -= 1
p2.exp = exp[currentLevel+1]
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You gave 1 candy 🍬 to *'+c(p2.name)+'*\n*Level:* '+currentLevel+' --> '+(currentLevel+1)+'',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'+1 Candy 🍬',callback_data:'candy_'+p2.pass+'_'+ctx.from.id+''}]]}})
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==p2.name)[0]
if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= (currentLevel+1) && evo.evolution_level > currentLevel){
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a> Your Pokemon <b>'+c(p2.name)+'</b> Is Ready To Evolve',{reply_markup:{inline_keyboard:[[{text:'Evolve',url:'t.me/'+bot.botInfo.username+''}]]}})
}
await sendMessage(ctx,ctx.from.id,'*'+c(p2.name)+'* Is Ready To Evolve',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Evolve',callback_data:'evy_'+p2.name+'_'+p2.pass+''}]]}})
}
if(((currentLevel+1)-currentLevel)!= 0){
const moves = pokemoves[p2.name]
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at > currentLevel && move.level_learned_at <= (currentLevel+1) && dmoves[move.id].power && dmoves[move.id].accuracy && dmoves[move.id].category != 'status')
if(moves2.length > 0){
for(const m of moves2){
if(p2.moves.length < 4){
p2.moves.push(m.id)
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.from.id,'<b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Has Learnt A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].',{parse_mode:'HTML'})
}else{
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const d = new Date().toLocaleString('en-US', options)
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a>, <b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Wants To Learn A New Move',{reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+''}]]}})
}
const mdata = await loadMessageData();
const m77 = await sendMessage(ctx,ctx.from.id,'<b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Wants To Learn A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].\n\nBut <b>'+c(p2.name)+'</b> Already Knows 4 Moves He Have To Forget One Move To Learn <b>'+c(dmoves[m.id].name)+'</b>\n<i>You Have 15 Min To Choose.</i>',{reply_markup:{inline_keyboard:[[{text:'Go Next',callback_data:'lrn_'+p2.pass+'_'+m.id+'_'+d+''}]]},parse_mode:'HTML'})
if(!mdata.moves){
mdata.moves = {}
}
mdata.moves[m77.message_id] = {chat:ctx.from.id,td:d,poke:p2.name,move:dmoves[m.id].name}
await saveMessageData(mdata)
}
}
}
}
await saveUserData(ctx.from.id,data)
}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'candy_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_candy_'+ctx.message.message_id+'_'+(page-1)+''})
}
console.log(endIdx)
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_candy_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Give Candy To Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.command('evolve',check2,async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell which pokemon you wanna evolve.*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];

if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_evolve_'+ctx.message.message_id+''},
{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==p2.name)[0]
if(!evo){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*'+c(p2.name)+'* does not evolve further',{reply_to_message_id:ctx.message.message_id})
return
}
if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= currentLevel){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Are You Sure To Evolve Your *'+c(p2.name)+'* (*Lv.* '+currentLevel+')',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[{text:'Evolve',callback_data:'evy_'+p2.name+'_'+p2.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''},
{text:'Cancel',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Your *'+c(p2.name)+'* Does Not Match With Requirements To *Evolve*',{reply_to_message_id:ctx.message.message_id})
}

}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'evolve_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_evolve_'+ctx.message.message_id+'_'+(page-1)+''})
}
console.log(endIdx)
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_evolve_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Wanna Evolve To Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/evolve_/,check2q,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
let name2 = p2.name
const pokemonNames = Object.keys(forms);
  for (const name3 of pokemonNames) {
const forms2 = forms[name3];
    const matchingForm = forms2.filter(form => form.identifier === name2);
    if (matchingForm.length > 0) {
var name = name3;
    }
  }
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==name)[0]
if(!evo){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(p2.name)+'* does not evolve further',{parse_mode:'markdown'})
return
}
if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= currentLevel){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Are You Sure To Evolve Your *'+c(p2.name)+'* (*Lv.* '+currentLevel+')',{reply_markup:{inline_keyboard:[[{text:'Evolve',callback_data:'evy_'+p2.name+'_'+p2.pass+'_'+ctx.from.id+''},{text:'Cancel',callback_data:'delete_'+ctx.from.id+''}]]},parse_mode:'markdown'})
}else{
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Your *'+c(p2.name)+'* Does Not Match With Requirements To *Evolve*',{parse_mode:'markdown'})
}
})
bot.action(/candy_/,check2q,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(!data.inv.candy){
data.inv.candy = 0
}
if(data.inv.candy < 1){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You are out of *Candies 🍬*',{parse_mode:'markdown'})
return
}
if(currentLevel*1 > 99){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*'+c(p2.name)+'* has already reached *100* level',{parse_mode:'markdown'})
return
}
data.inv.candy -= 1
p2.exp = exp[currentLevel+1]
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'You gave 1 candy 🍬 to *'+c(p2.name)+'*\n*Level:* '+currentLevel+' --> '+(currentLevel+1)+'',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'+1 Candy 🍬',callback_data:'candy_'+p2.pass+'_'+ctx.from.id+''}]]}})
const evo = chains.evolution_chains.filter((chain)=>chain.current_pokemon==p2.name)[0]
if(evo && evo.evolution_level && evo.evolution_method == 'level-up' && evo.evolution_level <= (currentLevel+1) && evo.evolution_level > currentLevel){
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a> Your Pokemon <b>'+c(p2.name)+'</b> Is Ready To Evolve',{reply_markup:{inline_keyboard:[[{text:'Evolve',url:'t.me/'+bot.botInfo.username+''}]]}})
}
await sendMessage(ctx,ctx.from.id,'*'+c(p2.name)+'* Is Ready To Evolve',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Evolve',callback_data:'evy_'+p2.name+'_'+p2.pass+''}]]}})
}
if(((currentLevel+1)-currentLevel)!= 0){
const moves = pokemoves[p2.name]
const moves2 = moves.moves_info.filter((move)=> move.learn_method == 'level-up' && move.level_learned_at > currentLevel && move.level_learned_at <= (currentLevel+1) && dmoves[move.id].power && dmoves[move.id].accuracy && dmoves[move.id].category != 'status')
if(moves2.length > 0){
for(const m of moves2){
if(p2.moves.length < 4){
p2.moves.push(m.id)
await saveUserData(ctx.from.id,data)
await sendMessage(ctx,ctx.from.id,'<b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Has Learnt A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].',{parse_mode:'HTML'})
}else{
const options = {
  timeZone: 'Asia/Kolkata',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
};

const d = new Date().toLocaleString('en-US', options)
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},'<a href="tg://user?id='+ctx.from.id+'"><b>'+data.inv.name+'</b></a>, <b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Wants To Learn A New Move',{reply_markup:{inline_keyboard:[[{text:'Go',url:'t.me/'+bot.botInfo.username+''}]]}})
}
const mdata = await loadMessageData();
const m77 = await sendMessage(ctx,ctx.from.id,'<b>'+c(p2.name)+'</b> (<b>Lv.</b> '+(currentLevel+1)+') Wants To Learn A New Move <b>'+c(dmoves[m.id].name)+'</b> ['+c(dmoves[m.id].type)+' '+emojis[dmoves[m.id].type]+'].\n\nBut <b>'+c(p2.name)+'</b> Already Knows 4 Moves He Have To Forget One Move To Learn <b>'+c(dmoves[m.id].name)+'</b>\n<i>You Have 15 Min To Choose.</i>',{reply_markup:{inline_keyboard:[[{text:'Go Next',callback_data:'lrn_'+p2.pass+'_'+m.id+'_'+d+''}]]},parse_mode:'HTML'})
if(!mdata.moves){
mdata.moves = {}
}
mdata.moves[m77.message_id] = {chat:ctx.from.id,td:d,poke:p2.name,move:dmoves[m.id].name}
await saveMessageData(mdata)
}
}
}
}
await saveUserData(ctx.from.id,data)
})

commands.set('vitamin',async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const nam3 = ctx.message.text.replace('/','').replace(/ /g,'-')
const nam2 = nam3.includes('@'+bot.botInfo.username) ? nam3.replace('@'+bot.botInfo.username,'') : nam3
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to give *Candy* to your *Pokemons.*', {reply_to_message_id:ctx.message.message_id, reply_markup:{inline_keyboard:[[{text:'Candy', url:'t.me/'+bot.botInfo.username+'?start='+nam2+''}]]}})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell which pokemon vitamin you want to give.*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];

if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_vitamin_'+ctx.message.message_id+''},
{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(!data.inv.vitamin){
data.inv.vitamin = 0
}
if(data.inv.vitamin < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You are out of *💉 Vitamins*')
return
}
let msg6 = '*Pokemon:* '+c(p2.name)+' (*Lv.* '+plevel(p2.name,p2.exp)+')\n\n'
msg6 += '*HP :* '+p2.evs.hp+'\n'
msg6 += '*Attack :* '+p2.evs.attack+'\n'
msg6 += '*Defense :* '+p2.evs.defense+'\n'
msg6 += '*Special Attack :* '+p2.evs.special_attack+'\n'
msg6 += '*Special Defense :* '+p2.evs.special_defense+'\n'
msg6 += '*Speed :* '+p2.evs.speed+'\n'
msg6 += '\nWhich EV Stat You Wanna Increase With *10*?'
const key = [
[{text:'HP',callback_data:'vitye-hp-'+p2.pass+'-'+ctx.from.id+''},
{text:'Attack',callback_data:'vitye-attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'Defense',callback_data:'vitye-defense-'+p2.pass+'-'+ctx.from.id+''}],
[{text:'SpA',callback_data:'vitye-special_attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'SpD',callback_data:'vitye-special_defense-'+p2.pass+'-'+ctx.from.id+''},
{text:'Speed',callback_data:'vitye-speed-'+p2.pass+'-'+ctx.from.id+''}]
]
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg6,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:key}})
}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'vitamin_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_vitamin_'+ctx.message.message_id+'_'+(page-1)+''})
}
console.log(endIdx)
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_vitamin_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Give Vitamin To Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/vitamin_/,check2q,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
let msg6 = '*Pokemon:* '+c(p2.name)+' (*Lv.* '+plevel(p2.name,p2.exp)+')\n\n'
msg6 += '*HP :* '+p2.evs.hp+'\n'
msg6 += '*Attack :* '+p2.evs.attack+'\n'
msg6 += '*Defense :* '+p2.evs.defense+'\n'
msg6 += '*Special Attack :* '+p2.evs.special_attack+'\n'
msg6 += '*Special Defense :* '+p2.evs.special_defense+'\n'
msg6 += '*Speed :* '+p2.evs.speed+'\n'
msg6 += '\nWhich EV Stat You Wanna Increase With *10*?'
const key = [
[{text:'HP',callback_data:'vitye-hp-'+p2.pass+'-'+ctx.from.id+''},
{text:'Attack',callback_data:'vitye-attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'Defense',callback_data:'vitye-defense-'+p2.pass+'-'+ctx.from.id+''}],
[{text:'SpA',callback_data:'vitye-special_attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'SpD',callback_data:'vitye-special_defense-'+p2.pass+'-'+ctx.from.id+''},
{text:'Speed',callback_data:'vitye-speed-'+p2.pass+'-'+ctx.from.id+''}]
]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg6,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
bot.action(/vitye-/,check2q,async ctx => {
const stat = ctx.callbackQuery.data.split('-')[1]
const pass = ctx.callbackQuery.data.split('-')[2]
const id = ctx.callbackQuery.data.split('-')[3]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
if(!data.inv.vitamin){
data.inv.vitamin = 0
}
if(data.inv.vitamin < 1){
ctx.answerCbQuery('You are out of *💉 Vitamins*')
return
}
data.inv.vitamin -= 1
if(p2.evs[stat] > 251){
ctx.answerCbQuery('This Stat Has Already Reached Max Limit')
return
}
const c7 = await calculateTotal(p2.evs)
if(c7 > 509){
ctx.answerCbQuery('This Poke Total Evs Maximum Limit Reached')
return
}
const a = Math.min(10,(252-p2.evs[stat]))
const a2 = Math.min(a,(510-calculateTotal(p2.evs)))
p2.evs[stat] += a2
await saveUserData(ctx.from.id,data)
let msg6 = '*Pokemon:* '+c(p2.name)+' (*Lv.* '+plevel(p2.name,p2.exp)+')\n\n'
msg6 += '*HP :* '+p2.evs.hp+'\n'
msg6 += '*Attack :* '+p2.evs.attack+'\n'
msg6 += '*Defense :* '+p2.evs.defense+'\n'
msg6 += '*Special Attack :* '+p2.evs.special_attack+'\n'
msg6 += '*Special Defense :* '+p2.evs.special_defense+'\n'
msg6 += '*Speed :* '+p2.evs.speed+'\n'
msg6 += '\nWhich EV Stat You Wanna Increase With *10*?'
const key = [
[{text:'HP',callback_data:'vitye-hp-'+p2.pass+'-'+ctx.from.id+''},
{text:'Attack',callback_data:'vitye-attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'Defense',callback_data:'vitye-defense-'+p2.pass+'-'+ctx.from.id+''}],
[{text:'SpA',callback_data:'vitye-special_attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'SpD',callback_data:'vitye-special_defense-'+p2.pass+'-'+ctx.from.id+''},
{text:'Speed',callback_data:'vitye-speed-'+p2.pass+'-'+ctx.from.id+''}]
]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg6,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
commands.set('berry',async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const nam3 = ctx.message.text.replace('/','').replace(/ /g,'-')
const nam2 = nam3.includes('@'+bot.botInfo.username) ? nam3.replace('@'+bot.botInfo.username,'') : nam3
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to give *Candy* to your *Pokemons.*', {reply_to_message_id:ctx.message.message_id, reply_markup:{inline_keyboard:[[{text:'Candy', url:'t.me/'+bot.botInfo.username+'?start='+nam2+''}]]}})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell which pokemon berry you want to give.*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];

if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_berry_'+ctx.message.message_id+''},
{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
if(!data.inv.berry){
data.inv.berry = 0
}
if(data.inv.berry < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You are out of *🍒 Berries*')
return
}
let msg6 = '*Pokemon:* '+c(p2.name)+' (*Lv.* '+plevel(p2.name,p2.exp)+')\n\n'
msg6 += '*HP :* '+p2.evs.hp+'\n'
msg6 += '*Attack :* '+p2.evs.attack+'\n'
msg6 += '*Defense :* '+p2.evs.defense+'\n'
msg6 += '*Special Attack :* '+p2.evs.special_attack+'\n'
msg6 += '*Special Defense :* '+p2.evs.special_defense+'\n'
msg6 += '*Speed :* '+p2.evs.speed+'\n'
msg6 += '\nWhich EV Stat You Wanna Decrease With *10*?'
const key = [
[{text:'HP',callback_data:'brth-hp-'+p2.pass+'-'+ctx.from.id+''},
{text:'Attack',callback_data:'brth-attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'Defense',callback_data:'brth-defense-'+p2.pass+'-'+ctx.from.id+''}],
[{text:'SpA',callback_data:'brth-special_attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'SpD',callback_data:'brth-special_defense-'+p2.pass+'-'+ctx.from.id+''},
{text:'Speed',callback_data:'brth-speed-'+p2.pass+'-'+ctx.from.id+''}]
]
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg6,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:key}})
}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'berry_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_berry_'+ctx.message.message_id+'_'+(page-1)+''})
}
console.log(endIdx)
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_berry_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Give Berry To Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/berry_/, async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
let msg6 = '*Pokemon:* '+c(p2.name)+' (*Lv.* '+plevel(p2.name,p2.exp)+')\n\n'
msg6 += '*HP :* '+p2.evs.hp+'\n'
msg6 += '*Attack :* '+p2.evs.attack+'\n'
msg6 += '*Defense :* '+p2.evs.defense+'\n'
msg6 += '*Special Attack :* '+p2.evs.special_attack+'\n'
msg6 += '*Special Defense :* '+p2.evs.special_defense+'\n'
msg6 += '*Speed :* '+p2.evs.speed+'\n'
msg6 += '\nWhich EV Stat You Wanna Decrease With *10*?'
const key = [
[{text:'HP',callback_data:'brth-hp-'+p2.pass+'-'+ctx.from.id+''},
{text:'Attack',callback_data:'brth-attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'Defense',callback_data:'brth-defense-'+p2.pass+'-'+ctx.from.id+''}],
[{text:'SpA',callback_data:'brth-special_attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'SpD',callback_data:'brth-special_defense-'+p2.pass+'-'+ctx.from.id+''},
{text:'Speed',callback_data:'brth-speed-'+p2.pass+'-'+ctx.from.id+''}]
]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg6,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
bot.action(/brth-/,async ctx => {
const stat = ctx.callbackQuery.data.split('-')[1]
const pass = ctx.callbackQuery.data.split('-')[2]
const id = ctx.callbackQuery.data.split('-')[3]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
if(!data.inv.berry){
data.inv.berry = 0
}
if(data.inv.berry < 1){
ctx.answerCbQuery('You are out of *🍒 Berries*')
return
}
data.inv.berry -= 1
if(p2.evs[stat] < 1){
ctx.answerCbQuery('This Stat Is Already 0')
return
}
p2.evs[stat] = Math.max(0,(p2.evs[stat]-10))
await saveUserData(ctx.from.id,data)
let msg6 = '*Pokemon:* '+c(p2.name)+' (*Lv.* '+plevel(p2.name,p2.exp)+')\n\n'
msg6 += '*HP :* '+p2.evs.hp+'\n'
msg6 += '*Attack :* '+p2.evs.attack+'\n'
msg6 += '*Defense :* '+p2.evs.defense+'\n'
msg6 += '*Special Attack :* '+p2.evs.special_attack+'\n'
msg6 += '*Special Defense :* '+p2.evs.special_defense+'\n'
msg6 += '*Speed :* '+p2.evs.speed+'\n'
msg6 += '\nWhich EV Stat You Wanna Decrease With *10*?'
const key = [
[{text:'HP',callback_data:'brth-hp-'+p2.pass+'-'+ctx.from.id+''},
{text:'Attack',callback_data:'brth-attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'Defense',callback_data:'brth-defense-'+p2.pass+'-'+ctx.from.id+''}],
[{text:'SpA',callback_data:'brth-special_attack-'+p2.pass+'-'+ctx.from.id+''},
{text:'SpD',callback_data:'brth-special_defense-'+p2.pass+'-'+ctx.from.id+''},
{text:'Speed',callback_data:'brth-speed-'+p2.pass+'-'+ctx.from.id+''}]
]
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg6,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
const dataFolderPath = './db/'; // Replace with the path to your data folder
bot.command('broad', async (ctx) => {
if(!admins.includes(ctx.from.id)){
return
}
  const message = ctx.message.reply_to_message
  if (!message) {
    return await sendMessage(ctx,ctx.chat.id,'Please reply to a message to use this command.');
  }

  // Start the message forwarding process
  forwardMessageToAllUsers(ctx, message.message_id,message.chat.id);
});

async function forwardMessageToAllUsers(ctx, msgid,id) {
  const userIds = await getUserIdsFromDataFolder();

  let successCount = 0;
  let failureCount = 0;

  for (const userId of userIds) {
    try {
//const msg = await sendMessage(ctx,userId, message,{parse_mode:'markdown'});
//await ctx.telegram.pinChatMessage(userId,msg.message_id);
bot.telegram.forwardMessage(userId,id,msgid)
      successCount++;
    } catch (error) {
      console.error(`Failed to forward message to user ${userId}: ${error.message}`);
      failureCount++;
    }

    // To avoid rate limiting, wait for 1 second before forwarding to the next user
    await sleep(400);
  }

  // Send a summary message
  const summaryMessage = `Total Users ${userIds.length}\nMessage forwarded to ${successCount} users.\n Failed to forward to ${failureCount} users.`;
  await sendMessage(ctx,ctx.chat.id,summaryMessage);
}

async function getUserIdsFromDataFolder() {
  const userIds = [];
  const files = (await getAllUserData()).map(u => u.user_id + '.json');

  for (const file of files) {
    const userId = parseInt(path.parse(file).name, 10);
    if (!isNaN(userId)) {
      userIds.push(userId);
    }
  }

  return userIds;
}
bot.command('top', async (ctx) => {
if(!admins.includes(ctx.from.id)){
return
}
  if (ctx.message.chat.type != 'private') {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Use in private to get top users list*',{reply_to_message_id:ctx.message.message_id})
    return;
  }
  const allUserData = await getAllUserData();

  if (allUserData.length > 0) {
    const attribute = 'pc'
    const topUsers = await getTopUsers(allUserData, attribute, 5); // Change '10' to the desired number of top users

    let text = `Top <b>5 Users</b>\n\n`;
    topUsers.forEach((userData, index) => {
      text += `<b>#${index + 1}:</b>\n`;
      text += `<b>User:</b> ${userData.data.inv.name}\n`;
      text += `<b>${attribute.charAt(0).toUpperCase() + attribute.slice(1)}:</b> ${userData.data.inv[attribute]}\n\n`;
    });

    await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},text)
  } else {
    await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No user data found.');
  }
});
commands.set('display',async (ctx) => {
if (ctx.message.chat.type != 'private') {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to change pokemon *Display Detail.*',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Change',url:'t.me/'+bot.botInfo.username+'?start=display'}]]}})
    return;
  }
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/PokePlayBot?start=start',}]]}})
return
}
const items = ['none','level','nature','type','type-symbol','category','iv-points','ev-points','hp-points','attack-points','defense-points',
'special-attack-points','special-defense-points','speed-points','total-points']
const inlineKeyboard = [];
  let row = [];
let msg = '*Which Pokemom Detail You Wanna Display?*\n'
for (let i = 0; i < items.length; i++) {
msg += '\n*'+(i+1)+'.* '+c(items[i])+''
  row.push({
    text: `${i + 1}`,
    callback_data: `display_${items[i]}`,
  });

  if ((i + 1) % 4 === 0 || i === items.length - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(!data.extra){
data.extra = {}
}
const dis = data.extra.display ? data.extra.display : 'None'
msg += '\n\n*Currently Displaying :* '+c(dis)+''
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg,{reply_markup:{inline_keyboard:inlineKeyboard}})
})
bot.action(/display_/,async ctx => {
const item = ctx.callbackQuery.data.split('_')[1]
const data = await getUserData(ctx.from.id)
if(!data.extra){
data.extra = {}
}
if(!data.extra.display){
data.extra.display='none'
}
if(data.extra.display==item){
ctx.answerCbQuery()
return
}
data.extra.display = item
await saveUserData(ctx.from.id,data)
const items = ['none','level','nature','type','type-symbol','category','iv-points','ev-points','hp-points','attack-points','defense-points',
'special-attack-points','special-defense-points','speed-points','total-points']
const inlineKeyboard = [];
  let row = [];
let msg = '*Which Pokemom Detail You Wanna Display?*\n'
for (let i = 0; i < items.length; i++) {
msg += '\n*'+(i+1)+'.* '+c(items[i])+''
  row.push({
    text: `${i + 1}`,
    callback_data: `display_${items[i]}`,
  });

  if ((i+ 1) % 4 === 0 || i === items.length - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
const dis = data.extra.display ? data.extra.display : 'None'
msg += '\n\n*Currently Displaying :* '+c(dis)+''
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{reply_markup:{inline_keyboard:inlineKeyboard},parse_mode:'markdown'})
})
commands.set('sort',async ctx => {
if (ctx.message.chat.type != 'private') {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to change pokemon *Sort Method.*',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Change',url:'t.me/'+bot.botInfo.username+'?start=sort'}]]}})
    return;
  }
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/PokePlayBot?start=start',}]]}})
return
}
const items = ['order-caught','name','pokedex-number','level','category','iv-points','ev-points','hp-points','attack-points','defense-points',
'special-attack-points','special-defense-points','speed-points','total-points']
const inlineKeyboard = [];
  let row = [];
let msg = '*How Would You Like To Sort Your Pokemons?*\n'
for (let i = 0; i < items.length; i++) {
msg += '\n*'+(i+1)+'.* '+c(items[i])+''
  row.push({
    text: `${i + 1}`,
    callback_data: `sort_${items[i]}`,
  });

  if ((i + 1) % 4 === 0 || i === items.length - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(!data.extra){
data.extra = {}
}
const dis = data.extra.sort ? data.extra.sort : 'None'
msg += '\n\n*Currently Sorting :* '+c(dis)+''
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg,{reply_markup:{inline_keyboard:inlineKeyboard}})
})
bot.action(/sort_/,async ctx => {
const item = ctx.callbackQuery.data.split('_')[1]
const data = await getUserData(ctx.from.id)
if(!data.extra){
data.extra = {}
}
if(!data.extra.sort){
data.extra.sort = 'none'
}
if(data.extra.sort==item){
ctx.answerCbQuery()
return
}
data.extra.sort = item
await saveUserData(ctx.from.id,data)
const items = ['order-caught','name','pokedex-number','level','category','iv-points','ev-points','hp-points','attack-points','defense-points',
'special-attack-points','special-defense-points','speed-points','total-points']
const inlineKeyboard = [];
  let row = [];
let msg = '*How Would You Like To Sort Your Pokemons?*\n'
for (let i = 0; i < items.length; i++) {
msg += '\n*'+(i+1)+'.* '+c(items[i])+''
  row.push({
    text: `${i + 1}`,
    callback_data: `sort_${items[i]}`,
  });

  if ((i+ 1) % 4 === 0 || i === items.length - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
const dis = data.extra.sort ? data.extra.sort : 'None'
msg += '\n\n*Currently Sorting :* '+c(dis)+''
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{reply_markup:{inline_keyboard:inlineKeyboard},parse_mode:'markdown'})
})
commands.set('nickname',async ctx => {
if (ctx.message.chat.type != 'private') {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to nickname a pokemon\n\nTo view all *Nickname* use /mynicknames',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Nickname',url:'t.me/'+bot.botInfo.username+'?start=nickname'}]]}})
    return;
  }
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell which pokemon nickname you want to set or use /mynicknames to see your nicknames.*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];

if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_nickname_'+ctx.message.message_id+''},
{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
let uu = ''
if(p2.nickname){
uu = "Use '.' to remove current nickname."
}
const message = await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Tell a new name for *'+c(p2.nickname || p2.name)+'*\n\n'+uu+'',{reply_markup:{force_reply:true}})
const userData = {
      messageId: message,
      pass: p2.pass // You can set the name to whatever you like
    };
    userState2.set(ctx.from.id,userData)
}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'nickname_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_nickname_'+ctx.message.message_id+'_'+(page-1)+''})
}
console.log(endIdx)
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_nickname_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Nickname To Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/nickname_/,check2q,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
let uu = ''
if(p2.nickname){
uu = "Use '.' to remove current nickname."
}
ctx.deleteMessage();
const message = await sendMessage(ctx,ctx.chat.id,'Tell a new name for *'+c(p2.nickname || p2.name)+'*\n\n'+uu+'',{reply_markup:{force_reply:true},parse_mode:'markdown'})
const userData = {
      messageId: message,
      pass: p2.pass // You can set the name to whatever you like
    };
    userState2.set(ctx.from.id,userData)
})
bot.command('referral',check,async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.extra.refer){
data.extra.refer = []
}
const msg = `**Hey Pokemon Fans, Introducing Pokemon Bot In Which Kanto, Jhoto, Hoenn, Hisui, Unova, Kalos , Alola, Galar And Paldea Region There.**
**• You Can Catch Legendary Pokes Too And Battle With Your Friends.**
**• All Pokemon Data Are Related To Gen 7 & 8 & 9. You Can Enjoy This Bot Given Below.**
**• Click On My Link To Get Bonus Of 1000 Pokecoins.**

__• Start your Pokemon journey now and hunt for Pokemon and battle with your friends.__
**https://t.me/${bot.botInfo.username}?start=ref_${ctx.from.id}**

**Updates Channel :-** @PokePlayGame
**Main Chat :-** @PokePlayChat

**Thank You ~ ( ╹▽╹ )**`;

const encodedUrl = encodeURIComponent(msg);

if(ctx.chat.type=='private'){
var key = [[{text:'Share Url',url:'tg://msg_url?text=' + encodedUrl},{text:'Get Url',callback_data:'refurl_'+ctx.from.id}]];

}else{
var key = [[{text:'Get Url',callback_data:'refurl_'+ctx.from.id+''}]]
}

const rf = data.refers || 0
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},`Share your below *Referral Link* with your friends and receive a reward of *500 PC 💷* for every player invited who reaches *Level 20.*

*Also:*
• Every *3 Refer*, you will get *5 Random Balls*
• Every *8 Refer*, you will get *1 TM* and *1k PC 💷* and *1 Safari Pass*
• Every *13 Refer*, you will get *3 TM* and *3k PC 💷* and *1 Safari Pass*
• Every *22 Refer*, you will get *1 Transfomational Item* and *1 Legendary Poke* and *1 Master Ball*

*Successfully Invited :* ${rf}`,{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:key}})

})
bot.action(/refurl_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[1]
if(id!=ctx.from.id){
return
}
if(ctx.chat.type!='private'){
ctx.answerCbQuery('Sent Your Refer Link Into Private Chat ✅')
}
const msg = `*Hey Pokemon Fans, Introducing Pokemon Bot In Which Kanto, Jhoto, Hoenn, Hisui, Unova, Kalos , Alola, Galar And Paldea Region There.*
*• You Can Catch Legendary Pokes Too And Battle With Your Friends.*
*• All Pokemon Data Are Related To Gen 7 & 8 & 9. You Can Enjoy This Bot Given Below.*
*• Click On My Link To Get Bonus Of 1000 Pokecoins.*

_• Start your Pokemon journey now and hunt for Pokemon and battle with your friends._
*https://t.me/${bot.botInfo.username}?start=ref_${ctx.from.id}*

*Updates Channel :-* @PokePlayGame
*Main Chat :-* @PokePlayChat

*Thank You ~ ( ╹▽╹ )*`;
await sendMessage(ctx,ctx.from.id,msg,{parse_mode:'markdown'})
})
bot.command('mynicknames',check,async ctx => {
const data = await getUserData(ctx.from.id)
const pokes = data.pokes.filter((pk)=>pk.nickname)
let msg = '*✦ Pokemon List That You Have Nicknamed\n*'
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,pokes)
const pokemon = pokemon2.slice(startIdx,endIdx)
let b = startIdx
for(const a of pokemon){
msg += '\n*'+(b+1)+'. '+c(a.nickname)+'* '+a.symbol+' ('+c(a.name)+')'
b++;}
const key = []
const row = []
row.push({text:'<',callback_data:'nykne_'+(page-1)+'_'+ctx.from.id+''})
row.push({text:'>',callback_data:'nykne_'+(page+1)+'_'+ctx.from.id+''})
key.push(row)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},msg,{reply_markup:{inline_keyboard:key},reply_to_message_id:ctx.message.message_id})
})
bot.action(/nykne_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const pokes = data.pokes.filter((pk)=>pk.nickname)
const page = ctx.callbackQuery.data.split('_')[1]*1
const pageSize = 25
const totalPages = Math.ceil(pokes.length / pageSize);
if(page < 1 || page > totalPages){
return
}
let msg = '*✦ Pokemon List That You Have Nicknamed\n*'
const startIdx = (page - 1) * pageSize;
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,pokes)
const pokemon = pokemon2.slice(startIdx,endIdx)
let b = startIdx
for(const a of pokemon){
msg += '\n*'+(b+1)+'. '+c(a.nickname)+'* '+a.symbol+' ('+c(a.name)+')'
b++;
}
const key = []
const row = []
row.push({text:'<',callback_data:'nykne_'+(page-1)+'_'+ctx.from.id+''})
row.push({text:'>',callback_data:'nykne_'+(page+1)+'_'+ctx.from.id+''})
key.push(row)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'markdown',reply_markup:{inline_keyboard:key}})
})
bot.command('pokedex',check,async ctx => {
const data = await getUserData(ctx.from.id)
const name = ctx.message.text.split(' ').slice(1).join(' ').replace(/ /g,'-').toLowerCase();
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Write a *Pokemon* name also *Next* to the *Command.*',{reply_to_message_id:ctx.message.message_id})
return
}
const pks = Object.keys(forms)
let poke = false
if(forms[name]){
poke=name
}else{
for(const y of pks){
const pok = forms[y].filter((p)=>p.identifier==name)
if(pok.length>0){
poke = y
}
}
}
if(!poke){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name*',{reply_to_message_id:ctx.message.message_id})
return
}
const poke2 = forms[poke].filter((p)=>data.pokeseen.includes(p.identifier))
if(poke2.length<1 && !data.pokeseen.includes(poke)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'There is no *Entry* of this *Pokemon* in your *Pokedex*.',{reply_to_message_id:ctx.message.message_id})
return
}
if(!pokes[forms[poke][0].identifier] || !pokes[forms[poke][0].identifier].front_default_image){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Something went wrong.*')
return
}
const key = [[{text:'Base Stats',callback_data:'bst_'+poke+'_'+ctx.from.id+'_1'},
{text:'Region Found',callback_data:'ryf_'+poke+'_'+ctx.from.id+'_1'}]]
const form = 1
if(forms[poke].length>1){
key.push([{text:'<',callback_data:'pkydex_'+poke+'_'+ctx.from.id+'_'+(form-1)+''},{text:''+form+'/'+forms[poke].length+'',callback_data:'ntg'},
{text:'>',callback_data:'pkydex_'+poke+'_'+ctx.from.id+'_'+(form+1)+''}])
}
let msg = ''
var py = forms[poke][0]
if(data.pokecaught.includes(py.identifier)){
var re = '✧ '
}else{
var re = ''
}
if(py.form_identifier && py.form_identifier.length > 0){
msg += '★ <b>'+c(poke)+'</b> ('+c(py.form_identifier)+' Form) '+re+''
}else{
msg += '★ <b>'+c(py.identifier)+'</b> '+re+''
}
const cat = (spawn[py.identifier]=='legendry') ? 'legendary' : spawn[py.identifier]
msg += '\n• <b>Pokedex Id:</b> '+pokes[py.identifier].pokedex_number.toString().padStart(3,'0')+''
msg += '\n• <b>Types:</b> '+c(pokes[py.identifier].types.join(' / '))+''
const ay = expdata.filter((p)=>p.name==py.identifier)[0]
const data99 = pokes[py.identifier]
let highestEv = { stat: "", value: 0 };

    const evYield = data99.ev_yield;
    evYield.forEach(([stat, value]) => {
      if (value > highestEv.value) {
        highestEv = { stat, value };
      }
    });
msg += '\n• <b>EV Yield:</b> '+highestEv.value+' '+c(highestEv.stat)+''
msg += '\n• <b>Rarity:</b> '+c(cat)+''
if(ay && ay.baseExp){
msg += '\n• <b>Base EXP:</b> '+ay.baseExp+''
}
msg += '\n• <b>Growth Rate:</b> '+c(growth_rates[py.identifier].growth_rate)+''
let m2 = []
const evo2 = chains.evolution_chains.filter((chain)=>chain.current_pokemon==poke)
if(evo2.length > 0){
for(const evo of evo2){
const fr = forms[evo.evolved_pokemon].filter((p)=> !p.identifier.includes('gmax')
&& !p.identifier.includes('mega') && !p.identifier.includes('crowned')
&& !p.identifier.includes('primal'))
if(py.identifier.includes('galar')){
const n2 = fr.filter((p)=> p.identifier.includes('galar'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(py.identifier.includes('hisui')){
const n2 = fr.filter((p)=> p.identifier.includes('hisui'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(py.identifier.includes('paldea')){
const n2 = fr.filter((p)=> p.identifier.includes('paldea'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(py.identifier.includes('alola')){
const n2 = fr.filter((p)=> p.identifier.includes('alola'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else{
const fr2 = forms[evo.current_pokemon].filter((p)=> !p.identifier.includes('gmax')
&& !p.identifier.includes('mega') && !p.identifier.includes('crowned')
&& !p.identifier.includes('primal'))
const ye = fr2.filter((p)=> p.identifier.includes('galar') ||
p.identifier.includes('hisui') || p.identifier.includes('alola') || p.identifier.includes('paldea'))
if(ye.length > 0){
var rn = fr.filter((p)=> !p.identifier.includes('hisui') &&
!p.identifier.includes('galar') && !p.identifier.includes('alola') && !p.identifier.includes('paldea'))
}else{
var rn = fr
}
}
for(const a of rn){
m2.push('<b>'+c(a.identifier)+'</b> ('+c(evo.evolution_method)+')')
}
}
msg += '\n• <b>Evolves Into:</b> '+m2.join(' / ')+''
}
await sendMessage(ctx,ctx.chat.id,pokes[forms[poke][0].identifier].front_default_image,{caption:msg,reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:key},parse_mode:'html'})
})
bot.action(/pkydex_/,async ctx => {
console.log('a')
const poke = ctx.callbackQuery.data.split('_')[1]
const form = ctx.callbackQuery.data.split('_')[3]*1
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
var py = forms[poke][form-1]
if(form > forms[poke].length || form<1){
return
}
console.log(py.identifier)
if(!pokes[py.identifier] || !pokes[py.identifier].front_default_image){
ctx.answerCbQuery('*Something went wrong.*')
return
}
const key = [[{text:'Base Stats',callback_data:'bst_'+poke+'_'+ctx.from.id+'_'+form+''},
{text:'Region Found',callback_data:'ryf_'+poke+'_'+ctx.from.id+'_'+form+''}]]
if(forms[poke].length>1){
key.push([{text:'<',callback_data:'pkydex_'+poke+'_'+ctx.from.id+'_'+(form-1)+''},{text:''+form+'/'+forms[poke].length+'',callback_data:'ntg'},
{text:'>',callback_data:'pkydex_'+poke+'_'+ctx.from.id+'_'+(form+1)+''}])
}
let msg = ''
if(data.pokecaught.includes(py.identifier)){
var re = '✧ '
}else{
var re = ''
}
if(py.form_identifier && py.form_identifier.length > 0){
msg += '★ <b>'+c(poke)+'</b> ('+c(py.form_identifier)+' Form) '+re+''
}else{
msg += '★ <b>'+c(py.identifier)+'</b> '+re+''
}
const cat = (spawn[py.identifier]=='legendry') ? 'legendary' : spawn[py.identifier]
msg += '\n• <b>Pokedex Id:</b> '+pokes[py.identifier].pokedex_number.toString().padStart(3,'0')+''
msg += '\n• <b>Types:</b> '+c(pokes[py.identifier].types.join(' / '))+''
const ay = expdata.filter((p)=>p.name==py.identifier)[0]
const data99 = pokes[py.identifier]
let highestEv = { stat: "", value: 0 };

    const evYield = data99.ev_yield;
    evYield.forEach(([stat, value]) => {
      if (value > highestEv.value) {
        highestEv = { stat, value };
      }
    });
msg += '\n• <b>EV Yield:</b> '+highestEv.value+' '+c(highestEv.stat)+''
msg += '\n• <b>Rarity:</b> '+c(cat)+''
if(ay && ay.baseExp){
msg += '\n• <b>Base EXP:</b> '+ay.baseExp+''
}msg += '\n• <b>Growth Rate:</b> '+c(growth_rates[py.identifier].growth_rate)+''
let m2 = []
const evo2 = chains.evolution_chains.filter((chain)=>chain.current_pokemon==poke)
if(evo2.length > 0){
for(const evo of evo2){
const fr = forms[evo.evolved_pokemon].filter((p)=> !p.identifier.includes('gmax')
&& !p.identifier.includes('mega') && !p.identifier.includes('crowned')
&& !p.identifier.includes('primal'))
if(py.identifier.includes('galar')){
const n2 = fr.filter((p)=> p.identifier.includes('galar'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(py.identifier.includes('hisui')){
const n2 = fr.filter((p)=> p.identifier.includes('hisui'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(py.identifier.includes('paldea')){
const n2 = fr.filter((p)=> p.identifier.includes('paldea'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else if(py.identifier.includes('alola')){
const n2 = fr.filter((p)=> p.identifier.includes('alola'))
if(n2.length > 0){
var rn = n2
}else{
var rn = fr
}
}else{
const fr2 = forms[evo.current_pokemon].filter((p)=> !p.identifier.includes('gmax')
&& !p.identifier.includes('mega') && !p.identifier.includes('crowned')
&& !p.identifier.includes('primal'))
const ye = fr2.filter((p)=> p.identifier.includes('galar') ||
p.identifier.includes('hisui') || p.identifier.includes('alola') || p.identifier.includes('paldea'))
if(ye.length > 0){
var rn = fr.filter((p)=> !p.identifier.includes('hisui') &&
!p.identifier.includes('galar') && !p.identifier.includes('alola') && !p.identifier.includes('paldea'))
}else{
var rn = fr
}
}
for(const a of rn){
m2.push('<b>'+c(a.identifier)+'</b> ('+c(evo.evolution_method)+')')
}
}
msg += '\n• <b>Evolves Into:</b> '+m2.join(' <b>/</b> ')+''
}
await editMessage('media',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,{
type:'photo',
media:pokes[py.identifier].front_default_image,
caption:msg,
parse_mode:'html'
},{
reply_markup:{
inline_keyboard:key},parse_mode:'html'})
})
bot.action(/bst_/,async ctx => {
const poke = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const form = ctx.callbackQuery.data.split('_')[3]*1
if(ctx.from.id!=id){
return
}
const py = forms[poke][form-1]
if(!pokes[py.identifier] || !pokes[py.identifier].front_default_image){
ctx.answerCbQuery('*Something went wrong.*')
return
}
let msg = '<b>Base Stats</b> of <b>'+c(py.identifier)+'</b>'
for(const a in pokestats[py.identifier]){
msg += '\n• <b>'+c(a)+'</b> '+pokestats[py.identifier][a]+''
}
const key = [[{text:'About',callback_data:'pkydex_'+poke+'_'+ctx.from.id+'_'+form+''},
{text:'Region Found',callback_data:'ryf_'+poke+'_'+ctx.from.id+'_'+form+''}]]
if(forms[poke].length>1){
key.push([{text:'<',callback_data:'bst_'+poke+'_'+ctx.from.id+'_'+(form-1)+''},{text:''+form+'/'+forms[poke].length+'',callback_data:'ntg'},
{text:'>',callback_data:'bst_'+poke+'_'+ctx.from.id+'_'+(form+1)+''}])
}
await editMessage('media',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,{type:'photo',media:pokes[py.identifier].front_default_image,caption:msg,parse_mode:'html'},{reply_markup:{inline_keyboard:key}})
})
bot.action(/ryf_/,async ctx => {
const poke = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const form = ctx.callbackQuery.data.split('_')[3]*1
if(ctx.from.id!=id){
return
}
const py = forms[poke][form-1]
if(!pokes[py.identifier] || !pokes[py.identifier].front_default_image){
ctx.answerCbQuery('*Something went wrong.*')
return
}
let msg = '<b>'+c(py.identifier)+'</b> Found In :-'
var dt = []
for(const a in rdata){
if(rdata[a].includes(poke)){
dt.push(a)
}
}
let m2 = await formatDetails(dt)
const ui = Object.keys(safari).filter((o)=>safari[o].includes(poke))
if(ui.length>0){
let yr = []
for(const t of ui){
yr.push(c(t))
}
m2 += '\n<b>• Safari -</b> ['+yr+']'
}
const ye = ['mega','gmax','origin','primal','crowned','eternamax']
if(ye.includes(py.form_identifier)){
msg = '\n\nThis <b>Pokemon</b> has transformed from <b>'+c(poke)+'</b>'
}else{
msg += '\n\n'+m2+''
}
const key = [[{text:'About',callback_data:'pkydex_'+poke+'_'+ctx.from.id+'_'+form+''},
{text:'Base Stats',callback_data:'bst_'+poke+'_'+ctx.from.id+'_'+form+''}]]
if(forms[poke].length>1){
key.push([{text:'<',callback_data:'ryf_'+poke+'_'+ctx.from.id+'_'+(form-1)+''},{text:''+form+'/'+forms[poke].length+'',callback_data:'ntg'},
{text:'>',callback_data:'ryf_'+poke+'_'+ctx.from.id+'_'+(form+1)+''}])
}
await editMessage('media',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,{type:'photo',media:pokes[py.identifier].front_default_image,caption:msg,parse_mode:'html'},{reply_markup:{inline_keyboard:key}})
})
async function checkseen(ctx,name){
console.log(name)
const data56 = await getUserData(ctx.from.id)
if(!data56.pokeseen){
data56.pokeseen = []
}
if(!data56.pokeseen.includes(name)){
console.log('not includes '+name)
data56.pokeseen.push(name)
await saveUserData(ctx.from.id,data56)
}
return
}
function formatDetails(details) {
const regions2 = {
  'Kanto': ['kanto', 'letsgo-kanto'],
  'johto':['johto'],
  'hoenn':['hoenn'],
'hisui': ['hisui'],
  'sinnoh':['sinnoh'],
  'unova':['unova'],
  'kalos':['kalos-central','kalos-mountain','kalos-coastal'],
  'alola':['alola','poni','melemele','akala','ulaula'],
  'Galar': ['galar','isle-of-armor', 'crown-tundra'],
  'paldea':['paldea','kitakami','blueberry'],
  'conquest-gallery':['conquest-gallery']
};
  const formattedDetails = [];
  for (const region in regions2) {
    const places = regions2[region];
    const regionDetails = places.map(place => {
      const detail = details.find(d => d.toLowerCase() === place);
      return detail ? detail.replace(/[-_]/g, ' ') : '';
    }).filter(Boolean);
    if (regionDetails.length > 0) {
      formattedDetails.push(`• <b>${c(region)}</b> - [${c(regionDetails.join(' , '))}]`);
    }
  }
  return formattedDetails.join('\n');
}
bot.action(/tyrt_/,async ctx => {
const m = ctx.callbackQuery.data.split('_')[1]*1
const d = ctx.callbackQuery.data.split('_')[2]
const queryTime = new Date(d)
const options = {
timeZone: 'Asia/Kolkata',
month: 'numeric',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *Move Tutor* has gone, you *Missed* opportunity to teach your pokemon *'+c(dmoves[m].name)+'*',{parse_mode:'markdown'})
return
}
const move = dmoves[m]
const poks = Object.keys(pokemoves)
    .filter(pokemonName =>
      (pokemoves[pokemonName].moves_info || []).some(move => move.id === m && move.learn_method === 'tutor')
    );
console.log(poks,m)

const data = await getUserData(ctx.from.id)
const pks2 = await sort(ctx.from.id,data.pokes)
const pks = pks2.filter((poke)=>poks.includes(poke.name))
const buttonsPerRow = 5;
  let page = parseInt(ctx.callbackQuery.data.split('_')[3]) || 1
  const itemsPerPage = 20;
const totalPages = Math.ceil(pks.length / itemsPerPage);
if(page<1 || page > totalPages){
ctx.answerCbQuery('You Not Have Enough Pokes To Learn This Move')
return
}
if(pks.length < 1){
ctx.answerCbQuery('You have no poke to learn this move')
return
}
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, pks.length);
const pks22 = pks.slice(startIndex,endIndex)
  const inlineKeyboard = [];
  let row = [];

for (let i = startIndex; i < endIndex; i++) {
  const sortedIndex = pks.indexOf(pks[i]);
  row.push({
    text: `${sortedIndex + 1}`,
    callback_data: `trlr_${m}_${d}_${pks[i].pass}`,
  });

  if ((sortedIndex + 1) % buttonsPerRow === 0 || sortedIndex === endIndex - 1) {
    inlineKeyboard.push(row);
    row = [];
  }
}
if(page>1 || endIndex<pks.length){
const row2 = []
row2.push({text:'<',callback_data:'tyrt_'+m+'_'+d+'_'+(page-1)+''})
row2.push({text:'>',callback_data:'tyrt_'+m+'_'+d+'_'+(page+1)+''})
inlineKeyboard.push(row2)
}
if(totalPages > 10){
const row = []
row.push({text:'(-5) <<',callback_data:'tyrt_'+m+'_'+d+'_'+(page-5)+'_'+ctx.from.id+''})
row.push({text:'>> (+5)',callback_data:'tyrt_'+m+'_'+d+'_'+(page+5)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 40){
const row = []
row.push({text:'(-10) <<<',callback_data:'tyrt_'+m+'_'+d+'_'+(page-10)+'_'+ctx.from.id+''})
row.push({text:'>>> (+10)',callback_data:'tyrt_'+m+'_'+d+'_'+(page+10)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
if(totalPages > 100){
const row = []
row.push({text:'(-25) <<<<',callback_data:'tyrt_'+m+'_'+d+'_'+(page-25)+'_'+ctx.from.id+''})
row.push({text:'>>>> (+25)',callback_data:'tyrt_'+m+'_'+d+'_'+(page+25)+'_'+ctx.from.id+''})
inlineKeyboard.push(row)
}
  let messageText = `List Of Your Pokes (*Page ${page}*):\n\n`;
messageText += await pokelist(pks22.map(item => item.pass),ctx,startIndex)
  messageText += '\n_Select Poke To Learn_ *' + c(move.name) + '*';

  const keyboard = {
    inline_keyboard: inlineKeyboard,
  };
  await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,messageText, { parse_mode: 'markdown', reply_markup: keyboard });
})
bot.action(/trlr_/,async ctx => {
const m = ctx.callbackQuery.data.split('_')[1]
const d = ctx.callbackQuery.data.split('_')[2]
const pass = ctx.callbackQuery.data.split('_')[3]
const queryTime = new Date(d)
const options = {
timeZone: 'Asia/Kolkata',
month: 'numeric',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *Move Tutor* has gone, you *Missed* opportunity to teach your pokemon *'+c(dmoves[m].name)+'*',{parse_mode:'markdown'})
return
}
const data = await getUserData(ctx.from.id)
const pk = data.pokes.filter((poke)=>poke.pass == pass)[0]
if(!pk){
ctx.answerCbQuery('You Not Have This Poke')
return
}
if(pk.moves.length < 4){
let msg = 'Are You Sure To Your <b>'+c(pk.name)+'</b> (<b>Lv.</b> '+plevel(pk.name,pk.exp)+')'
const move2 = dmoves[String(m)]
msg += '\n\n<b>Learn New Move By The Move Tutor:</b>'
msg += '\n• <b>'+c(move2.name)+'</b> ['+c(move2.type)+' '+emojis[move2.type]+']\n<b>Power:</b> '+move2.power+'<b>, Accuracy:</b> '+move2.accuracy+' ('+c(move2.category.charAt(0))+')'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:[[{text:'Confirm',callback_data:'trtns_'+m+'_'+d+'_'+pass+''},{text:'No',callback_data:'tyrt_'+m+'_'+d+''}]]}})
}else{
let msg = '<b>Pokemon :</b> '+c(pk.name)+' (Lv. '+plevel(pk.name,pk.exp)+')\n\n'
const moves = []
for(const move2 of pk.moves){
let move = dmoves[move2]
msg += '• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+', <b>Accuracy:</b> '+move.accuracy+'% <i>('+c(move.category.charAt(0))+')</i>\n'
moves.push(move2)
}
msg += '\n<i>Your Pokemon Already Knows 4 Moves, Which Move Should Be Forgotten To Know New One?</i>'

const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'tryfrg_'+word+'_'+m+'_'+d+'_'+pass+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
  rows.push([{text:'Cancel', callback_data:'tyrt_'+m+'_'+d+''}])
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/tryfrg_/,async ctx => {
const frmove = ctx.callbackQuery.data.split('_')[1]
const m = ctx.callbackQuery.data.split('_')[2]
const d = ctx.callbackQuery.data.split('_')[3]
const queryTime = new Date(d)
const options = {
timeZone: 'Asia/Kolkata',
month: 'numeric',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *Move Tutor* has gone, you *Missed* opportunity to teach your pokemon *'+c(dmoves[m].name)+'*',{parse_mode:'markdown'})
return
}
const pass = ctx.callbackQuery.data.split('_')[4]
const data = await getUserData(ctx.from.id)
const pk = data.pokes.filter((poke)=>poke.pass == pass)[0]
if(!pk){
ctx.answerCbQuery('You Not Have This Poke')
return
}
const poke = pk
let msg = 'Are You Sure To Your <b>'+c(poke.name)+'</b> (<b>Lv.</b> '+plevel(poke.name,poke.exp)+')\n\n'
msg += '<b>Forget The Move:</b>'
const move = dmoves[String(frmove)]
const move2 = dmoves[String(m)]
msg += '\n• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+'<b>, Accuracy:</b> '+move.accuracy+' ('+c(move.category.charAt(0))+')'
msg += '\n\n<b>And Learn The Move:</b>'
msg += '\n• <b>'+c(move2.name)+'</b> ['+c(move2.type)+' '+emojis[move2.type]+']\n<b>Power:</b> '+move2.power+'<b>, Accuracy:</b> '+move2.accuracy+' ('+c(move2.category.charAt(0))+')'
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:[[{text:'Confirm',callback_data:'trtns_'+m+'_'+d+'_'+pass+'_'+frmove+''},{text:'No',callback_data:'trlr_'+m+'_'+d+'_'+pass+''}]]}})
})
bot.action(/trtns_/,async ctx => {
const m = ctx.callbackQuery.data.split('_')[1]
const d = ctx.callbackQuery.data.split('_')[2]
const pass = ctx.callbackQuery.data.split('_')[3]
const queryTime = new Date(d)
const options = {
timeZone: 'Asia/Kolkata',
month: 'numeric',
day: 'numeric',
hour: 'numeric',
minute: 'numeric',
  hour12: true,
};
const currentTime = new Date().toLocaleString('en-US', options)
const timeDifference = new Date(currentTime) - queryTime;
if(timeDifference > 900000){
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Unfortunately, Timeout For *15 Min* Has Over & *Move Tutor* has gone, you *Missed* opportunity to teach your pokemon *'+c(dmoves[m].name)+'*',{parse_mode:'markdown'})
return
}
const frmove = ctx.callbackQuery.data.split('_')[4]
const data = await getUserData(ctx.from.id)
const pk = data.pokes.filter((poke)=>poke.pass == pass)[0]
if(!pk){
ctx.answerCbQuery('You Not Have This Poke')
return
}
if(pk.moves.length < 4){
pk.moves.push(m)
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'The *Move Tutor* has tought *'+c(pk.name)+'* a new move *'+c(dmoves[String(m)].name)+'* '+emojis[dmoves[String(m)].type]+'',{parse_mode:'markdown'})
const mdata = await loadMessageData();
delete mdata.tutor[String(ctx.callbackQuery.message.message_id)]
await saveMessageData(mdata)
}else{
const move = ctx.callbackQuery.data.split('_')[4]
if(!move){
let msg = '<b>Pokemon :</b> '+c(pk.name)+' (Lv. '+plevel(pk.name,pk.exp)+')\n\n'
const moves = []
for(const move2 of pk.moves){
let move = dmoves[move2]
msg += '• <b>'+c(move.name)+'</b> ['+c(move.type)+' '+emojis[move.type]+']\n<b>Power:</b> '+move.power+', <b>Accuracy:</b> '+move.accuracy+'% <i>('+c(move.category.charAt(0))+')</i>\n'
moves.push(move2)
}
msg += '\n<i>Your Pokemon Already Knows 4 Moves, Which Move Should Be Forgotten To Know New One?</i>'

const buttons = moves.map((word) => ({ text: c(dmoves[word].name), callback_data: 'tryfrg_'+word+'_'+m+'_'+d+'_'+pass+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
  rows.push([{text:'Cancel', callback_data:'tyrt_'+m+'_'+d+''}])
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,msg,{parse_mode:'HTML',reply_markup:{inline_keyboard:rows}})
}
if(!pk.moves.includes(parseInt(move))){
ctx.answerCbQuery('Your Poke Does Not Know This Move')
return
}
const index = pk.moves.indexOf(parseInt(move));

if (index !== -1) {
  pk.moves[index] = parseInt(m);
await saveUserData(ctx.from.id,data)
const mdata = await loadMessageData();
delete mdata.tutor[String(ctx.callbackQuery.message.message_id)]
await saveMessageData(mdata)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'The *Move Tutor* has tought *'+c(pk.name)+'* a new move *'+c(dmoves[m].name)+'* '+emojis[dmoves[String(m)].type]+'',{parse_mode:'markdown'})
}
}
})
commands.set('ev_train',async ctx => {
if(ctx.chat.type!='private'){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Use this command in *Private* to use *EV Train*.',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:[[{text:'Train',url:'t.me/'+bot.botInfo.username+'?start=ev_train'}]]}})
return
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},`Welcome to *EV Train Zone*, You can hunt *75 Pokemon* of a specific *EV Yield* here.

*Info About Safari Zone :-*
• You Can Hunt 75 Times.
• You Can't Catch Any Pokemon
• You Will Automatically Ran Out After You Turns Over
• Using /exit Won't Refund Anything

*Entry Fees:* 50 💷`,{reply_markup:{inline_keyboard:[[{text:'EV Train',callback_data:'evtrain'}]]}})
})
bot.action('evtrain',async ctx => {
const bt = ['hp','attack','defense','special-attack','special-defense','speed']
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'rvyr_'+word+'' }));
  const rows = [];
  for (let i = 0; i < buttons.length; i += 3) {
    rows.push(buttons.slice(i, i + 3));
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Select which stat *EV Training* you want.',{parse_mode:'markdown',reply_markup:{inline_keyboard:rows}})
})
bot.action(/rvyr_/,async ctx => {
const stat = ctx.callbackQuery.data.split('_')[1]
const data = await getUserData(ctx.from.id)
if(data.balls.safari && data.balls.safari > 0){
ctx.answerCbQuery('You are in safari zone')
return
}
if(data.extra.evhunt && data.extra.evhunt > 0){
ctx.answerCbQuery('You are already doing a ev hunt')
return
}
if(data.inv.pc < 50){
ctx.answerCbQuery('Not enough pokecoins')
return
}
data.inv.pc -= 50
data.extra.evhunt = 75
data.extra.evh = stat
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Your *'+c(stat)+' EV* training has *Started.*',{parse_mode:'markdown'})
})
bot.command('release',async ctx => {
const data = await getUserData(ctx.from.id)
if(!data.inv){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Start your journey now*',{reply_to_message_id:ctx.message.message_id,
reply_markup:{inline_keyboard:[[
{text:'Start My Journey',url:'t.me/'+bot.botInfo.username+'?start=start',}]]}})
return
}
const name = ctx.message.text.split(' ').slice(1).join(' ')
if(!name){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Please tell which pokemon you wanna release*',{reply_to_message_id:ctx.message.message_id})
return
}
const name2 = name.replace(/ /g,'-')
const p5 = data.pokes.filter((pk) =>
    pk.nickname ?
    name.toLowerCase() === pk.nickname.toLowerCase() :
    name2.toLowerCase() === pk.name
)[0];

if(!p5){
const matches = stringSimilarity.findBestMatch(name2, data.pokes.map(poke => poke.nickname || poke.name));
        const bestMatch = matches.bestMatch.target;
        const similarity = matches.bestMatch.rating;
if(similarity > 0.4 && name2.length > 3){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Did you mean : *'+c(bestMatch)+'*?',{reply_to_message_id:ctx.message.message_id,reply_markup:{
inline_keyboard:[[{text:'Yes',callback_data:'suger_'+ctx.from.id+'_'+bestMatch+'_release_'+ctx.message.message_id+''},
{text:'No',callback_data:'delete_'+ctx.from.id+''}]]}})
}else{
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'No *Matching* found with this *Name.*',{reply_to_message_id:ctx.message.message_id})
}
return
}
const p = pokes[p5.name.toLowerCase()]
const p22 = data.pokes.filter((poke)=> poke.nickname ? poke.nickname.toLowerCase() == name.toLowerCase() : poke.name==name2.toLowerCase())
if(!p22 || p22.length < 1){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'You Does Not Have *'+name+'*',{reply_to_message_id:ctx.message.message_id})
return
}
if(p22.length == 1){
const p2 = p22[0]
const g = growth_rates[p2.name]
const exp = chart[g.growth_rate]
const matchingLevels = Object.keys(exp).filter(level => p2.exp >= exp[level]);
    const currentLevel = matchingLevels.length > 0 ? parseInt(matchingLevels[matchingLevels.length - 1]) : undefined;
const message = await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Are you sure you wanna *Release* your *'+c(p2.name)+'* (*Lv.* '+plevel(p2.name,p2.exp)+')\n*Nature:* '+c(p2.nature)+' , *Total IVs:* '+calculateTotal(p2.ivs)+' , *Total EVs:* '+calculateTotal(p2.evs)+'',{reply_markup:{inline_keyboard:[[{text:'Yes',callback_data:'relst_'+p2.pass+'_'+ctx.from.id+''},{text:'No',callback_data:'dlt_'+ctx.from.id+''}]]},reply_to_message_id:ctx.message.message_id})
}else if(p22.length > 1){
const ore = []
let message = ''
const page = 1
const pageSize = 25
const startIdx = (page - 1) * pageSize;
let b = startIdx+1
const endIdx = startIdx + pageSize;
const pokemon2 = await sort(ctx.from.id,p22)
const pokemon = pokemon2.slice(startIdx,endIdx)
message += await pokelist(pokemon.map(item => item.pass),ctx,startIdx)
for(const p of pokemon){
ore.push({text:b,callback_data:'release_'+p.pass+'_'+ctx.from.id+'_'+ctx.message.message_id+''})
b++;
}
  const rows = [];
  for (let i = 0; i < ore.length; i += 5) {
    rows.push(ore.slice(i, i + 5));
  }
const rows2 = []
if(page > 1){
rows2.push({text:'<',callback_data:'suger_'+ctx.from.id+'_'+name2+'_release_'+ctx.message.message_id+'_'+(page-1)+''})
}
console.log(endIdx)
if((endIdx+1)<p22.length){
rows2.push({text:'>',callback_data:'suger_'+ctx.from.id+'_'+name2+'_release_'+ctx.message.message_id+'_'+(page+1)+''})
}
rows.push(rows2)
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},message+'\n\n_Release To Which Pokemon?_',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
}
})
bot.action(/release_/,check2q,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
const data = await getUserData(ctx.from.id)
const poke = data.pokes.filter((p)=>p.pass===pass)[0]
if(id!=ctx.from.id){
ctx.answerCbQuery()
return
}
if(!poke){
ctx.answerCbQuery('Poke not found')
return
}
const p2 = poke
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Are you sure you wanna *Release* your *'+c(p2.name)+'* (*Lv.* '+plevel(p2.name,p2.exp)+')\n*Nature:* '+c(p2.nature)+' , *Total IVs:* '+calculateTotal(p2.ivs)+' , *Total EVs:* '+calculateTotal(p2.evs)+'',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Yes',callback_data:'relst_'+p2.pass+'_'+ctx.from.id+''},{text:'No',callback_data:'dlt_'+ctx.from.id+''}]]}})
})
bot.action(/relst_/,async ctx => {
const pass = ctx.callbackQuery.data.split('_')[1]
const id = ctx.callbackQuery.data.split('_')[2]
if(ctx.from.id!=id){
return
}
const data = await getUserData(ctx.from.id)
const pk = data.pokes.filter(pk=>pk.pass==pass)[0]
if(!pk){
ctx.answerCbQuery('You dont have this poke')
return
}
data.pokes = data.pokes.filter(pk=>pk.pass!=pass)
await saveUserData(ctx.from.id,data)
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Successfully Released *'+c(pk.name)+'*',{parse_mode:'markdown'})
})
bot.action(/dlt_/,async ctx => {
const id = ctx.callbackQuery.data.split('_')[1]
if(ctx.from.id==id){
ctx.deleteMessage();
}
})
bot.command('pokeballs',async ctx => {
const balls = {};
const bt = Object.keys(balls)
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'pkbl:'+word+':'+ctx.from.id+'' }))
  const rows = [];
  for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'Here is the list of following *PokeBalls* available in *PokePlay.*',{reply_to_message_id:ctx.message.message_id,reply_markup:{inline_keyboard:rows}})
})
bot.action(/pkbl:/,async ctx => {
const balls = {};
const ball = ctx.callbackQuery.data.split(':')[1]
const id = ctx.callbackQuery.data.split(':')[2]
if(ctx.from.id==id){
if(ball=='back'){
const bt = Object.keys(balls)
const buttons = bt.map((word) => ({ text: c(word), callback_data: 'pkbl:'+word+':'+ctx.from.id+'' }))
  const rows = [];
for (let i = 0; i < buttons.length; i += 4) {
    rows.push(buttons.slice(i, i + 4));
}
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'Here is the list of following *PokeBalls* available in *PokePlay.*',{parse_mode:'markdown',reply_markup:{inline_keyboard:rows}})
}else{
await editMessage('text',ctx,ctx.chat.id,ctx.callbackQuery.message.message_id,'*★ PokeBall Name:* '+c(balls[ball].name)+'.\n\n• * Description:* '+balls[ball].description+'',{parse_mode:'markdown',reply_markup:{inline_keyboard:[[{text:'Back',callback_data:'pkbl:back:'+ctx.from.id+''}]]},link_preview_options:{url: balls[ball].image,show_above_text:true}})
}
}
})
const admins35 = [ADMIN_ID]
requireAdminId(admins35,'admins35')
bot.command('bfb', async (ctx) => {
    const adminId = ctx.from.id;
    if (admins35.includes(adminId)) { // Replace YOUR_ADMIN_ID with the actual adm>
const reply = ctx.message.reply_to_message
if(reply){
var userId = reply.from.id
}else{
var userId = ctx.message.text.split(' ')[1];
if(isNaN(userId)){
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'*Give User ID Not Username Etc.*')
return
}
}
        if (userId && !banList2.includes(userId) && !banList2.includes(String(userId),)) {
            banList2.push(String(userId));
            saveBanList();
            await sendMessage(ctx,ctx.chat.id,`User ${userId} has banned`);
await sendMessage(ctx,5432006093,'*#BANUNBANLOG* \n`'+ctx.from.first_name+'` *Banned* `'+userId+'`',{parse_mode:'markdown'})
        } else {
            await sendMessage(ctx,ctx.chat.id,'Invalid user ID or user already banned.');
        }
    }
});

// Unban command: /unban <id>
bot.command('ufb', async (ctx) => {
    const adminId = ctx.from.id;
    if (admins.includes(adminId)) { // Replace YOUR_ADMIN_ID with the actual adm>
const reply = ctx.message.reply_to_message
if(reply){
var userId = String(reply.from.id)
}else{
var userId = ctx.message.text.split(' ')[1];
}
        if (userId && (banList2.includes(String(userId)))) {
            banList2 = banList2.filter((id) => id !== userId);
            saveBanList();
            await sendMessage(ctx,ctx.chat.id,`User ${userId} has unbanned.`);
await sendMessage(ctx,5432006093,'*#BANUNBANLOG* \n`'+ctx.from.first_name+'` *UnBanned* `'+userId+'`',{parse_mode:'markdown'})
} else {
await sendMessage(ctx,ctx.chat.id,'Invalid user ID or user not banned.');
        }
}
});
function saveBanList() {

}
bot.command('settings',check,async ctx => {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'HTML'},`<b><u>Available Battle Settings Info -</u></b>

<b>• Max Pokemon:</b> Max number of pokemon each trainer can have.
<b>• Min / Max Legendaries:</b> Min / Max number of legendary pokemon each trainer can have.
<b>• Min / Max Level:</b> Each trainer pokemon level must be between this min & max level. Default: 1-100
<b>• Switch Pokemon:</b> Allow / Disallow to switch pokemon between battle.
<b>• Form Changes:</b> Allow / Disallow to use <code>Key Items</code> between battle.
<b>• Sandbox Mode:</b> If enabled, pokemon will NOT gain <code>EXP / EVs</code>.
<b>• Random Mode:</b> Both trainers team will be randomly generated depending on the conditions.
<b>• Preview Mode:</b> Enable / Disable to show pokemon image below / above  of the battle text.
<b>• Types Lock:</b> Only selected types pokemon can be used in battle or banned types can't be used in battle.
<b>• Regions Lock:</b> Only selected regions pokemon can be used in battle or banned region can't be used in battle.
<b>• Type Efficiency:</b> If disabled, all types will do x1 effect on all types.
<b>• Dual Types:</b> If disabled, multi types pokemon can't be used only single type pokemon can be used.

• <b><u>What Are These? :-</u></b>
<i>These are available <b>'Battle Settings ⚔'</b> option when you challenge someone</i>
`,{reply_to_message_id:ctx.message.message_id})
})
bot.command('set',async ctx => {
if(appr.includes(ctx.from.id)){
const bslls = {};
const name = ctx.message.text.split(' ')[1]
const link = ctx.message.text.split(' ')[2]
if(!name || !link){
await sendMessage(ctx,ctx.chat.id,'Wrong Format')
return
}
if(!bslls[name]){
await sendMessage(ctx,ctx.chat.id,'Wrong Name')
return
}
bslls[name].image = link

await sendMessage(ctx,ctx.chat.id,'done')
}
})
bot.command('hi',async ctx => {
await sendMessage(ctx,ctx.chat.id,{parse_mode:'markdown'},'hello',{reply_to_message_id:ctx.message.message_id})
})
async function editMessage(per,ctx, chatId, id, msg, parameters2) {
    let options = {};
try{
    if (typeof parameters2 === 'object') {
        options = { ...options, ...parameters2 };
    }
lastClicked2[ctx.from.id] = Date.now();
globalClicks = [...globalClicks, Date.now()];

if (chatId && ctx.chat && ctx.chat.type != 'private') {
  lastClicked[ctx.chat.id] = [...(lastClicked[ctx.chat.id] || []), Date.now()];
}
if(per=='markup'){
var m = await ctx.telegram.editMessageReplyMarkup(chatId,id,null,msg)
}else if(per=='media'){
var m = await bot.telegram.editMessageMedia(chatId,id,null,msg,options)
}else if(per=='text'){
var m = await bot.telegram.editMessageText(chatId,id,null,msg,options)
}else if(per=='caption'){
var m = await bot.telegram.editMessageCaption(chatId,id,null,msg,options)
}
return m.message_id
}catch(error){
console.error('Error sending message:', error)
return null
}
}
async function sendMessage(ctx, chatId, parameters1, msg, parameters2) {
    let options = {};
try{
    // Check if parameters1 is an object (contains options)
    if (typeof parameters1 === 'object') {
        options = { ...parameters1 };
    } else {
        // If parameters1 is not an object, it's the message content
        if(msg){
          parameters2 = msg
        }
        msg = parameters1;
    }

    // Merge parameters2 into options
    if (typeof parameters2 === 'object') {
        options = { ...options, ...parameters2 };
    }

lastClicked2[ctx.from.id] = Date.now();
globalmsg = [...globalmsg, Date.now()];

if (chatId && ctx.chat && ctx.chat.type != 'private') {
  lastmsg[ctx.chat.id] = [...(lastmsg[ctx.chat.id] || []), Date.now()];
}
if(options.source){
console.log('card')
var m = await bot.telegram.sendPhoto(chatId,parameters1,msg)
}else if(options.caption){
var m = await bot.telegram.sendPhoto(chatId,msg,options)
}else{
var m = await bot.telegram.sendMessage(chatId, msg, options)
}
return m.message_id
}catch(error){
console.error('Error sending message:', error)
return null
}
}
bot.command('natures',async ctx => {
await sendMessage(ctx,ctx.chat.id,'https://graph.org/file/6ef6229eae43a84f188c1.jpg',{caption:'All available *Pokemon Natures* chart',parse_mode:'markdown',reply_to_message_id:ctx.message.message_id})
})


export default bot;
