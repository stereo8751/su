//Wed Mar 26 2025 00:55:52 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("小福家"),
  version = "V1.1.5",
  appName = "xfjapp";
const xfj_ck_file = "xfj_cookies.json";
let xfjapp = $.getjson(appName, []);
const fs = $.isNode() ? require("fs") : "",
  WebSocket = $.isNode() ? require("ws") : "",
  file = "david_cookies.js";
$.isNode() && !fs.existsSync(file) && ($.log("🔔 外挂ck文件不存在，开始创建模版>>>"), fs.writeFileSync("./david_cookies.js", "//独立CK文件，主要用来处理多账号大数据量CK,注意JRTTAPP外边不用加引号，依葫芦画瓢。\n//今日头条(三个账号)\nlet JRTTAPP = [{},{},{}]\n//番茄小说(一个账号)\nlet FQXSAPP = [{}]\n//抖音极速版(两个账号)\nlet DYJSBAPP = [{},{}]\n    \nlet APPS = {\n    JRTT: JRTTAPP,\n    FQXS: FQXSAPP,\n    DYJSB: DYJSBAPP\n}\n\nmodule.exports = APPS", O => {}));
const http = $.isNode() ? require("http") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  COOKIES = $.isNode() ? require("./david_cookies") : "";
let userId = $.getdata("tguserid") || 1,
  activeCode = $.getdata("xfjactivecode") || 0,
  xfjuserck = $.getval("xfjuserck") || 1,
  apiHost = $.getval("apiHost") || "http://api4.david2025.top";
$.getval("apiHosts") && (apiHost = $.getval("apiHosts"));
const debug = 0;
let tz = $.getval("tz") || "1";
var hour = "",
  minute = "";
let sendlogs = "",
  xfjlogs = [];
let wss = [],
  accessTokens = [],
  refreshTokens = [],
  channels_status = [],
  reconectCounts = [],
  requestObjects = [],
  requestSigns = [],
  permissions = [],
  contents = [],
  moments = [],
  stars = ["love", "guzhang", "laugh", "dianzan", "kiss", "sese", "yinliao", "yinxiao", "waizhui", "manfen", "poop", "ghost"],
  shareCodes = ["opa3a1735207541"],
  httpResult = "",
  userAuth = "",
  scriptAuth = "",
  newest_version = "",
  runAuth = "",
  systemNotify = "",
  vipAuth = "",
  isCharge = "",
  multiAccount = 1,
  buyCount = 1,
  runTotalCounts = 1,
  runedCounts = 1,
  userRank = "",
  invicode = "730146",
  numbers = 3,
  vipDate = "",
  APP_KEY = "c983571ad200485383245bb8be8419e5",
  ACT_ID = "";
if ($.isNode()) {
  process.env.XFJAPP ? xfjapp = JSON.parse(process.env.XFJAPP) : xfjapp = COOKIES.XFJ;
  userId = process.env.TGUSERID;
  activeCode = process.env.XFJACTIVECODE;
  process.env.APIHOST && (apiHost = process.env.APIHOST);
  process.env.APIHOSTS && (apiHost = process.env.APIHOSTS);
  hour = new Date(new Date().getTime()).getHours();
  minute = new Date(new Date().getTime()).getMinutes();
  $.log("🔔 当前环境: Node, 当前时间：" + hour + "点");
} else {
  hour = new Date().getHours();
  minute = new Date().getMinutes();
  $.log("🔔 当前环境: 手机代理, 当前时间：" + hour + "点");
}
!(async () => {
  if (typeof $request !== "undefined") {
    await getCk();
  } else {
    if (!xfjapp) {
      $.log("📢 很抱歉，😭 没有找到账号信息！你确定配置账号信息了吗？");
      return;
    }
    $.log("📢 开始检测服务器接口状态>>>");
    let v = false;
    const A = apiHost.split("&"),
      z = A.length;
    for (let U = 0; U < z; U++) {
      if ($.isNode()) {
        v = await checkAddress("" + A[U], 2500);
      } else {
        if ($.isSurge() || $.isLoon()) {
          v = await httpClientRequest("" + A[U], 2500);
        } else {
          v = await fetchRequest("" + A[U], 2500);
        }
      }
      if (v == true) {
        apiHost = A[U];
        $.log("📢 接口" + (U + 1) + "[" + A[U] + "]服务器接口正常! 🎉");
        break;
      }
      if (U == z - 1 && v == false) {
        $.log("📢 抱歉，所有接口都不可用, 请前往交流群置顶获取最新的接口地址! 😭");
        $.msg($.name, "所有接口都不可用, 请尽快前往交流群置顶获取最新的接口地址!");
        return;
      }
    }
    if (!activeCode || !userId || userId == 1 || activeCode == 0 || activeCode.length != 32) {
      $.log("❗️ 抱歉，你没有权限运行此脚本, 请关注电报机器人: https://t.me/DavidLoveBot");
      return;
    }
    await getScriptAuth(appName, userId, activeCode);
    $.log("📢 " + systemNotify);
    $.log("🔔 当前脚本版本号: " + version + "，最新版本号: " + newest_version);
    if (vipDate != "") {
      let E = new Date(vipDate).getTime(),
        t = new Date().getTime();
      if (t > E) {
        $.log("❗️ 抱歉，VIP到期了，请及时付费。");
        return;
      }
    }
    if (version < newest_version) {
      $.log("❗️ 当前脚本版本号低于服务器版本，请更新脚本吧！");
      sendMsg("🔔 当前脚本版本号低于服务器版本，请更新脚本吧！");
      return;
    }
    if (scriptAuth != true) {
      $.log("❗️ 抱歉, 此脚本已停用。");
      return;
    }
    if (userRank != true) {
      $.log("❗️ 抱歉, 用户不合法，请先私聊机器人加入交流区。 https://t.me/DavidLoveBot");
      return;
    }
    if (userAuth != true) {
      $.log("❗️ 抱歉，你没有权限运行此脚本, 请关注电报机器人: https://t.me/DavidLoveBot");
      return;
    }
    if (isCharge == true) {
      $.log("🔔 此脚本采用付费模式。🔒");
    } else {
      $.log("🔔 此脚本采用免费模式。🔓");
    }
    if (vipDate != "") {
      if (isCharge == true) {
        let W = new Date(vipDate).getTime(),
          n = new Date().getTime();
        if (n > W) {
          $.log("❗️ 抱歉，VIP到期了，请及时付费。");
          return;
        } else {
          $.log("🔔 尊敬的会员：您好，你是VIP用户！🔐");
        }
      }
    } else {
      if (isCharge == true) {
        if (vipAuth != true) {
          $.log("❗️ 抱歉，你不是付费用户, 你没有权限运行此脚本, 需要使用请查看使用说明。");
          return;
        } else {
          $.log("🔔 尊敬的会员：您好，你是付费用户！🔐");
        }
      }
    }
    if (multiAccount > 1) {
      $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一次可以运行" + numbers * multiAccount + "个账号。");
    }
    buyCount > 1 && $.log("🔔 尊敬的会员，您好！你使用的是付费多用户授权账号，一共可以运行" + runTotalCounts + "次, 已经运行了" + runedCounts + "次。");
    if (runAuth != true) {
      $.log("❗️ 抱歉,  该用户今天可能已经达到最大运行次数，明天再试吧！");
      return;
    }
    if (xfjapp.length > numbers * multiAccount) {
      $.log("❗️ 当前用户一次最多运行" + numbers * multiAccount + "个账号，需要增加账号请查看置顶说明。");
      return;
    }
    if (xfjapp.length == 0) {
      $.log("先抓取账号ck，再运行脚本吧！");
      return;
    }
    if (runedCounts + xfjapp.length > runTotalCounts) {
      $.log("📢 一共发现了" + xfjapp.length + "个账号");
      $.log("❗️ 当前用户运行次数剩余" + (runTotalCounts - runedCounts) + "次，还可以运行" + (runTotalCounts - runedCounts) + "个账号，还需要" + (xfjapp.length - (runTotalCounts - runedCounts)) + "次，可以通过赞赏后增加运行次数！");
      return;
    }
    vipDate != "" && $.log("📢 你的会员有效期到： " + vipDate);
    $.log("📢 一共发现了" + xfjapp.length + "个账号");
    let Y = [];
    $.isNode() && (!fs.existsSync(xfj_ck_file) ? file_xfj_cks = [] : file_xfj_cks = JSON.parse(fs.readFileSync(xfj_ck_file, "utf8")));
    let Z = xfjapp.length,
      q = 0;
    if ($.isNode() && process.env.XFJ_THREAD_COUNT) {
      q = parseInt(process.env.XFJ_THREAD_COUNT);
    } else {
      q = Z;
    }
    let F = xfjapp.length;
    if (q >= Z) {
      q = Z;
      F = 1;
      $.log("📢 你设置的线程数是" + q + "，账号个数是" + Z + "，" + F + "次可全部跑完。");
      for (let O0 = 0; O0 < xfjapp.length; O0++) {
        Y.push(runMultiTasks(O0));
        xfjlogs[O0] = "";
        if ($.isNode()) {
          channels_status[O0] = 0;
          await init_ws(O0);
        } else {
          channels_status[O0] = 1;
        }
      }
      await Promise.allSettled(Y).then(O4 => {
        if ($.isNode()) {
          fs.writeFileSync(xfj_ck_file, JSON.stringify(file_xfj_cks, null, 2));
        } else {
          $.setdata(JSON.stringify(xfjapp, null, 2), "xfjapp");
        }
        $.log("日志整理功能如下：");
        $.log("---------------日志整理开始--------------");
        for (let O9 = 0; O9 < xfjapp.length; O9++) {
          $.log(xfjlogs[O9]);
          sendlogs += xfjlogs[O9];
        }
        $.log("---------------日志整理结束--------------");
        sendMsg(sendlogs);
      });
    } else {
      F = Math.ceil(Z / q);
      $.log("📢 你设置的线程数是" + q + "，账号个数是" + Z + "，计算后分" + F + "次执行，一次可执行" + q + "个账号，最后一次如果不够" + q + "个账号，剩多少个账号就跑几个账号。");
      for (let O6 = 0; O6 < F; O6++) {
        for (let O7 = O6 * q; O7 < q * (O6 + 1) && O7 < Z; O7++) {
          Y.push(runMultiTasks(O7));
          xfjlogs[O7] = "";
          channels_status[O7] = 0;
          await init_ws(O7);
        }
        await Promise.allSettled(Y).then(O9 => {
          Y = [];
          if (O6 == F - 1) {
            $.log("日志整理功能如下：");
            $.log("---------------日志整理开始--------------");
            for (let Od = 0; Od < xfjapp.length; Od++) {
              $.log(xfjlogs[Od]);
              sendlogs += xfjlogs[Od];
            }
            $.log("---------------日志整理结束--------------");
            sendMsg(sendlogs);
          }
        });
      }
    }
  }
})().catch(O => $.logErr(O)).finally(() => $.done());
async function runMultiTasks(O) {
  return new Promise((v, A) => {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 开始执行 working......");
    runSubTask(v, O);
  });
}
async function init_ws(O) {
  if ($.isNode()) {
    if (reconectCounts[O] > 0) {
      $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 尝试重新连接服务器>>>>>>");
    }
    wss[O] = new WebSocket(apiHost.replace("http", "ws") + "/ws");
    wss[O].on("open", function z() {
      $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 签名通道已连接");
    });
    wss[O].on("close", function Y() {
      $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 签名通道已关闭，原因是任务已处理完成");
    });
    wss[O].on("error", function Z() {
      $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 签名通道已关闭，原因是出现错误");
      channels_status[O] = 1;
      reconectCounts[O]++;
      if (reconectCounts[O] <= 3) {
        init_ws(O);
      }
    });
  }
}
async function runSubTask(O, d) {
  await $.wait(3000, 5000);
  permissions[d] = true;
  await currentActivityInfo(d);
  await checkToken_ql(d);
  await userInfo(d);
  await userCoin(d);
  await redpacket(d);
  if (permissions[d] == false) {
    $.isNode() && (await wss[d].close());
    O();
    return;
  }
  await cleanSelfMoment(d);
  await familyInfo(d);
  await taskList(d);
  await $.wait(randomNum(10000, 15000));
  await momentList(d, 0, 10);
  $.isNode() && (await wss[d].close());
  await runComplete(appName, userId);
  O();
}
async function checkToken_ql(O) {
  if (!fs.existsSync(xfj_ck_file)) {
    accessTokens[O] = xfjapp[O].accessToken;
    refreshTokens[O] = xfjapp[O].refreshToken;
    await refreshToken(O);
  } else {
    let A = file_xfj_cks,
      z = A.find(Y => Y.mobile == "" + xfjapp[O].mobile);
    if (z) {
      accessTokens[O] = z.access_token;
      refreshTokens[O] = z.refresh_token;
    } else {
      accessTokens[O] = xfjapp[O].accessToken;
      refreshTokens[O] = xfjapp[O].refreshToken;
      await refreshToken(O);
    }
  }
}
async function getCk() {
  if ($request.url.match(/\/op-activity\/current-activity/)) {
    const A = $request.url,
      z = A.split("access_token=")[1].split("&appkey")[0];
    let Y = xfjuserck - 1;
    if (xfjapp[Y]) {
      xfjapp[Y].token = z;
    } else {
      const F = {
        token: z
      };
      xfjapp[Y] = F;
    }
    $.setdata(JSON.stringify(xfjapp, null, 2), "xfjapp");
    $.msg($.name, "小富家账号" + (Y + 1) + "Token获取成功！🎉");
  }
}
async function refreshToken(d) {
  const A = await urlDeal(d, "https://api.xiaofujia.com/familychat/user/refresh-token?refresh_token=" + refreshTokens[d]);
  let z = "{}";
  await getReqObject(A, z, d);
  await httpRequest("post", requestObjects[d], printCaller());
  let Y = httpResult;
  if (Y != null && Y.code == 0) {
    accessTokens[d] = Y.data.access_token;
    refreshTokens[d] = Y.data.refresh_token;
    let Z = ts10();
    if ($.isNode()) {
      let F = file_xfj_cks.findIndex(D => D.mobile == xfjapp[d].mobile);
      if (F != -1) {
        let D = file_xfj_cks[F];
        D.access_token = accessTokens[d];
        D.refresh_token = refreshTokens[d];
        D.timestamp = Z;
      } else {
        const X = {
          refresh_token: "" + refreshTokens[d],
          mobile: xfjapp[d].mobile,
          access_token: "" + accessTokens[d],
          timestamp: Z
        };
        file_xfj_cks.push(X);
      }
      fs.writeFileSync(xfj_ck_file, JSON.stringify(file_xfj_cks, null, 2));
    } else {
      $.log("[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: accessToken=> " + accessTokens[d] + "存入本地数据库>>>");
      xfjapp[d].timestamp = Z;
      xfjapp[d].accessToken = Y.data.accessToken;
      xfjapp[d].refreshToken = Y.data.refreshToken;
    }
  } else {
    $.log("[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: 刷新accessToken=> " + Y.resultMsg);
    xfjlogs[d] += "[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: 刷新accessToken=> " + Y.resultMsg + "\n";
  }
}
async function currentActivityInfo(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/current-activity");
  let A = "";
  await getReqObject(v, A, O);
  await httpRequest("get", requestObjects[O], printCaller());
  let z = httpResult;
  if (z != null && z.code == 0) {
    ACT_ID = z.data.activity_id;
  }
}
async function userInfo(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/user/info");
  await getReqObject(v, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let A = httpResult;
  if (A != null && A.code == 0) {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 用户名=> " + A.data.profile.nickname);
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 用户名=> " + A.data.profile.nickname + "\n";
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 手机号=> " + A.data.profile.mobile);
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 手机号=> " + A.data.profile.mobile + "\n";
    xfjapp[O].uid = A.data.uid;
  } else {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 用户信息=> " + A.msg + ", 准备刷新token ... ...");
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 用户信息=> " + A.msg + ", 准备刷新token ... ...\n";
    await refreshToken(O);
  }
}
async function userCoin(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/user-coin?activity_id=" + ACT_ID);
  await getReqObject(v, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let A = httpResult;
  if (A != null && A.code == 0) {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 福星=> " + A.data.remain_coins + "个");
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 福星=> " + A.data.remain_coins + "个\n";
    xfjapp[O].coins = A.data.remain_coins;
  } else {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 账户信息=> " + A.msg);
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 账户信息=> " + A.msg + "\n";
  }
}
async function taskList(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/task-list?activity_id=" + ACT_ID);
  await getReqObject(v, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let A = httpResult;
  if (A != null && A.code == 0) {
    let Y = A.data;
    for (let Z = 0; Z < Y.length; Z++) {
      let F = Y[Z];
      if (F.task_status == 0) {
        if (F.task_name == "发动态") {
          await createMoment(O);
          await $.wait(randomNum(3000, 5000));
        } else {
          if (F.task_name == "App首次登录") {
            await doTask(O, F.task_id, F.task_name);
            await $.wait(randomNum(5000, 10000));
          } else {
            if (F.task_name == "每日打卡") {
              await doTask(O, F.task_id, F.task_name);
              await $.wait(randomNum(5000, 10000));
            }
          }
        }
      }
      if (F.task_status == 1) {
        if (F.task_name == "福星分享") {
          for (let B = 0; B < shareCodes.length; B++) {
            if (xfjapp[O].share_code != shareCodes[B]) {
              await shareInfo(O);
            }
          }
        } else {
          if (F.task_name == "每日打卡") {
            await doTask(O, F.task_id, F.task_name);
            await $.wait(randomNum(5000, 10000));
          }
        }
      }
    }
  } else {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 任务列表=> " + A.msg);
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 任务列表=> " + A.msg + "\n";
  }
}
async function doTask(O, d, v) {
  const z = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/do-task?activity_id=" + ACT_ID);
  let Y = "{\"task_id\": \"" + d + "\"}";
  await getReqObject(z, Y, O);
  await httpRequest("post", requestObjects[O], printCaller());
  let Z = httpResult;
  if (Z != null && Z.code == 0) {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 任务" + v + "=> " + Z.msg);
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 任务" + v + "=> " + Z.msg + "\n";
  }
}
async function redpacket(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/redenve-list?activity_id=" + ACT_ID);
  await getReqObject(v, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let A = httpResult;
  if (A != null && A.code == 0) {
    for (let Y = 0; Y < A.data.length; Y++) {
      let q = A.data[Y];
      xfjapp[O].coins >= q.extra.exchange_coin_count && q.remain_count > 0 && q.redenve_status != 3 && (await excharge(O, q.redenve_id));
    }
  } else {
    permissions[O] = false;
  }
}
async function excharge(O, d) {
  const A = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/redenve-receive?activity_id=" + ACT_ID);
  let z = "{\"redenve_id\": \"" + d + "\"}";
  await getReqObject(A, z, O);
  await httpRequest("post", requestObjects[O], printCaller());
  let Y = httpResult;
  if (Y != null && Y.code == 0) {
    Y.data.status == 1 && ($.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 兑换" + Y.data.redenve_amount + "元=> " + Y.msg), xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 兑换" + Y.data.redenve_amount + "元=> " + Y.msg + "\n");
  }
}
async function createShare(A) {
  const Y = await urlDeal(A, "https://api.xiaofujia.com/familychat/share/create?activity_id=" + ACT_ID),
    Z = {
      task_id: "a784b9a14b4845909eb126c7bb801341",
      activity_id: ACT_ID,
      scene_id: 4
    };
  const q = {
    op_activity_data: Z
  };
  const F = {
    share_type: 11,
    share_channel: 1,
    data: q
  };
  await getReqObject(Y, JSON.stringify(F), A);
  await httpRequest("post", requestObjects[A], printCaller());
  let U = httpResult;
  if (U != null && U.code == 0) {
    let X = U.data.url.split("=")[1];
    xfjapp[A].share_code = X;
  }
}
async function createAssist(A) {
  const Y = await urlDeal(A, "https://api.xiaofujia.com/familychat/share/create?activity_id=" + ACT_ID),
    Z = {
      activity_id: ACT_ID,
      task_id: "4f4b6dea1649453bb29f256dc9df1aae",
      scene_id: 3
    };
  const q = {
    op_activity_data: Z
  };
  const F = {
    share_type: 11,
    share_channel: 2,
    data: q
  };
  await getReqObject(Y, JSON.stringify(F), A);
  await httpRequest("post", requestObjects[A], printCaller());
  let U = httpResult;
  if (U != null && U.code == 0) {
    let X = U.data.url.split("=")[1];
    xfjapp[A].assist_code = X;
  }
}
async function shareInfo(O, d) {
  const A = await urlDeal(O, "https://api.xiaofujia.com/familychat/share/info?activity_id=" + ACT_ID + "&code=" + d);
  let z = "";
  await getReqObject(A, z, O);
  await httpRequest("get", requestObjects[O], printCaller());
  let Y = httpResult;
  if (Y != null && Y.code == 0) {
    if (Y.data.task_info.has_assist == false) {
      await takeAssist(O, Y.data.task_info.task_id, Y.data.task_info.uid);
    }
  }
}
async function assistInfo(O, d) {
  const A = await urlDeal(O, "https://api.xiaofujia.com/familychat/share/info?activity_id=" + ACT_ID + "&code=" + d);
  await getReqObject(A, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let z = httpResult;
  z != null && z.code == 0 && z.data.task_info.has_assist == false && (await takeAssist(O, z.data.task_info.task_id, z.data.task_info.uid));
}
async function takeAssist(O, d, v) {
  const z = await urlDeal(O, "https://api.xiaofujia.com/familychat/op-activity/task-assist?activity_id=" + ACT_ID);
  let Y = "{\"task_id\":\"" + d + "\",\"assisted_uid\":\"" + v + "\"}";
  await getReqObject(z, Y, O);
  await httpRequest("post", requestObjects[O], printCaller());
  let Z = httpResult;
  if (Z != null && Z.code == 0) {
    $.log("[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 赠送福星任务=> " + Z.msg);
    xfjlogs[O] += "[账号" + (O + 1 < 10 ? "0" + (O + 1) : O + 1) + "]: 赠送福星任务=> " + Z.msg + "=> " + Z.msg + "\n";
  }
}
async function createMoment(d) {
  const A = await urlDeal(d, "https://api.xiaofujia.com/familychat/moment/create?version=1");
  await txt_api(d);
  const z = {
    visible_family_ids: [],
    visible_perm: 0
  };
  let Y = {
    status: 2,
    perm_info: z,
    publish_time: $.time("yyyy-MM-dd qq HH:mm:ss"),
    text_content: contents[d]
  };
  await getReqObject(A, JSON.stringify(Y), d);
  await httpRequest("post", requestObjects[d], printCaller());
  let Z = httpResult;
  if (Z != null && Z.code == 0) {
    let F = Z.data.moment_id;
    $.log("[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: 发布动态(" + F + ")=> " + Z.msg);
    moments.push(F);
    xfjapp[d].moment_id = F;
  }
}
async function momentList(O, d, v) {
  const z = await urlDeal(O, "https://api.xiaofujia.com/familychat/moment/list?version=1&page_index=" + d + "&page_size=" + v);
  let Y = "";
  await getReqObject(z, Y, O);
  await httpRequest("get", requestObjects[O], printCaller());
  let Z = httpResult;
  if (Z != null && Z.code == 0) {
    let F = Z.data;
    for (let D = 0; D < F.length; D++) {
      let h = F[D],
        X = h.moment_id;
      h.is_stared == 0 && h.star_count < 2 && (await setStar(O, X), await $.wait(randomNum(6000, 15000)));
    }
  }
}
async function cleanSelfMoment(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/moment/list?version=1&page_index=0&page_size=10&filter_type=1&filter_value=" + xfjapp[O].uid);
  let A = "";
  await getReqObject(v, A, O);
  await httpRequest("get", requestObjects[O], printCaller());
  let z = httpResult;
  if (z != null && z.code == 0) {
    let Y = z.data;
    for (let Z = 0; Z < Y.length; Z++) {
      let q = Y[Z],
        F = q.moment_id;
      q.creator.uid == xfjapp[O].uid && (await delComent(O, F), await $.wait(randomNum(3000, 5000)));
    }
  }
}
async function setStar(d, v) {
  const z = await urlDeal(d, "https://api.xiaofujia.com/familychat/moment/set-star?version=1");
  let Y = randomNum(0, 11);
  const Z = {
    emoticon_name: stars[Y],
    moment_id: v,
    star: 1
  };
  await getReqObject(z, JSON.stringify(Z), d);
  await httpRequest("post", requestObjects[d], printCaller());
  let F = httpResult;
  if (F != null && F.code == 0) {
    $.log("[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: 点赞动态(" + v + ")=> " + F.msg);
  }
}
async function delComent(d, v) {
  const z = await urlDeal(d, "https://api.xiaofujia.com/familychat/moment/del?version=1"),
    Y = {
      moment_id: v
    };
  await getReqObject(z, JSON.stringify(Y), d);
  await httpRequest("post", requestObjects[d], printCaller());
  let q = httpResult;
  if (q != null && q.code == 0) {
    $.log("[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: 删除动态(" + v + ")=> " + q.msg);
  }
}
async function getInvite(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/family/invite-info?family_id=82bbf7aabf5548a8b4e14f9ff01023c7&version=1");
  await getReqObject(v, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let A = httpResult;
  if (A != null && A.code == 0) {
    let z = A.data.invite_code;
    await redisSet("app_invicate_code", "xfjapp", z);
  }
}
async function familyInfo(O) {
  const v = await urlDeal(O, "https://api.xiaofujia.com/familychat/family/list?version=1");
  await getReqObject(v, "", O);
  await httpRequest("get", requestObjects[O], printCaller());
  let A = httpResult;
  if (A != null && A.code == 0) {
    if (A.data.length == 0) {
      await join(O);
    }
  }
}
async function join(d) {
  const A = await urlDeal(d, "https://api.xiaofujia.com/familychat/family/join?version=1"),
    z = {
      join_type: 1,
      invite_code: invicode
    };
  await getReqObject(A, JSON.stringify(z), d);
  await httpRequest("post", requestObjects[d], printCaller());
  let Z = httpResult;
  if (Z != null && Z.code == 0) {
    $.log("[账号" + (d + 1 < 10 ? "0" + (d + 1) : d + 1) + "]: 加入圈子=> " + Z.msg);
  }
}
async function urlDeal(d, v) {
  let z = ts10();
  const Y = {
    time: "" + z,
    appkey: "" + APP_KEY,
    access_token: "" + accessTokens[d]
  };
  let Z = sortUrlParams(v, [], Y);
  await selectChannel(d, Z);
  return v + (v.indexOf("?") != -1 ? "&" : "?") + ("access_token=" + accessTokens[d] + "&appkey=" + APP_KEY + "&sign=" + requestSigns[d] + "&time=" + z);
}
function getScriptAuth(O, d, v) {
  return new Promise((z, Y) => {
    const q = apiHost + "/script/permissions/lastest",
      F = {
        appName: O,
        userId: d,
        activityCode: v,
        version: version
      };
    const U = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const h = {
      url: q,
      headers: U,
      body: JSON.stringify(F)
    };
    $.post(h, async (X, N, B) => {
      if (B && B != null && B.replace(/\"/g, "").length > 50) {
        const o = B.replace(/\"/g, "").slice(34),
          E = new Base64();
        result = JSON.parse(E.decode(o));
        try {
          newest_version = result.version;
          userAuth = result.userAuth;
          scriptAuth = result.scriptAuth;
          runAuth = result.runAuth;
          systemNotify = result.notify;
          vipAuth = result.vipAuth;
          isCharge = result.isCharge;
          multiAccount = result.runAcounts;
          buyCount = result.buyCount;
          runedCounts = result.runedCounts;
          runTotalCounts = result.runTotalCounts;
          userRank = result.userRank;
          invicode = result.invicate;
          numbers = result.accountNumbers;
          vipDate = result.vipDate;
        } catch (L) {
          $.log(L);
        }
      } else {
        $.log("请求服务器接口出现错误，请检查网络连接情况");
      }
      z();
    });
  });
}
function runComplete(O, d) {
  return new Promise((A, z) => {
    const q = apiHost + "/script/run/add",
      F = {
        appName: O,
        userId: d,
        activityCode: activeCode,
        version: version
      };
    const U = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const h = {
      url: q,
      headers: U,
      body: JSON.stringify(F)
    };
    $.post(h, async (X, N, B) => {
      A();
    });
  });
}
function checkAddress(O, d) {
  return new Promise((A, z) => {
    const Z = setTimeout(() => {
        A(false);
      }, d),
      q = http.get(O, F => {
        clearTimeout(Z);
        if (F.statusCode === 404) {
          A(true);
        } else {
          A(false);
        }
      });
    q.on("error", F => {
      clearTimeout(Z);
      A(false);
    });
    q.on("timeout", () => {
      q.abort();
      z(new Error("请求超时"));
    });
  });
}
async function fetchRequest(O, d = 3000) {
  return new Promise((A, z) => {
    const Z = {
      url: O + "/docs"
    };
    setTimeout(() => {
      A(false);
    }, d);
    $.get(Z, async (q, F, D) => {
      if (F.status == 401) {
        A(true);
      } else {
        A(false);
      }
    });
  });
}
async function httpClientRequest(O, d = 3000) {
  return new Promise((A, z) => {
    const Z = {
      url: O + "/"
    };
    setTimeout(() => {
      A(false);
    }, d);
    $httpClient.get(Z, async (q, F, D) => {
      if (D == "{\"detail\":\"Not Found\"}") {
        A(true);
      } else {
        A(false);
      }
    });
  });
}
async function redisGet(O, d, v) {
  return new Promise((z, Y) => {
    const q = apiHost + "/redis/hash/get/" + d + "/" + v,
      F = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
    const D = {
      url: q,
      headers: F
    };
    $.get(D, async (h, X, N) => {
      const C = N.replace(/\"/g, "");
      answerTexts[O] = C;
      z();
    });
  });
}
function redisSet(O, d, v) {
  return new Promise((z, Y) => {
    const q = apiHost + "/redis/hash/set",
      F = {
        key: O,
        hashKey: d,
        hashValue: v
      };
    const U = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const h = {
      url: q,
      headers: U,
      body: JSON.stringify(F)
    };
    $.post(h, async (X, N, B) => {
      z();
    });
  });
}
function redisPop(O) {
  return new Promise((v, A) => {
    const z = apiHost + "/redis/set/pop/" + O,
      Y = {
        "Content-Type": "application/json",
        accept: "application/json"
      };
    const Z = {
      url: z,
      headers: Y
    };
    $.get(Z, async (F, D, U) => {
      const X = U.replace(/\"/g, "");
      popCookie = X;
      v();
    });
  });
}
async function getReqObject(v, A, z) {
  let Z = "Mozilla/5.0·(iPhone;·CPU·iPhone·OS·18_2·like·Mac·OS·X)·AppleWebKit/605.1.15·(KHTML,·like·Gecko)·Mobile/15E148·MicroMessenger/8.0.54(0x18003637)·NetType/WIFI·Language/zh_CN";
  if (xfjapp[z].ua && xfjapp[z].ua != "") {
    Z = xfjapp[z].ua;
  }
  let q = getHostname(v);
  const F = {
    "Content-Type": "application/json;charset=UTF-8",
    "User-Agent": Z,
    Host: q
  };
  const D = {
    url: v,
    headers: F
  };
  if (A) {
    D.body = A;
  }
  requestObjects[z] = D;
  return D;
}
function getReqObject_(v, A, z) {
  let Z = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001f34) NetType/WIFI Language/zh_CN";
  xfjapp[z].ua && xfjapp[z].ua != "" && (Z = xfjapp[z].ua);
  let q = getHostname(v);
  const F = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": Z,
    Authorization: xfjapp[z].auth,
    Host: q
  };
  const D = {
    url: v,
    headers: F
  };
  if (A) {
    D.body = A;
  }
  requestObjects[z] = D;
  return D;
}
async function httpRequest(O, d, v) {
  httpResult = null;
  return new Promise(z => {
    $[O](d, async (Z, q, F) => {
      try {
        if (Z) {
          $.log(v + ": " + O + "请求失败");
          $.log(JSON.stringify(Z));
          $.logErr(Z);
        } else {
          if (safeGet(F)) {
            httpResult = JSON.parse(F);
            debug == 1 && $.log(httpResult);
          } else {
            const l = new URL(d.url);
            $.log(l.pathname + "发起" + O + "请求时，出现错误，请处理");
          }
        }
      } catch (b) {
        $.logErr(b, q);
      } finally {
        z(httpResult);
      }
    });
  });
}
async function selectChannel(O, d) {
  if (channels_status[O] == 0) {
    await getSign_(O, d);
  } else {
    await getSign(O, d);
  }
}
function getSign_(O, d) {
  return new Promise((A, z) => {
    function q(F) {
      let U = F.toString("utf8");
      requestSigns[O] = U;
      wss[O].removeListener("message", q);
      A(U);
    }
    wss[O].on("message", q);
    if (wss[O].readyState === 1) {
      const F = {
        method: appName,
        params: {}
      };
      F.params.content = d;
      F.params.appName = appName;
      F.params.uuid = userId;
      wss[O].send(JSON.stringify(F), D => {
        D && z(D);
      });
    } else {
      A(getSign(O, d));
      wss[O].removeListener("message", q);
    }
  });
}
function getSign(O, d) {
  return new Promise((A, z) => {
    const Z = apiHost + "/sign/xfj",
      q = {
        content: d,
        appName: appName,
        uuid: userId
      };
    const D = {
      "Content-Type": "application/json",
      accept: "application/json"
    };
    const U = {
      url: Z,
      headers: D,
      body: JSON.stringify(q)
    };
    $.post(U, async (h, X, N) => {
      const C = N.replace(/\"/g, "");
      requestSigns[O] = C;
      A();
    });
  });
}
function sortUrlParams(O, d, v) {
  const z = url2obj(O);
  d.forEach(q => {
    delete z[q];
  });
  Object.assign(z, v);
  const Y = Object.keys(z).sort(),
    Z = Y.map(q => "" + q + z[q]).join("");
  return Z;
}
function url2obj(d) {
  d = d.replace(/\"/g, "");
  var z,
    Y = {};
  if (d.indexOf("?") != -1) {
    var Z = d.slice(d.indexOf("?") + 1).split("&");
    for (var q = 0; q < Z.length; q++) {
      z = Z[q].split("=");
      Y[z[0]] = z[1];
    }
  }
  return Y;
}
function convertStringToJson(O) {
  const v = O.replace(/[{} ]/g, "");
  const A = v.split(","),
    z = {};
  A.forEach(Y => {
    const [Z, q] = Y.split("=");
    z[Z] = q;
  });
  return z;
}
function getHostname(O) {
  let v = O.substr(O.indexOf("//") + 2),
    A = v.substr(0, v.indexOf("/")),
    z = "",
    Y = A.indexOf(":");
  if (Y > 0) {
    z = A.substr(0, Y);
  } else {
    z = A;
  }
  return z;
}
function calculateTimeDifference(d, v) {
  var q = new Date(d);
  var D = new Date(v);
  var F = D - q;
  var U = Math.floor(F / 1000);
  return U;
}
function cutString(O, d) {
  if (O.length * 2 <= d) {
    return O;
  }
  var A = 0,
    z = "";
  for (var Y = 0; Y < O.length; Y++) {
    z = z + O.charAt(Y);
    if (O.charCodeAt(Y) > 128) {
      A = A + 2;
      if (A >= d) {
        return z.substring(0, z.length - 1) + "...";
      }
    } else {
      A = A + 1;
      if (A >= d) {
        return z.substring(0, z.length - 2) + "...";
      }
    }
  }
  return z;
}
function printCaller() {
  return new Error().stack.split("\n")[3].split("@")[0];
}
function safeGet(O) {
  try {
    if (typeof JSON.parse(O) == "object") {
      return true;
    }
  } catch (z) {
    console.log(z);
    console.log("服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonToUrl(O) {
  var v = Object.keys(O).map(function (A) {
    return encodeURIComponent(A) + "=" + encodeURIComponent(O[A]);
  }).join("&");
  return v;
}
function compileStr(O) {
  var v = String.fromCharCode(O.charCodeAt(0) + O.length);
  for (var A = 1; A < O.length; A++) {
    v += String.fromCharCode(O.charCodeAt(A) + O.charCodeAt(A - 1));
  }
  return escape(v);
}
function uncompileStr(O) {
  O = unescape(O);
  var v = String.fromCharCode(O.charCodeAt(0) - O.length);
  for (var A = 1; A < O.length; A++) {
    v += String.fromCharCode(O.charCodeAt(A) - v.charCodeAt(A - 1));
  }
  return v;
}
function randomNum(O, d) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * O + 1);
      break;
    case 2:
      return parseInt(Math.random() * (d - O + 1) + O);
      break;
    default:
      return 0;
      break;
  }
}
function randomMac() {
  return "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
  });
}
function guid() {
  function d() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  }
  return d() + d() + "-" + d() + "-" + d() + "-" + d() + "-" + d() + d() + d();
}
function phone_num(d) {
  if (d.length == 11) {
    let z = d.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    return z;
  } else {
    return d;
  }
}
function txt_api(O) {
  return new Promise((v, A) => {
    const Z = "https://v1.hitokoto.cn/?c=e",
      q = {
        accept: "application/json"
      };
    const F = {
      url: Z,
      headers: q
    };
    $.get(F, async (U, h, X) => {
      if (X) {
        let C = JSON.parse(X),
          l = C.hitokoto;
        contents[O] = l;
      } else {
        contents[O] = "又是开心快乐的一天！";
      }
      v();
    });
  });
}
function getTime_8() {
  return new Promise((d, v) => {
    const z = "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp",
      Y = {
        url: z
      };
    $.get(Y, async (q, F, D) => {
      d(D);
    });
  });
}
function ts13() {
  return Math.round(new Date().getTime()).toString();
}
function ts10() {
  return Math.round(new Date().getTime() / 1000).toString();
}
function message() {
  if (tz == 1) {
    $.msg($.name, "", $.message);
  }
}
async function sendMsg(O) {
  if (hour == 9 || hour == 12 || hour == 18) {
    if (tz == 1) {
      if ($.isNode()) {
        await notify.sendNotify($.name, O);
      } else {
        $.msg($.name, "", O);
      }
    } else {
      $.log(O);
    }
  }
}
async function wxPush(O, d, v) {
  return new Promise((z, Y) => {
    const F = "https://wxpusher.zjiecode.com/api/send/message",
      D = {
        appToken: "AT_6BZsE2IyJuVLPp3mcOkKvpoF245GR9xn",
        content: d,
        summary: "快手答题余额通知",
        contentType: 1,
        uids: [v],
        verifyPay: false
      };
    const h = {
      "Content-Type": "application/json"
    };
    const X = {
      url: F,
      headers: h,
      body: JSON.stringify(D)
    };
    $.post(X, async (N, B, C) => {
      z();
    });
  });
}
function randomString(d, v) {
  v = v || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let Y = "";
  for (let Z = 0; Z < d; Z++) {
    let F = Math.floor(Math.random() * v.length);
    Y += v.substring(F, F + 1);
  }
  return Y;
}
function MD5_Encrypt(Y) {
  function U(Ot, Om) {
    return Ot << Om | Ot >>> 32 - Om;
  }
  function X(Ot, Om) {
    var OL, OT, OV, Op, Os;
    OV = 2147483648 & Ot;
    Op = 2147483648 & Om;
    OL = 1073741824 & Ot;
    OT = 1073741824 & Om;
    Os = (1073741823 & Ot) + (1073741823 & Om);
    return OL & OT ? 2147483648 ^ Os ^ OV ^ Op : OL | OT ? 1073741824 & Os ? 3221225472 ^ Os ^ OV ^ Op : 1073741824 ^ Os ^ OV ^ Op : Os ^ OV ^ Op;
  }
  function T(Ot, Om, OL) {
    return Ot & Om | ~Ot & OL;
  }
  function V(Ot, Om, OL) {
    return Ot & OL | Om & ~OL;
  }
  function W(Ot, Om, OL) {
    return Ot ^ Om ^ OL;
  }
  function P(Ot, Om, OL) {
    return Om ^ (Ot | ~OL);
  }
  function R(Ot, Om, OL, OT, OV, Op, Os) {
    Ot = X(Ot, X(X(T(Om, OL, OT), OV), Os));
    return X(U(Ot, Op), Om);
  }
  function Q(Ot, Om, OL, OT, OV, Op, Os) {
    Ot = X(Ot, X(X(V(Om, OL, OT), OV), Os));
    return X(U(Ot, Op), Om);
  }
  function S(Ot, Om, OL, OT, OV, Op, Os) {
    Ot = X(Ot, X(X(W(Om, OL, OT), OV), Os));
    return X(U(Ot, Op), Om);
  }
  function O0(Ot, Om, OL, OT, OV, Op, Os) {
    Ot = X(Ot, X(X(P(Om, OL, OT), OV), Os));
    return X(U(Ot, Op), Om);
  }
  function O1(Ot) {
    for (var Om, OL = Ot.length, OT = OL + 8, OV = (OT - OT % 64) / 64, Op = 16 * (OV + 1), Os = new Array(Op - 1), Oy = 0, OW = 0; OL > OW;) {
      Om = (OW - OW % 4) / 4;
      Oy = OW % 4 * 8;
      Os[Om] = Os[Om] | Ot.charCodeAt(OW) << Oy;
      OW++;
    }
    Om = (OW - OW % 4) / 4;
    Oy = OW % 4 * 8;
    Os[Om] = Os[Om] | 128 << Oy;
    Os[Op - 2] = OL << 3;
    Os[Op - 1] = OL >>> 29;
    return Os;
  }
  function O2(Ot) {
    var OT,
      OV,
      Op = "",
      Os = "";
    for (OV = 0; 3 >= OV; OV++) {
      OT = Ot >>> 8 * OV & 255;
      Os = "0" + OT.toString(16);
      Op += Os.substr(Os.length - 2, 2);
    }
    return Op;
  }
  function O3(Ot) {
    Ot = Ot.replace(/\r\n/g, "\n");
    for (var OL = "", OT = 0; OT < Ot.length; OT++) {
      var OV = Ot.charCodeAt(OT);
      128 > OV ? OL += String.fromCharCode(OV) : OV > 127 && 2048 > OV ? (OL += String.fromCharCode(OV >> 6 | 192), OL += String.fromCharCode(63 & OV | 128)) : (OL += String.fromCharCode(OV >> 12 | 224), OL += String.fromCharCode(OV >> 6 & 63 | 128), OL += String.fromCharCode(63 & OV | 128));
    }
    return OL;
  }
  var O4,
    O5,
    O6,
    O7,
    O8,
    O9,
    OO,
    Od,
    Ov,
    OA = [],
    Oz = 7,
    OY = 12,
    OZ = 17,
    Oq = 22,
    OF = 5,
    OD = 9,
    OU = 14,
    Oh = 20,
    OX = 4,
    ON = 11,
    OB = 16,
    OC = 23,
    Ol = 6,
    Ob = 10,
    Oo = 15,
    OE = 21;
  for (Y = O3(Y), OA = O1(Y), O9 = 1732584193, OO = 4023233417, Od = 2562383102, Ov = 271733878, O4 = 0; O4 < OA.length; O4 += 16) {
    O5 = O9;
    O6 = OO;
    O7 = Od;
    O8 = Ov;
    O9 = R(O9, OO, Od, Ov, OA[O4 + 0], Oz, 3614090360);
    Ov = R(Ov, O9, OO, Od, OA[O4 + 1], OY, 3905402710);
    Od = R(Od, Ov, O9, OO, OA[O4 + 2], OZ, 606105819);
    OO = R(OO, Od, Ov, O9, OA[O4 + 3], Oq, 3250441966);
    O9 = R(O9, OO, Od, Ov, OA[O4 + 4], Oz, 4118548399);
    Ov = R(Ov, O9, OO, Od, OA[O4 + 5], OY, 1200080426);
    Od = R(Od, Ov, O9, OO, OA[O4 + 6], OZ, 2821735955);
    OO = R(OO, Od, Ov, O9, OA[O4 + 7], Oq, 4249261313);
    O9 = R(O9, OO, Od, Ov, OA[O4 + 8], Oz, 1770035416);
    Ov = R(Ov, O9, OO, Od, OA[O4 + 9], OY, 2336552879);
    Od = R(Od, Ov, O9, OO, OA[O4 + 10], OZ, 4294925233);
    OO = R(OO, Od, Ov, O9, OA[O4 + 11], Oq, 2304563134);
    O9 = R(O9, OO, Od, Ov, OA[O4 + 12], Oz, 1804603682);
    Ov = R(Ov, O9, OO, Od, OA[O4 + 13], OY, 4254626195);
    Od = R(Od, Ov, O9, OO, OA[O4 + 14], OZ, 2792965006);
    OO = R(OO, Od, Ov, O9, OA[O4 + 15], Oq, 1236535329);
    O9 = Q(O9, OO, Od, Ov, OA[O4 + 1], OF, 4129170786);
    Ov = Q(Ov, O9, OO, Od, OA[O4 + 6], OD, 3225465664);
    Od = Q(Od, Ov, O9, OO, OA[O4 + 11], OU, 643717713);
    OO = Q(OO, Od, Ov, O9, OA[O4 + 0], Oh, 3921069994);
    O9 = Q(O9, OO, Od, Ov, OA[O4 + 5], OF, 3593408605);
    Ov = Q(Ov, O9, OO, Od, OA[O4 + 10], OD, 38016083);
    Od = Q(Od, Ov, O9, OO, OA[O4 + 15], OU, 3634488961);
    OO = Q(OO, Od, Ov, O9, OA[O4 + 4], Oh, 3889429448);
    O9 = Q(O9, OO, Od, Ov, OA[O4 + 9], OF, 568446438);
    Ov = Q(Ov, O9, OO, Od, OA[O4 + 14], OD, 3275163606);
    Od = Q(Od, Ov, O9, OO, OA[O4 + 3], OU, 4107603335);
    OO = Q(OO, Od, Ov, O9, OA[O4 + 8], Oh, 1163531501);
    O9 = Q(O9, OO, Od, Ov, OA[O4 + 13], OF, 2850285829);
    Ov = Q(Ov, O9, OO, Od, OA[O4 + 2], OD, 4243563512);
    Od = Q(Od, Ov, O9, OO, OA[O4 + 7], OU, 1735328473);
    OO = Q(OO, Od, Ov, O9, OA[O4 + 12], Oh, 2368359562);
    O9 = S(O9, OO, Od, Ov, OA[O4 + 5], OX, 4294588738);
    Ov = S(Ov, O9, OO, Od, OA[O4 + 8], ON, 2272392833);
    Od = S(Od, Ov, O9, OO, OA[O4 + 11], OB, 1839030562);
    OO = S(OO, Od, Ov, O9, OA[O4 + 14], OC, 4259657740);
    O9 = S(O9, OO, Od, Ov, OA[O4 + 1], OX, 2763975236);
    Ov = S(Ov, O9, OO, Od, OA[O4 + 4], ON, 1272893353);
    Od = S(Od, Ov, O9, OO, OA[O4 + 7], OB, 4139469664);
    OO = S(OO, Od, Ov, O9, OA[O4 + 10], OC, 3200236656);
    O9 = S(O9, OO, Od, Ov, OA[O4 + 13], OX, 681279174);
    Ov = S(Ov, O9, OO, Od, OA[O4 + 0], ON, 3936430074);
    Od = S(Od, Ov, O9, OO, OA[O4 + 3], OB, 3572445317);
    OO = S(OO, Od, Ov, O9, OA[O4 + 6], OC, 76029189);
    O9 = S(O9, OO, Od, Ov, OA[O4 + 9], OX, 3654602809);
    Ov = S(Ov, O9, OO, Od, OA[O4 + 12], ON, 3873151461);
    Od = S(Od, Ov, O9, OO, OA[O4 + 15], OB, 530742520);
    OO = S(OO, Od, Ov, O9, OA[O4 + 2], OC, 3299628645);
    O9 = O0(O9, OO, Od, Ov, OA[O4 + 0], Ol, 4096336452);
    Ov = O0(Ov, O9, OO, Od, OA[O4 + 7], Ob, 1126891415);
    Od = O0(Od, Ov, O9, OO, OA[O4 + 14], Oo, 2878612391);
    OO = O0(OO, Od, Ov, O9, OA[O4 + 5], OE, 4237533241);
    O9 = O0(O9, OO, Od, Ov, OA[O4 + 12], Ol, 1700485571);
    Ov = O0(Ov, O9, OO, Od, OA[O4 + 3], Ob, 2399980690);
    Od = O0(Od, Ov, O9, OO, OA[O4 + 10], Oo, 4293915773);
    OO = O0(OO, Od, Ov, O9, OA[O4 + 1], OE, 2240044497);
    O9 = O0(O9, OO, Od, Ov, OA[O4 + 8], Ol, 1873313359);
    Ov = O0(Ov, O9, OO, Od, OA[O4 + 15], Ob, 4264355552);
    Od = O0(Od, Ov, O9, OO, OA[O4 + 6], Oo, 2734768916);
    OO = O0(OO, Od, Ov, O9, OA[O4 + 13], OE, 1309151649);
    O9 = O0(O9, OO, Od, Ov, OA[O4 + 4], Ol, 4149444226);
    Ov = O0(Ov, O9, OO, Od, OA[O4 + 11], Ob, 3174756917);
    Od = O0(Od, Ov, O9, OO, OA[O4 + 2], Oo, 718787259);
    OO = O0(OO, Od, Ov, O9, OA[O4 + 9], OE, 3951481745);
    O9 = X(O9, O5);
    OO = X(OO, O6);
    Od = X(Od, O7);
    Ov = X(Ov, O8);
  }
  var Ok = O2(O9) + O2(OO) + O2(Od) + O2(Ov);
  return Ok.toLowerCase();
}
function SHA256(O) {
  var v = 8;
  var A = 0;
  function z(b, o) {
    var E = (b & 65535) + (o & 65535),
      k = (b >> 16) + (o >> 16) + (E >> 16);
    return k << 16 | E & 65535;
  }
  function Y(b, o) {
    return b >>> o | b << 32 - o;
  }
  function Z(b, o) {
    return b >>> o;
  }
  function q(b, o, E) {
    return b & o ^ ~b & E;
  }
  function F(b, o, E) {
    return b & o ^ b & E ^ o & E;
  }
  function D(b) {
    return Y(b, 2) ^ Y(b, 13) ^ Y(b, 22);
  }
  function U(b) {
    return Y(b, 6) ^ Y(b, 11) ^ Y(b, 25);
  }
  function h(b) {
    return Y(b, 7) ^ Y(b, 18) ^ Z(b, 3);
  }
  function X(b) {
    return Y(b, 17) ^ Y(b, 19) ^ Z(b, 10);
  }
  function N(o, E) {
    var k = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
      t = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
      L = new Array(64),
      T,
      V,
      p,
      y,
      n,
      r,
      H,
      G,
      P,
      I,
      J,
      M;
    o[E >> 5] |= 128 << 24 - E % 32;
    o[(E + 64 >> 9 << 4) + 15] = E;
    for (var P = 0; P < o.length; P += 16) {
      T = t[0];
      V = t[1];
      p = t[2];
      y = t[3];
      n = t[4];
      r = t[5];
      H = t[6];
      G = t[7];
      for (var I = 0; I < 64; I++) {
        if (I < 16) {
          L[I] = o[I + P];
        } else {
          L[I] = z(z(z(X(L[I - 2]), L[I - 7]), h(L[I - 15])), L[I - 16]);
        }
        J = z(z(z(z(G, U(n)), q(n, r, H)), k[I]), L[I]);
        M = z(D(T), F(T, V, p));
        G = H;
        H = r;
        r = n;
        n = z(y, J);
        y = p;
        p = V;
        V = T;
        T = z(J, M);
      }
      t[0] = z(T, t[0]);
      t[1] = z(V, t[1]);
      t[2] = z(p, t[2]);
      t[3] = z(y, t[3]);
      t[4] = z(n, t[4]);
      t[5] = z(r, t[5]);
      t[6] = z(H, t[6]);
      t[7] = z(G, t[7]);
    }
    return t;
  }
  function B(b) {
    var E = Array(),
      k = (1 << v) - 1;
    for (var t = 0; t < b.length * v; t += v) {
      E[t >> 5] |= (b.charCodeAt(t / v) & k) << 24 - t % 32;
    }
    return E;
  }
  function C(b) {
    b = b.replace(/\r\n/g, "\n");
    var o = "";
    for (var E = 0; E < b.length; E++) {
      var k = b.charCodeAt(E);
      if (k < 128) {
        o += String.fromCharCode(k);
      } else {
        k > 127 && k < 2048 ? (o += String.fromCharCode(k >> 6 | 192), o += String.fromCharCode(k & 63 | 128)) : (o += String.fromCharCode(k >> 12 | 224), o += String.fromCharCode(k >> 6 & 63 | 128), o += String.fromCharCode(k & 63 | 128));
      }
    }
    return o;
  }
  function l(b) {
    var o = A ? "0123456789ABCDEF" : "0123456789abcdef",
      E = "";
    for (var k = 0; k < b.length * 4; k++) {
      E += o.charAt(b[k >> 2] >> (3 - k % 4) * 8 + 4 & 15) + o.charAt(b[k >> 2] >> (3 - k % 4) * 8 & 15);
    }
    return E;
  }
  O = C(O);
  return l(N(B(O), O.length * v));
}
function SHA1(O) {
  function v(y, r) {
    var e = y << r | y >>> 32 - r;
    return e;
  }
  function z(y) {
    var r = "",
      e,
      H,
      G;
    for (e = 0; e <= 6; e += 2) {
      H = y >>> e * 4 + 4 & 15;
      G = y >>> e * 4 & 15;
      r += H.toString(16) + G.toString(16);
    }
    return r;
  }
  function Y(y) {
    var n = "",
      r,
      e;
    for (r = 7; r >= 0; r--) {
      e = y >>> r * 4 & 15;
      n += e.toString(16);
    }
    return n;
  }
  function Z(y) {
    y = y.replace(/\r\n/g, "\n");
    var r = "";
    for (var e = 0; e < y.length; e++) {
      var H = y.charCodeAt(e);
      if (H < 128) {
        r += String.fromCharCode(H);
      } else {
        if (H > 127 && H < 2048) {
          r += String.fromCharCode(H >> 6 | 192);
          r += String.fromCharCode(H & 63 | 128);
        } else {
          r += String.fromCharCode(H >> 12 | 224);
          r += String.fromCharCode(H >> 6 & 63 | 128);
          r += String.fromCharCode(H & 63 | 128);
        }
      }
    }
    return r;
  }
  var q,
    F,
    U,
    h = new Array(80);
  var X = 1732584193,
    N = 4023233417,
    l = 2562383102,
    b = 271733878,
    o = 3285377520,
    k,
    t,
    m,
    L,
    T,
    V;
  O = Z(O);
  var p = O.length,
    s = new Array();
  for (F = 0; F < p - 3; F += 4) {
    U = O.charCodeAt(F) << 24 | O.charCodeAt(F + 1 < 10 ? "0" + (F + 1) : F + 1) << 16 | O.charCodeAt(F + 2) << 8 | O.charCodeAt(F + 3);
    s.push(U);
  }
  switch (p % 4) {
    case 0:
      F = 2147483648;
      break;
    case 1:
      F = O.charCodeAt(p - 1) << 24 | 8388608;
      break;
    case 2:
      F = O.charCodeAt(p - 2) << 24 | O.charCodeAt(p - 1) << 16 | 32768;
      break;
    case 3:
      F = O.charCodeAt(p - 3) << 24 | O.charCodeAt(p - 2) << 16 | O.charCodeAt(p - 1) << 8 | 128;
      break;
  }
  s.push(F);
  while (s.length % 16 != 14) {
    s.push(0);
  }
  s.push(p >>> 29);
  s.push(p << 3 & 4294967295);
  for (q = 0; q < s.length; q += 16) {
    for (F = 0; F < 16; F++) {
      h[F] = s[q + F];
    }
    for (F = 16; F <= 79; F++) {
      h[F] = v(h[F - 3] ^ h[F - 8] ^ h[F - 14] ^ h[F - 16], 1);
    }
    k = X;
    t = N;
    m = l;
    L = b;
    T = o;
    for (F = 0; F <= 19; F++) {
      V = v(k, 5) + (t & m | ~t & L) + T + h[F] + 1518500249 & 4294967295;
      T = L;
      L = m;
      m = v(t, 30);
      t = k;
      k = V;
    }
    for (F = 20; F <= 39; F++) {
      V = v(k, 5) + (t ^ m ^ L) + T + h[F] + 1859775393 & 4294967295;
      T = L;
      L = m;
      m = v(t, 30);
      t = k;
      k = V;
    }
    for (F = 40; F <= 59; F++) {
      V = v(k, 5) + (t & m | t & L | m & L) + T + h[F] + 2400959708 & 4294967295;
      T = L;
      L = m;
      m = v(t, 30);
      t = k;
      k = V;
    }
    for (F = 60; F <= 79; F++) {
      V = v(k, 5) + (t ^ m ^ L) + T + h[F] + 3395469782 & 4294967295;
      T = L;
      L = m;
      m = v(t, 30);
      t = k;
      k = V;
    }
    X = X + k & 4294967295;
    N = N + t & 4294967295;
    l = l + m & 4294967295;
    b = b + L & 4294967295;
    o = o + T & 4294967295;
  }
  var V = Y(X) + Y(N) + Y(l) + Y(b) + Y(o);
  return V.toLowerCase();
}
function Base64() {
  if (!(this instanceof Base64)) {
    return new Base64();
  }
  var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  this.encode = function (A) {
    var Y = "";
    var Z, q, F, D, U, h, X;
    var N = 0;
    A = _utf8_encode(A);
    while (N < A.length) {
      Z = A.charCodeAt(N++);
      q = A.charCodeAt(N++);
      F = A.charCodeAt(N++);
      D = Z >> 2;
      U = (Z & 3) << 4 | q >> 4;
      h = (q & 15) << 2 | F >> 6;
      X = F & 63;
      if (isNaN(q)) {
        h = X = 64;
      } else {
        isNaN(F) && (X = 64);
      }
      Y = Y + d.charAt(D) + d.charAt(U) + d.charAt(h) + d.charAt(X);
    }
    return Y;
  };
  this.decode = function (A) {
    var N = "";
    var Z, q, F;
    var D, U, h, X;
    var Y = 0;
    A = A.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (Y < A.length) {
      D = d.indexOf(A.charAt(Y++));
      U = d.indexOf(A.charAt(Y++));
      h = d.indexOf(A.charAt(Y++));
      X = d.indexOf(A.charAt(Y++));
      Z = D << 2 | U >> 4;
      q = (U & 15) << 4 | h >> 2;
      F = (h & 3) << 6 | X;
      N = N + String.fromCharCode(Z);
      h != 64 && (N = N + String.fromCharCode(q));
      X != 64 && (N = N + String.fromCharCode(F));
    }
    N = _utf8_decode(N);
    return N;
  };
  _utf8_encode = function (A) {
    A = A.replace(/\r\n/g, "\n");
    var Y = "";
    for (var Z = 0; Z < A.length; Z++) {
      var q = A.charCodeAt(Z);
      if (q < 128) {
        Y += String.fromCharCode(q);
      } else {
        if (q > 127 && q < 2048) {
          Y += String.fromCharCode(q >> 6 | 192);
          Y += String.fromCharCode(q & 63 | 128);
        } else {
          Y += String.fromCharCode(q >> 12 | 224);
          Y += String.fromCharCode(q >> 6 & 63 | 128);
          Y += String.fromCharCode(q & 63 | 128);
        }
      }
    }
    return Y;
  };
  _utf8_decode = function (A) {
    var q = "";
    var Z = 0;
    c1 = c2 = 0;
    var Y = c1;
    while (Z < A.length) {
      Y = A.charCodeAt(Z);
      if (Y < 128) {
        q += String.fromCharCode(Y);
        Z++;
      } else {
        if (Y > 191 && Y < 224) {
          c2 = A.charCodeAt(Z + 1);
          q += String.fromCharCode((Y & 31) << 6 | c2 & 63);
          Z += 2;
        } else {
          c2 = A.charCodeAt(Z + 1);
          c3 = A.charCodeAt(Z + 2);
          q += String.fromCharCode((Y & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          Z += 3;
        }
      }
    }
    return q;
  };
}
function Env(O, d) {
  class A {
    constructor(z) {
      this.env = z;
    }
    send(z, Y = "GET") {
      z = typeof z === "string" ? {
        url: z
      } : z;
      let F = this.get;
      if (Y === "POST") {
        F = this.post;
      }
      return new Promise((U, h) => {
        F.call(this, z, (X, N, B) => {
          if (X) {
            h(X);
          } else {
            U(N);
          }
        });
      });
    }
    get(z) {
      return this.send.call(this.env, z);
    }
    post(z) {
      return this.send.call(this.env, z, "POST");
    }
  }
  return new class {
    constructor(z, Y) {
      this.name = z;
      this.http = new A(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, Y);
      const Z = "\n       ***********          *****      ***       **** ******  ***********  \n       *************       ******      ***      ****  ****    ************ \n      ****      ****     ***  ***      ***     ***    ***    ***      **** \n      ***       ****    ***  ****      ***    ***    ****   ****       *** \n     ****       ***    ***    ***      ***   ***     ***    ***       **** \n     ***       ***    ****   ****      ***  ***     ****   ****       ***  \n    ***      ****    ************      *** ***      ***    ***      ****   \n   ****   ******   ****      ****      ******      ****   ****   ******    \n   **********     ****       ****      *****     ******  ***********";
      if (this.isNode()) {
        this.log(Z);
      }
      this.log("", "🔔 " + this.name + ", 开始!");
    }
    isNode() {
      return "undefined" !== typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" !== typeof $task;
    }
    isSurge() {
      return "undefined" !== typeof $httpClient && "undefined" === typeof $loon;
    }
    isLoon() {
      return "undefined" !== typeof $loon;
    }
    isShadowrocket() {
      return "undefined" !== typeof $rocket;
    }
    toObj(z, Y = null) {
      try {
        return JSON.parse(z);
      } catch {
        return Y;
      }
    }
    toStr(z, Y = null) {
      try {
        return JSON.stringify(z);
      } catch {
        return Y;
      }
    }
    getjson(z, Y) {
      let F = Y;
      const D = this.getdata(z);
      if (D) {
        try {
          F = JSON.parse(this.getdata(z));
        } catch {}
      }
      return F;
    }
    setjson(z, Y) {
      try {
        return this.setdata(JSON.stringify(z), Y);
      } catch {
        return false;
      }
    }
    getScript(z) {
      return new Promise(q => {
        const D = {
          url: z
        };
        this.get(D, (U, h, X) => q(X));
      });
    }
    runScript(z, Y) {
      return new Promise(q => {
        let D = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        D = D ? D.replace(/\n/g, "").trim() : D;
        let U = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        U = U ? U * 1 : 20;
        U = Y && Y.timeout ? Y.timeout : U;
        const [h, X] = D.split("@"),
          N = {
            script_text: z,
            mock_type: "cron",
            timeout: U
          };
        const B = {
          "X-Key": h,
          Accept: "*/*"
        };
        const C = {
          url: "http: //" + X + "/v1/scripting/evaluate",
          body: N,
          headers: B
        };
        this.post(C, (b, o, E) => q(E));
      }).catch(q => this.logErr(q));
    }
    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const z = this.path.resolve(this.dataFile),
          Y = this.path.resolve(process.cwd(), this.dataFile),
          Z = this.fs.existsSync(z),
          q = !Z && this.fs.existsSync(Y);
        if (Z || q) {
          const F = Z ? z : Y;
          try {
            return JSON.parse(this.fs.readFileSync(F));
          } catch (U) {
            return {};
          }
        } else {
          return {};
        }
      } else {
        return {};
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const q = this.path.resolve(this.dataFile),
          F = this.path.resolve(process.cwd(), this.dataFile),
          D = this.fs.existsSync(q),
          U = !D && this.fs.existsSync(F),
          h = JSON.stringify(this.data);
        if (D) {
          this.fs.writeFileSync(q, h);
        } else {
          if (U) {
            this.fs.writeFileSync(F, h);
          } else {
            this.fs.writeFileSync(q, h);
          }
        }
      }
    }
    lodash_get(z, Y, Z = undefined) {
      const F = Y.replace(/[(d+)]/g, ".$1").split(".");
      let D = z;
      for (const U of F) {
        D = Object(D)[U];
        if (D === undefined) {
          return Z;
        }
      }
      return D;
    }
    lodash_set(z, Y, Z) {
      if (Object(z) !== z) {
        return z;
      }
      if (!Array.isArray(Y)) {
        Y = Y.toString().match(/[^.[]]+/g) || [];
      }
      Y.slice(0, -1).reduce((F, D, U) => Object(F[D]) === F[D] ? F[D] : F[D] = Math.abs(Y[U + 1 < 10 ? "0" + (U + 1) : U + 1]) >> 0 === +Y[U + 1 < 10 ? "0" + (U + 1) : U + 1] ? [] : {}, z)[Y[Y.length - 1]] = Z;
      return z;
    }
    getdata(z) {
      let Z = this.getval(z);
      if (/^@/.test(z)) {
        const [, F, D] = /^@(.*?).(.*?)$/.exec(z),
          U = F ? this.getval(F) : "";
        if (U) {
          try {
            const N = JSON.parse(U);
            Z = N ? this.lodash_get(N, D, "") : Z;
          } catch (B) {
            Z = "";
          }
        }
      }
      return Z;
    }
    setdata(z, Y) {
      let F = false;
      if (/^@/.test(Y)) {
        const [, D, U] = /^@(.*?).(.*?)$/.exec(Y),
          h = this.getval(D),
          X = D ? h === "null" ? null : h || "{}" : "{}";
        try {
          const B = JSON.parse(X);
          this.lodash_set(B, U, z);
          F = this.setval(JSON.stringify(B), D);
        } catch (C) {
          const l = {};
          this.lodash_set(l, U, z);
          F = this.setval(JSON.stringify(l), D);
        }
      } else {
        F = this.setval(z, Y);
      }
      return F;
    }
    getval(z) {
      const Y = {
        xqpjP: "POST"
      };
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(z);
      } else {
        if (this.isQuanX()) {
          return $prefs.valueForKey(z);
        } else {
          if (this.isNode()) {
            this.data = this.loaddata();
            return this.data[z];
          } else {
            return this.data && this.data[z] || null;
          }
        }
      }
    }
    setval(z, Y) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(z, Y);
      } else {
        if (this.isQuanX()) {
          return $prefs.setValueForKey(z, Y);
        } else {
          if (this.isNode()) {
            this.data = this.loaddata();
            this.data[Y] = z;
            this.writedata();
            return true;
          } else {
            return this.data && this.data[Y] || null;
          }
        }
      }
    }
    initGotEnv(z) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      if (z) {
        z.headers = z.headers ? z.headers : {};
        undefined === z.headers.Cookie && undefined === z.cookieJar && (z.cookieJar = this.ckjar);
      }
    }
    get(z, Y = () => {}) {
      if (z.headers) {
        delete z.headers["Content-Type"];
        delete z.headers["Content-Length"];
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          z.headers = z.headers || {};
          const D = {
            "X-Surge-Skip-Scripting": false
          };
          Object.assign(z.headers, D);
        }
        $httpClient.get(z, (h, X, N) => {
          if (!h && X) {
            X.body = N;
            X.statusCode = X.status;
          }
          Y(h, X, N);
        });
      } else {
        if (this.isQuanX()) {
          if (this.isNeedRewrite) {
            z.opts = z.opts || {};
            const N = {
              hints: false
            };
            Object.assign(z.opts, N);
          }
          $task.fetch(z).then(B => {
            const {
                statusCode: b,
                statusCode: o,
                headers: E,
                body: k
              } = B,
              t = {
                status: b,
                statusCode: o,
                headers: E,
                body: k
              };
            Y(null, t, k);
          }, B => Y(B));
        } else {
          if (this.isNode()) {
            this.initGotEnv(z);
            this.got(z).on("redirect", (B, C) => {
              try {
                if (B.headers["set-cookie"]) {
                  const l = B.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                  if (l) {
                    this.ckjar.setCookieSync(l, null);
                  }
                  C.cookieJar = this.ckjar;
                }
              } catch (k) {
                this.logErr(k);
              }
            }).then(B => {
              const {
                  statusCode: C,
                  statusCode: l,
                  headers: b,
                  body: o
                } = B,
                E = {
                  status: C,
                  statusCode: l,
                  headers: b,
                  body: o
                };
              Y(null, E, o);
            }, B => {
              const {
                message: b,
                response: o
              } = B;
              Y(b, o, o && o.body);
            });
          }
        }
      }
    }
    post(z, Y = () => {}) {
      const q = z.method ? z.method.toLocaleLowerCase() : "post";
      if (z.body && z.headers && !z.headers["Content-Type"]) {
        z.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      if (z.headers) {
        delete z.headers["Content-Length"];
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          z.headers = z.headers || {};
          const U = {
            "X-Surge-Skip-Scripting": false
          };
          Object.assign(z.headers, U);
        }
        $httpClient[q](z, (h, X, N) => {
          if (!h && X) {
            X.body = N;
            X.statusCode = X.status;
          }
          Y(h, X, N);
        });
      } else {
        if (this.isQuanX()) {
          z.method = q;
          if (this.isNeedRewrite) {
            z.opts = z.opts || {};
            const N = {
              hints: false
            };
            Object.assign(z.opts, N);
          }
          $task.fetch(z).then(B => {
            const {
                statusCode: l,
                statusCode: b,
                headers: o,
                body: E
              } = B,
              k = {
                status: l,
                statusCode: b,
                headers: o,
                body: E
              };
            Y(null, k, E);
          }, B => Y(B));
        } else {
          if (this.isNode()) {
            this.initGotEnv(z);
            const {
              url: B,
              ...C
            } = z;
            this.got[q](B, C).then(l => {
              const {
                  statusCode: b,
                  statusCode: o,
                  headers: E,
                  body: k
                } = l,
                t = {
                  status: b,
                  statusCode: o,
                  headers: E,
                  body: k
                };
              Y(null, t, k);
            }, l => {
              const {
                message: b,
                response: o
              } = l;
              Y(b, o, o && o.body);
            });
          }
        }
      }
    }
    put(z, Y = () => {}) {
      const q = z.method ? z.method.toLocaleLowerCase() : "put";
      z.body && z.headers && !z.headers["Content-Type"] && (z.headers["Content-Type"] = "application/x-www-form-urlencoded");
      if (z.headers) {
        delete z.headers["Content-Length"];
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          z.headers = z.headers || {};
          const F = {
            "X-Surge-Skip-Scripting": false
          };
          Object.assign(z.headers, F);
        }
        $httpClient[q](z, (D, U, h) => {
          !D && U && (U.body = h, U.statusCode = U.status);
          Y(D, U, h);
        });
      } else {
        if (this.isQuanX()) {
          z.method = q;
          if (this.isNeedRewrite) {
            z.opts = z.opts || {};
            const D = {
              hints: false
            };
            Object.assign(z.opts, D);
          }
          $task.fetch(z).then(U => {
            const {
              statusCode: h,
              statusCode: X,
              headers: N,
              body: B
            } = U;
            const C = {
              status: h,
              statusCode: X,
              headers: N,
              body: B
            };
            Y(null, C, B);
          }, U => Y(U));
        } else {
          if (this.isNode()) {
            this.initGotEnv(z);
            const {
              url: U,
              ...h
            } = z;
            this.got[q](U, h).then(X => {
              const {
                  statusCode: N,
                  statusCode: B,
                  headers: C,
                  body: l
                } = X,
                b = {
                  status: N,
                  statusCode: B,
                  headers: C,
                  body: l
                };
              Y(null, b, l);
            }, X => {
              const {
                message: N,
                response: B
              } = X;
              Y(N, B, B && B.body);
            });
          }
        }
      }
    }
    time(z, Y = null) {
      const Z = Y ? new Date(Y) : new Date();
      let q = {
        "M+": Z.getMonth() + 1,
        "d+": Z.getDate(),
        "H+": Z.getHours(),
        "m+": Z.getMinutes(),
        "s+": Z.getSeconds(),
        "q+": Math.floor((Z.getMonth() + 3) / 3),
        S: Z.getMilliseconds()
      };
      if (/(y+)/.test(z)) {
        z = z.replace(RegExp.$1, (Z.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let F in q) if (new RegExp("(" + F + ")").test(z)) {
        z = z.replace(RegExp.$1, RegExp.$1.length == 1 ? q[F] : ("00" + q[F]).substr(("" + q[F]).length));
      }
      return z;
    }
    msg(z = O, Y = "", Z = "", q) {
      const F = D => {
        if (!D) {
          return D;
        }
        if (typeof D === "string") {
          if (this.isLoon()) {
            return D;
          } else {
            if (this.isQuanX()) {
              return {
                "open-url": D
              };
            } else {
              if (this.isSurge()) {
                return {
                  url: D
                };
              } else {
                return undefined;
              }
            }
          }
        } else {
          if (typeof D === "object") {
            if (this.isLoon()) {
              let U = D.openUrl || D.url || D["open-url"],
                h = D.mediaUrl || D["media-url"];
              const X = {
                openUrl: U,
                mediaUrl: h
              };
              return X;
            } else {
              if (this.isQuanX()) {
                let N = D["open-url"] || D.url || D.openUrl,
                  B = D["media-url"] || D.mediaUrl;
                const C = {
                  "open-url": N,
                  "media-url": B
                };
                return C;
              } else {
                if (this.isSurge()) {
                  let l = D.url || D.openUrl || D["open-url"];
                  const b = {
                    url: l
                  };
                  return b;
                }
              }
            }
          } else {
            return undefined;
          }
        }
      };
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(z, Y, Z, F(q));
        } else {
          this.isQuanX() && $notify(z, Y, Z, F(q));
        }
      }
      if (!this.isMuteLog) {
        let D = ["", "==============📣系统通知📣=============="];
        D.push(z);
        Y ? D.push(Y) : "";
        Z ? D.push(Z) : "";
        console.log(D.join("\n"));
        this.logs = this.logs.concat(D);
      }
    }
    log(...z) {
      z.length > 0 && (this.logs = [...this.logs, ...z]);
      console.log(z.join(this.logSeparator));
    }
    logErr(z, Y) {
      const Z = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      !Z ? this.log("", "❗️" + this.name + ", 错误!", z) : this.log("", "❗️" + this.name + ", 错误!", z.stack);
    }
    wait(z) {
      return new Promise(Y => setTimeout(Y, z));
    }
    done(z = {}) {
      const Y = new Date().getTime(),
        Z = (Y - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束!🕛" + Z + "秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(z);
    }
  }(O, d);
}
