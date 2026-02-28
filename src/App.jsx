import { useState, useEffect } from "react";

const T = {
  bg:        "#F0EAE3",
  bgCard:    "#F8F4EF",
  bgDeep:    "#E4DAD0",
  brown:     "#A8692E",
  brownDark: "#7A4A18",
  brownLight:"#C4813A",
  text:      "#2C2218",
  textMid:   "#6B4F35",
  textSoft:  "#9B8268",
  border:    "rgba(120,80,30,0.12)",
  shadow:    "rgba(100,60,10,0.10)",
};

const CATEGORIES = {
  A: { label:"生理激活",   emoji:"💧", color:"#6A9E7F", desc:"修复启动失灵，绕开动机系统" },
  B: { label:"感官唤醒",   emoji:"🌅", color:"#8B7BBF", desc:"恢复感觉输入，打断麻木状态" },
  C: { label:"微行为启动", emoji:"✦",  color:"#B8923A", desc:"建立「我能行动」的证据" },
  D: { label:"环境减负",   emoji:"◻",  color:"#5A9BBF", desc:"降低执行负荷，减少决策消耗" },
  E: { label:"自我维持",   emoji:"🌿", color:"#7A9E5A", desc:"维持系统运行，先稳住底盘" },
  F: { label:"情绪释放",   emoji:"〜",  color:"#BF6A7A", desc:"解除情绪阻滞，恢复流动性" },
  G: { label:"掌控感恢复", emoji:"◎",  color:"#BF8A5A", desc:"修复「可控性」感知" },
  H: { label:"反馈建立",   emoji:"✓",  color:"#5A8FBF", desc:"重建行为-结果连接" },
  I: { label:"低风险连接", emoji:"○",  color:"#9B7FBF", desc:"减少孤立，不追求亲密" },
  J: { label:"轻身体活动", emoji:"↗",  color:"#6A9F6A", desc:"提高多巴胺基线，别让能量滑到底" },
  K: { label:"少量结构",   emoji:"≡",  color:"#B0935A", desc:"防止时间变成混沌，状态稍好时使用" },
};

const SYSTEM_CARDS = [
  { id:"a1",  cat:"A", action:"喝一口水", why:"不是为了解渴，是给身体一个信号——有人在照顾它。", science:"水分摄入直接影响前额叶供能，是最小的神经系统重启。" },
  { id:"a2",  cat:"A", action:"去洗把脸", why:"温度变化会给神经系统一个定位点：现在，这里。", science:"冷/热水刺激三叉神经，能快速提升基础唤醒水平。" },
  { id:"a4",  cat:"A", action:"坐起来，脚踩到地板上", why:"改变姿势，就是改变大脑收到的信号。", science:"直立姿势增加前庭输入，提升整体唤醒度。" },
  { id:"a5",  cat:"A", action:"走到窗边，深呼吸三次", why:"离开卡住的位置，哪怕只是几步。", science:"位置移动加自然光输入，是低成本的环境重置。" },
  { id:"a6",  cat:"A", action:"换一件衣服，随便哪件", why:"皮肤感觉变了，大脑对当下的读取也会跟着变。", science:"皮肤感觉输入绕开高消耗认知通路，直接影响唤醒状态。" },
  { id:"a6a", cat:"A", action:"做一组盒式呼吸", why:"四个等长的节拍，给神经系统一个稳定的锚点。", science:"等时呼吸调节自律神经平衡，降低应激反应。", breathType:"444" },
  { id:"a6b", cat:"A", action:"做一组放松呼吸", why:"延长呼气是最快的主动放松方式，你可以直接控制它。", science:"4-7-8节律延长呼气相，有效激活迷走神经。", breathType:"478" },
  { id:"b1",  cat:"B", action:"把窗帘拉开，接受光照一小会儿。有条件也可以去户外", why:"光是最直接的生物钟信号，也是最简单的「现在」提示。", science:"视网膜光感受器接收自然光后，直接影响褪黑素与皮质醇节律。" },
  { id:"b2",  cat:"B", action:"放点背景音乐或白噪音", why:"声音填满空白，大脑就少一点自我消耗。", science:"适度听觉输入激活默认模式网络的外部定向，打断反刍思维。" },
  { id:"b3",  cat:"B", action:"找个有气味的东西闻一下", why:"嗅觉是最快抵达情绪系统的感官通路。", science:"嗅觉信号不经丘脑直接进入杏仁核，唤醒速度最快。" },
  { id:"b4",  cat:"B", action:"用温水冲一下手，感受水温", why:"把注意力放回身体，是最短的「回来」路径。", science:"触温觉输入激活脑岛皮层，恢复身体感知。" },
  { id:"b5",  cat:"B", action:"把灯光调亮", why:"光线本身就能改变大脑对当前状态的评估。", science:"照度影响血清素基础分泌，低光环境会加重情绪抑制。" },
  { id:"c1",  cat:"C", action:"洗掉一个杯子或碗", why:"小事完成了，大脑也会收到「我做到了」的信号。这个信号本身就有价值。", science:"完成感激活伏隔核的多巴胺释放，重建「行动有结果」的预期。" },
  { id:"c2",  cat:"C", action:"整理一下桌面，放好一件东西", why:"做完一件看得见的事，比在脑子里反复想一件大事消耗少得多。", science:"可见的小成果给大脑提供外显反馈，修复被削弱的奖励回路。" },
  { id:"c3",  cat:"C", action:"把一件不在原位的东西放回去", why:"让一件事回到它该在的地方。", science:"空间秩序的微小改变能降低前额叶的背景认知负荷。" },
  { id:"c4",  cat:"C", action:"找一件垃圾扔掉", why:"移除一件东西，也是完整的一次行动。", science:"清除行为触发「完成」信号，与创建同样有效地激活反馈回路。" },
  { id:"c5",  cat:"C", action:"给植物浇一点水", why:"照顾别的东西，有时候比照顾自己容易开始。", science:"照料行为激活催产素系统，降低防御性退缩。" },
  { id:"d1",  cat:"D", action:"关掉现在不用的网页或应用", why:"减少视觉信息，就是减少大脑正在处理的任务数量。", science:"多任务环境持续消耗工作记忆，减少输入能直接降低认知负荷。" },
  { id:"d2",  cat:"D", action:"把手机调成静音", why:"给自己一段不被打断的时间，哪怕很短。", science:"通知打断平均需要23分钟才能完全恢复注意力。" },
  { id:"d2b", cat:"D", action:"去一个安静的、没人打扰的地方", why:"环境本身就是大脑的信号——换个地方，思维也会跟着松动。", science:"环境切换激活海马体的情境编码，有助于脱离当前的困住状态。" },
  { id:"d4",  cat:"D", action:"花10分钟打扫一下眼前的空间", why:"清理环境是清理大脑的外化方式，动手比想容易。", science:"整理行为降低皮质醇水平，同时提供即时的完成感反馈。" },
  { id:"d5",  cat:"D", action:"找出一件用不到的东西处理掉", why:"扔掉一件东西，是给自己腾出一点空间——不只是物理上的。", science:"断舍离行为激活前额叶决策回路，重建对环境的掌控感。" },
  { id:"d3",  cat:"D", action:"清理出桌面的一角", why:"清出一个空的地方，视觉上就有了喘息的空间。", science:"环境杂乱程度与皮质醇水平正相关，微小整理有实质降压效果。" },
  { id:"e1",  cat:"E", action:"吃点东西，什么都行", why:"不需要是正经的一餐，有吃就算。", science:"血糖稳定是前额叶正常运作的基础条件，低血糖直接损害执行功能。" },
  { id:"e2",  cat:"E", action:"给自己倒杯热的", why:"温热感觉会直接影响情绪状态，这不是心理作用。", science:"口腔温热感激活脑岛，与社会温暖感使用同一神经回路。" },
  { id:"e3",  cat:"E", action:"躺下来闭眼一会儿，不要求睡着", why:"允许自己休息，本身就是一个决定。", science:"闭目休息10-20分钟能恢复前额叶约40%的执行资源。" },
  { id:"e4",  cat:"E", action:"换一套干净衣服", why:"换衣服是皮肤感觉和动作同时发生，双重信号。", science:"触觉输入改变身体图式，影响自我效能感的神经基础。" },
  { id:"f1",  cat:"F", action:"写下现在的感受，一句话，不用解释", why:"写出来不是为了解决，是为了让它不再困在里面。", science:"情绪命名激活前额叶，降低杏仁核反应强度。" },
  { id:"f3",  cat:"F", action:"放一首现在能听得下去的歌", why:"不需要让你变积极，能共鸣就行。", science:"音乐与边缘系统直接连接，即使是悲伤音乐也能减少情绪孤立感。" },
  { id:"f4",  cat:"F", action:"把你想骂的话找个没人听到的地方骂出来", why:"情绪不需要被合理化，先让它出来。", science:"情绪释放行为降低杏仁核持续激活，比压制更快恢复前额叶功能。" },
  { id:"g1",  cat:"G", action:"决定今天有一件事不做了", why:"「不做」也是一个主动的选择。", science:"自主决策激活前额叶腹内侧区，恢复控制感的神经基础。" },
  { id:"g2",  cat:"G", action:"给手边的事设一个终点：做到这里就停", why:"有终点的事，比没有边界的事容易开始得多。", science:"明确结束点降低任务威胁感，减少杏仁核对「开始」的阻抗。" },
  { id:"g3",  cat:"G", action:"把一个不紧急的安排往后推一推", why:"选择推迟，跟被迫推迟，感觉是不一样的。", science:"主动选择延迟激活前额叶控制回路，被动拖延则维持应激状态。" },
  { id:"g4",  cat:"G", action:"在今天剩下的事里，挑一件先做", why:"顺序是你定的，不是任务定的。", science:"微小优先级决策重建执行控制的基础条件。" },
  { id:"h1",  cat:"H", action:"写下你刚才做了什么，一句话就够", why:"让大脑知道：你做了，不是什么都没有。", science:"外显记录弥补低落状态下内在奖励感知的减弱，重建行为-结果连接。" },
  { id:"h2",  cat:"H", action:"找一件你今天做过的事，随手拍下来留个痕迹", why:"视觉证据让完成变得真实。看得见的记录比记忆更可靠。", science:"视觉记录激活海马体情景记忆编码，增强「完成」事件的神经痕迹。" },
  { id:"h3",  cat:"H", action:"在备忘录里留一句话，证明你做过", why:"写下来，就从「感觉」变成了「事实」。", science:"书写外化降低工作记忆负担，同时增强事件的情节记忆强度。" },
  { id:"i1",  cat:"I", action:"给某个人点个赞，或者回个表情", why:"不需要说很多，只是不彻底消失。", science:"最小社会信号激活腹侧纹状体的连接感回路，对抗孤立引起的能量下滑。" },
  { id:"i2",  cat:"I", action:"回一条消息，哪怕只写「收到」", why:"回应一件事，就完成了一次社会存在。", science:"简短社会回应维持社会认知网络激活，防止完全退缩。" },
  { id:"i3",  cat:"I", action:"去一个有人的地方待一会儿，不用说话", why:"身边有人，哪怕不互动，也有安抚效果。", science:"他人存在激活镜像神经元系统，提供被动的社会调节。" },
  { id:"i4",  cat:"I", action:"联系一个朋友或家人，约个饭或者发条消息", why:"主动伸出手，不需要理由，随便一件小事就够。", science:"主动社会接触激活催产素系统，对抗孤立感带来的能量消耗。" },
  { id:"i5",  cat:"I", action:"把看到的有趣的东西发给某个人", why:"分享一件小事，是最低成本的连接方式。", science:"分享行为激活腹侧被盖区奖励回路，同时强化社会归属感。" },
  { id:"i6",  cat:"I", action:"给很久没联系的人发一句话，不需要解释为什么", why:"重新露个面，不用有什么目的。", science:"恢复中断的社会连接能显著降低主观孤独感，即使是简短的接触。" },
  { id:"i7",  cat:"I", action:"找一个你信任的人，告诉他今天不太好过", why:"不需要解决，只是让另一个人知道。", science:"情绪披露给他人能激活前扣带回皮层，降低情绪压力的神经负担。" },
  { id:"j1",  cat:"J", action:"在房间里走几步", why:"移动就是信号：你还在这里，身体还在运作。", science:"轻度步行在数分钟内提升脑源性神经营养因子分泌。" },
  { id:"j2",  cat:"J", action:"伸个懒腰，或者活动一下肩颈", why:"紧绷的肌肉一直在消耗资源，放松它就是释放资源。", science:"肌肉放松激活副交感神经，降低皮质醇基础水平。" },
  { id:"j3",  cat:"J", action:"上下楼一次，慢慢来", why:"不是为了锻炼，只是让身体动起来。", science:"轻度有氧活动10分钟内提升去甲肾上腺素，直接影响动机感。" },
  { id:"j4",  cat:"J", action:"站起来，做几个随便什么动作", why:"动作不需要有计划，有动就算。", science:"任意自主运动激活运动皮层-基底节回路，降低启动阈值。" },
  { id:"j5",  cat:"J", action:"出去站一会儿，感受一下户外的空气", why:"换个物理空间，大脑会自动切换一下状态。", science:"户外接触降低皮质醇并提升血清素，即使短暂暴露也有效果。" },
  { id:"k1",  cat:"K", action:"写一个明天要做的事情", why:"一件，不是一个清单。知道明天有一件确定的事就够了。", science:"适度结构降低不确定性带来的前额叶预测负担。" },
  { id:"k2",  cat:"K", action:"把今天还没做的事写成一行", why:"写出来，它就不会在脑子里一直转了。", science:"任务外化降低工作记忆持续占用，释放认知资源。" },
  { id:"k3",  cat:"K", action:"把一件还没做的事，在日历上标一个要做它的时间", why:"给它一个具体的时间，它就从「一直悬着」变成了「有安排」。", science:"时间锚点激活前额叶的前瞻记忆系统，提供基础结构感。" },
];

const ENCOURAGEMENTS = [
  "你刚刚做了一件事。\n就这一件，已经够了。",
  "行动发生了。\n不管感觉怎样，它真实发生了。",
  "你没有等到「状态好了再做」。\n你直接做了。这才是真正的行为激活。",
  "很多人以为要「准备好」才能开始。\n你刚刚证明了：不需要。",
  "大脑正在重新学习：「我做了，有变化」。\n你刚给它一次新的练习。",
];

const TAG_POSITIONS = [
  // top row
  { top:"3%",  left:"28%", label:"情绪释放",   icon:"〜" },
  { top:"3%",  left:"55%", label:"感官唤醒",   icon:"🌅" },
  // upper-left / upper-right
  { top:"16%", left:"2%",  label:"微行为启动", icon:"✦" },
  { top:"16%", left:"66%", label:"生理激活",   icon:"💧" },
  // mid-left / mid-right
  { top:"32%", left:"0%",  label:"自我维持",   icon:"🌿" },
  { top:"32%", left:"70%", label:"环境减负",   icon:"◻" },
  // lower-mid left / right
  { top:"48%", left:"2%",  label:"低风险连接", icon:"○" },
  { top:"48%", left:"67%", label:"掌控感恢复", icon:"◎" },
  // lower row
  { top:"62%", left:"5%",  label:"反馈建立",   icon:"✓" },
  { top:"62%", left:"58%", label:"轻身体活动", icon:"↗" },
  // bottom center
  { top:"74%", left:"32%", label:"少量结构",   icon:"≡" },
];

function getRandom(arr, exclude=[]) {
  const pool = arr.filter(c => !exclude.includes(c.id));
  return pool[Math.floor(Math.random() * pool.length)];
}
function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("zh-CN",{month:"long",day:"numeric",weekday:"short"}) +
    "  " + d.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"});
}

// ─── MONKEY ──────────────────────────────────────────────────────────────────
const MONKEY_CURIOUS_B64 = "/monkey_curious.png";
const MONKEY_HAPPY_B64 = "/monkey_happy.png";

function Monkey({ size=120, celebrating=false }) {
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <img src={celebrating ? MONKEY_HAPPY_B64 : MONKEY_CURIOUS_B64} alt="monkey"
        style={{
          width:"100%", height:"100%", objectFit:"contain",
          filter: celebrating ? "drop-shadow(0 4px 16px rgba(196,140,60,0.45))" : "none",
          animation: celebrating ? "monkeyBounce 0.6s ease" : "none",
        }}
      />
      {celebrating && (
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          display:"flex", alignItems:"flex-start", justifyContent:"space-between",
          padding:"0 4px",
        }}>
          <span style={{ fontSize: size*0.18 }}>✨</span>
          <span style={{ fontSize: size*0.14, marginTop: size*0.05 }}>⭐</span>
          <span style={{ fontSize: size*0.18 }}>✨</span>
        </div>
      )}
    </div>
  );
}

// ─── DRAW CARD ────────────────────────────────────────────────────────────────
function DrawCard({ card, flipped }) {
  const cat = CATEGORIES[card.cat];
  return (
    <div style={{ width:"100%", maxWidth:300, margin:"0 auto", perspective:1000 }}>
      <div style={{
        position:"relative", width:"100%", paddingBottom:"148%",
        transition:"transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(0deg)" : "rotateY(180deg)",
      }}>
        {/* FRONT */}
        <div style={{
          position:"absolute", inset:0, borderRadius:22,
          backfaceVisibility:"hidden",
          background:`linear-gradient(150deg, ${T.bgCard} 0%, #FAF4EB 100%)`,
          border:`1.5px solid ${cat.color}22`,
          boxShadow:`0 6px 28px ${T.shadow}, 0 2px 8px rgba(0,0,0,0.06)`,
          padding:"22px 24px 20px",
          display:"flex", flexDirection:"column",
        }}>
          {/* category tag — subtle, top left */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:5,
            padding:"4px 10px", borderRadius:20,
            background:`${cat.color}10`,
            alignSelf:"flex-start",
          }}>
            <span style={{ fontSize:11 }}>{cat.emoji}</span>
            <span style={{ fontSize:10.5, color:`${cat.color}BB`, letterSpacing:"0.08em",
              fontFamily:"system-ui,sans-serif" }}>{cat.label}</span>
          </div>

          {/* action — big, centered */}
          <div style={{
            flex:1, display:"flex", alignItems:"center", justifyContent:"center",
            padding:"8px 4px",
          }}>
            <p style={{
              fontSize:26, color:T.text, lineHeight:1.5,
              fontFamily:"Georgia,serif", margin:0,
              textAlign:"center",
            }}>{card.action}</p>
          </div>

          <div style={{ height:1, background:T.border }}/>
        </div>

        {/* BACK */}
        <div style={{
          position:"absolute", inset:0, borderRadius:22,
          backfaceVisibility:"hidden", transform:"rotateY(180deg)",
          background:`linear-gradient(150deg, ${T.bgDeep}, ${T.bg})`,
          border:`1.5px solid ${T.border}`,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <span style={{ fontSize:28, opacity:0.25, color:T.brown }}>✦</span>
        </div>
      </div>
    </div>
  );
}


// ─── BREATH GUIDE ─────────────────────────────────────────────────────────────
function BreathGuide({ breathType, onComplete }) {
  const PATTERNS = {
    "444": {
      name: "盒式呼吸",
      rhythm: "吸气 · 屏息 · 呼气 · 屏息，各 4 秒",
      phases: [
        { label:"吸气", seconds:4, scale:1.35 },
        { label:"屏息", seconds:4, scale:1.35 },
        { label:"呼气", seconds:4, scale:0.72 },
        { label:"屏息", seconds:4, scale:0.72 },
      ],
    },
    "478": {
      name: "放松呼吸",
      rhythm: "吸气 4 秒 · 屏息 7 秒 · 呼气 8 秒",
      phases: [
        { label:"吸气", seconds:4,  scale:1.35 },
        { label:"屏息", seconds:7,  scale:1.35 },
        { label:"呼气", seconds:8,  scale:0.72 },
      ],
    },
  };

  const pattern = PATTERNS[breathType] || PATTERNS["444"];
  const TOTAL_ROUNDS = 3;

  const [round,       setRound]       = useState(1);
  const [phaseIdx,    setPhaseIdx]    = useState(0);
  const [countdown,   setCountdown]   = useState(pattern.phases[0].seconds);
  const [circleScale, setCircleScale] = useState(0.72);
  const [done,        setDone]        = useState(false);
  const [started,     setStarted]     = useState(false);

  useEffect(() => {
    if (!started || done) return;
    const phase = pattern.phases[phaseIdx];
    setCircleScale(phase.scale);
    setCountdown(phase.seconds);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          const nextIdx = phaseIdx + 1;
          if (nextIdx >= pattern.phases.length) {
            if (round >= TOTAL_ROUNDS) {
              setDone(true);
            } else {
              setRound(r => r + 1);
              setPhaseIdx(0);
            }
          } else {
            setPhaseIdx(nextIdx);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phaseIdx, round, started, done]);

  const phase = pattern.phases[phaseIdx];

  if (!started) return (
    <div style={{
      minHeight:"100vh", background:T.bg, maxWidth:420, margin:"0 auto",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"40px 32px", textAlign:"center",
    }}>
      <div style={{ fontSize:13, color:T.textSoft, fontFamily:"system-ui,sans-serif",
        letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:10 }}>
        {pattern.name}
      </div>
      <div style={{ fontSize:15, color:T.textMid, fontFamily:"system-ui,sans-serif",
        lineHeight:1.8, marginBottom:48 }}>
        {pattern.rhythm}
      </div>

      {/* preview circle */}
      <div style={{
        width:160, height:160, borderRadius:"50%",
        background:`radial-gradient(circle, ${T.brownLight}22, ${T.brown}18)`,
        border:`2px solid ${T.brown}30`,
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:48,
      }}>
        <span style={{ fontSize:28, opacity:0.4 }}>〇</span>
      </div>

      <button onClick={() => setStarted(true)} style={{
        padding:"14px 40px", borderRadius:50,
        background:`linear-gradient(135deg,${T.brownLight},${T.brown})`,
        border:"none", color:"#FFF8EF",
        fontSize:15, cursor:"pointer", fontFamily:"Georgia,serif",
        boxShadow:`0 4px 16px rgba(150,80,20,0.25)`,
      }}>开始</button>
    </div>
  );

  if (done) return (
    <div style={{
      minHeight:"100vh", background:T.bg, maxWidth:420, margin:"0 auto",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"40px 32px", textAlign:"center",
    }}>
      <div style={{ fontSize:40, marginBottom:20 }}>🌿</div>
      <p style={{ fontSize:20, color:T.text, fontFamily:"Georgia,serif",
        lineHeight:1.6, marginBottom:8 }}>做完了</p>
      <p style={{ fontSize:13, color:T.textSoft, fontFamily:"system-ui,sans-serif",
        lineHeight:1.8, marginBottom:48 }}>
        三轮呼吸完成。<br/>你刚给神经系统一个稳定的信号。
      </p>
      <button onClick={onComplete} style={{
        padding:"14px 40px", borderRadius:50,
        background:`linear-gradient(135deg,${T.brownLight},${T.brown})`,
        border:"none", color:"#FFF8EF",
        fontSize:15, cursor:"pointer", fontFamily:"Georgia,serif",
        boxShadow:`0 4px 16px rgba(150,80,20,0.25)`,
      }}>继续</button>
    </div>
  );

  const transitionDuration = phase.seconds * 0.85;

  return (
    <div style={{
      minHeight:"100vh", background:T.bg, maxWidth:420, margin:"0 auto",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"space-between", padding:"60px 32px 48px", textAlign:"center",
    }}>
      {/* top info */}
      <div>
        <div style={{ fontSize:12, color:T.textSoft, fontFamily:"system-ui,sans-serif",
          letterSpacing:"0.1em" }}>
          第 {round} / {TOTAL_ROUNDS} 轮
        </div>
      </div>

      {/* breathing circle */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:32 }}>
        <div style={{ position:"relative", width:240, height:240,
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          {/* outer ring */}
          <div style={{
            position:"absolute", inset:0, borderRadius:"50%",
            border:`1.5px solid ${T.brown}20`,
          }}/>
          {/* breathing circle */}
          <div style={{
            width:160, height:160, borderRadius:"50%",
            background:`radial-gradient(circle at 40% 35%, ${T.brownLight}55, ${T.brown}35)`,
            boxShadow:`0 0 40px ${T.brown}25`,
            transform:`scale(${circleScale})`,
            transition:`transform ${transitionDuration}s cubic-bezier(0.4,0,0.2,1)`,
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:4,
          }}>
            <span style={{ fontSize:18, color:"#FFF8EF", fontFamily:"system-ui,sans-serif",
              fontWeight:300, letterSpacing:"0.05em" }}>{phase.label}</span>
            <span style={{ fontSize:32, color:"#FFF8EF", fontFamily:"Georgia,serif",
              lineHeight:1 }}>{countdown}</span>
          </div>
        </div>

        {/* phase dots */}
        <div style={{ display:"flex", gap:8 }}>
          {pattern.phases.map((p, i) => (
            <div key={i} style={{
              width: i === phaseIdx ? 20 : 6,
              height:6, borderRadius:3,
              background: i === phaseIdx ? T.brown : `${T.brown}30`,
              transition:"all 0.3s",
            }}/>
          ))}
        </div>
      </div>

      {/* skip */}
      <button onClick={onComplete} style={{
        background:"none", border:"none",
        color:T.textSoft, fontSize:12,
        fontFamily:"system-ui,sans-serif", cursor:"pointer",
      }}>跳过</button>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,        setScreen]        = useState("home");
  const [drawCount,     setDrawCount]     = useState(0);
  const [forceChoose,   setForceChoose]   = useState(false);
  const [drawnCards,    setDrawnCards]    = useState([]);
  const [currentCard,   setCurrentCard]   = useState(null);
  const [cardFlipped,   setCardFlipped]   = useState(false);
  const [selectedCard,  setSelectedCard]  = useState(null);
  const [completedCard, setCompletedCard] = useState(null);
  const [inlineNote,    setInlineNote]    = useState(""); // for f1/h1 in-app writing
  const [stamped,       setStamped]       = useState(false);  // complete page stamp interaction
  const [history,       setHistory]       = useState([]);
  const [encouragement, setEncouragement] = useState("");
  const [isDrawing,     setIsDrawing]     = useState(false);
  const [showScience,   setShowScience]   = useState(false);
  const [breathScreen,  setBreathScreen]  = useState(false);
  const [customCards,   setCustomCards]   = useState([]);
  // pool page state
  const [expandedCat,   setExpandedCat]   = useState(null);
  // prefs: { A: 1, B: 1, ... } where 0=off, 1=normal, 2=more
  const [prefs,         setPrefs]         = useState(() => {
    try {
      const p = localStorage.getItem("ba_prefs");
      if (p) return JSON.parse(p);
    } catch(e) {}
    return Object.fromEntries(Object.keys(CATEGORIES).map(k => [k, 1]));
  });
  // add card form
  const [addForm,       setAddForm]       = useState(false);
  const [newAction,     setNewAction]     = useState("");
  const [newCat,        setNewCat]        = useState("A");
  const [newWhy,        setNewWhy]        = useState("");

  // ── localStorage ──
  useEffect(() => {
    try {
      const h = localStorage.getItem("ba_history");
      if (h) setHistory(JSON.parse(h));
      const c = localStorage.getItem("ba_custom");
      if (c) setCustomCards(JSON.parse(c));
    } catch(e) {}
  }, []);

  const saveHistory = (v) => {
    setHistory(v);
    try { localStorage.setItem("ba_history", JSON.stringify(v)); } catch(e) {}
  };
  const saveCustom = (v) => {
    setCustomCards(v);
    try { localStorage.setItem("ba_custom", JSON.stringify(v)); } catch(e) {}
  };
  const savePrefs = (v) => {
    setPrefs(v);
    try { localStorage.setItem("ba_prefs", JSON.stringify(v)); } catch(e) {}
  };

  // all cards = system + custom
  const ALL_CARDS = [...SYSTEM_CARDS, ...customCards];

  useEffect(() => {
    if (screen === "draw" && drawCount === 0 && !isDrawing) doDraw();
  }, [screen]);

  const mustChoose = forceChoose;

  const doDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setCardFlipped(false);
    setTimeout(() => {
      // weighted draw respecting prefs
      const excluded = drawnCards.map(c => c.id);
      const pool = ALL_CARDS.filter(c => !excluded.includes(c.id) && prefs[c.cat] !== 0);
      const weighted = [];
      pool.forEach(c => {
        const w = prefs[c.cat] === 2 ? 3 : 1;
        for (let i = 0; i < w; i++) weighted.push(c);
      });
      const card = weighted.length > 0
        ? weighted[Math.floor(Math.random() * weighted.length)]
        : getRandom(ALL_CARDS, excluded);
      setCurrentCard(card);
      setDrawnCards(prev => [...prev, card]);
      setDrawCount(prev => prev + 1);
      setShowScience(false);
      setTimeout(() => { setCardFlipped(true); setIsDrawing(false); }, 280);
    }, 350);
  };

  const handleComplete = () => {
    const card = selectedCard || currentCard;
    const enc  = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    setEncouragement(enc);
    setCompletedCard(card);
    saveHistory([{ id:Date.now(), card, ts:Date.now(), note: inlineNote || null }, ...history]);
    if (card && card.breathType) {
      setBreathScreen(true);
    } else {
      setScreen("complete");
    }
  };

  const handleBreathDone = () => {
    setBreathScreen(false);
    setScreen("complete");
  };

  const reset = () => {
    setScreen("home");
    setDrawCount(0); setDrawnCards([]); setForceChoose(false); setInlineNote(""); setStamped(false);
    setCurrentCard(null); setCardFlipped(false);
    setSelectedCard(null); setIsDrawing(false); setShowScience(false);
  };

  const handleAddCard = () => {
    if (!newAction.trim()) return;
    const card = {
      id: "u_" + Date.now(),
      cat: newCat,
      action: newAction.trim(),
      why: newWhy.trim() || "这是你自己知道有用的行为。",
      science: "",
      custom: true,
    };
    saveCustom([...customCards, card]);
    setNewAction(""); setNewWhy(""); setAddForm(false);
  };

  const exploredCats = new Set(history.map(e => e.card?.cat).filter(Boolean));

  const handleDeleteCustom = (id) => {
    saveCustom(customCards.filter(c => c.id !== id));
  };

  // ── breath screen ──
  if (breathScreen && completedCard?.breathType) {
    return <BreathGuide breathType={completedCard.breathType} onComplete={handleBreathDone}/>;
  }

  const wrap = {
    minHeight:"100vh", background:T.bg, maxWidth:420, margin:"0 auto",
    fontFamily:"'Georgia',serif", color:T.text,
    position:"relative", overflowX:"hidden",
  };
  const pad = {
    padding:"48px 22px 40px", minHeight:"100vh",
    display:"flex", flexDirection:"column",
  };
  const backBtn = (onClick) => (
    <button onClick={onClick} style={{
      background:"none", border:"none", color:T.textSoft,
      fontSize:13, cursor:"pointer", fontFamily:"system-ui,sans-serif",
    }}>← 返回</button>
  );

  // ══════════════════════════════════════════════ HOME
  if (screen === "home") return (
    <div style={wrap}>
      <div style={{ position:"relative", width:"100%", height:"64vh", minHeight:380, overflow:"hidden" }}>
        {TAG_POSITIONS.map((t,i) => (
          <div key={i} style={{
            position:"absolute", top:t.top, left:t.left,
            background:"rgba(255,255,255,0.82)", borderRadius:28, padding:"6px 12px",
            fontSize:12, color:T.text, fontFamily:"system-ui,sans-serif",
            boxShadow:`0 2px 10px ${T.shadow}`, whiteSpace:"nowrap",
            animation:`floatTag ${2.8+i*0.25}s ease-in-out infinite alternate`,
            animationDelay:`${i*0.18}s`,
            display:"flex", alignItems:"center", gap:5,
          }}>
            <span style={{ fontSize:13 }}>{t.icon}</span>
            <span>{t.label}</span>
          </div>
        ))}
        <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:220 }}>
          <Monkey size={220}/>
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:10, paddingBottom:44 }}>
        <button onClick={() => setScreen("draw")}
          onPointerDown={e => e.currentTarget.style.transform="scale(0.95)"}
          onPointerUp={e   => e.currentTarget.style.transform="scale(1)"}
          style={{
            width:172, height:172, borderRadius:"50%",
            background:`linear-gradient(145deg,${T.brownLight},${T.brown})`,
            border:"none", color:"#FFF8EF", fontSize:19, lineHeight:1.4,
            cursor:"pointer", fontFamily:"'Georgia',serif",
            boxShadow:`0 8px 28px rgba(150,80,20,0.28)`,
            display:"flex", alignItems:"center", justifyContent:"center",
            textAlign:"center", padding:"0 20px", transition:"transform 0.12s",
          }}>随机抽取<br/>行为激活</button>
        <button onClick={() => setScreen("history")} style={{
          marginTop:22, background:"none", border:"none",
          color:T.textSoft, fontSize:13, fontFamily:"system-ui,sans-serif", cursor:"pointer",
        }}>查看历史记录 →</button>
      </div>
      <style>{`@keyframes floatTag{from{transform:translateY(0)}to{transform:translateY(-8px)}} @keyframes monkeyBounce{0%{transform:scale(0.9)}50%{transform:scale(1.08)}100%{transform:scale(1)}}`}</style>
    </div>
  );

  // ══════════════════════════════════════════════ DRAW
  if (screen === "draw") return (
    <div style={wrap}>
      <div style={{ ...pad, paddingBottom:32 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          {backBtn(reset)}
          <div style={{ display:"flex", gap:7, alignItems:"center" }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width:8, height:8, borderRadius:"50%",
                background: i < drawCount ? T.brown : `${T.brown}25`,
                transition:"background 0.3s",
              }}/>
            ))}
            <span style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif", marginLeft:4 }}>
              还剩 {3-drawCount} 次
            </span>
          </div>
        </div>

        <p style={{ fontSize:14, color:T.textMid, fontFamily:"system-ui,sans-serif",
          textAlign:"center", margin:"0 0 20px", lineHeight:1.7 }}>
          {!mustChoose
            ? (currentCard && cardFlipped ? "不满意可以换一张哦！" : "正在抽取…")
            : "不能再换咯~三选一做一个"}
        </p>

        {!mustChoose ? (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {currentCard
              ? <DrawCard card={currentCard} flipped={cardFlipped}/>
              : <div style={{ width:280, height:400, borderRadius:22,
                  background:T.bgDeep, border:`1.5px dashed ${T.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:24, color:T.brown, opacity:0.2 }}>✦</span>
                </div>}
          </div>
        ) : (
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10, overflowY:"auto" }}>
            {drawnCards.slice(0,3).map(card => {
              const cat = CATEGORIES[card.cat];
              const sel = selectedCard?.id === card.id;
              return (
                <div key={card.id} onClick={() => setSelectedCard(card)} style={{
                  padding:"14px 16px", borderRadius:16,
                  background: sel ? `${cat.color}14` : T.bgCard,
                  border: sel ? `1.5px solid ${cat.color}50` : `1.5px solid ${T.border}`,
                  cursor:"pointer", transition:"all 0.2s",
                  display:"flex", alignItems:"center", gap:12,
                  boxShadow: sel ? `0 2px 12px ${T.shadow}` : "none",
                }}>
                  <div style={{ width:34, height:34, borderRadius:"50%",
                    background:`${cat.color}20`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:15, flexShrink:0 }}>{cat.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, color:cat.color, letterSpacing:"0.08em",
                      fontFamily:"system-ui,sans-serif", marginBottom:2 }}>{cat.label}</div>
                    <div style={{ fontSize:15, color:T.text, lineHeight:1.4 }}>{card.action}</div>
                  </div>
                  <div style={{
                    width:22, height:22, borderRadius:"50%",
                    border: sel ? "none" : `1.5px solid ${T.border}`,
                    background: sel ? T.brown : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    flexShrink:0, transition:"all 0.2s",
                  }}>{sel && <span style={{ color:"#fff", fontSize:11 }}>✓</span>}</div>
                </div>
              );
            })}
          </div>
        )}

        {!mustChoose && currentCard && cardFlipped && (
          <div style={{ marginTop:6, textAlign:"center" }}>
            <button onClick={() => setShowScience(!showScience)} style={{
              background:"none", border:"none", color:T.textSoft,
              fontSize:12, cursor:"pointer", fontFamily:"system-ui,sans-serif",
              letterSpacing:"0.03em", padding:"4px 0",
            }}>为什么这个有用？{showScience ? " ↑" : " ↓"}</button>
            {showScience && (
              <div style={{ marginTop:8, padding:"14px 16px", borderRadius:14,
                background:T.bgCard, border:`1.5px solid ${T.border}`, textAlign:"left",
                boxShadow:`0 2px 8px ${T.shadow}` }}>
                <p style={{ fontSize:13, color:T.textMid, lineHeight:1.8, margin:0,
                  fontFamily:"system-ui,sans-serif" }}>🐒 {currentCard.why}</p>
                {currentCard.science && <>
                  <div style={{ height:1, background:T.border, margin:"10px 0" }}/>
                  <p style={{ fontSize:12, color:T.textSoft, lineHeight:1.75, margin:0,
                    fontFamily:"system-ui,sans-serif" }}>🧠 {currentCard.science}</p>
                </>}
              </div>
            )}
          </div>
        )}

        {!mustChoose && currentCard && cardFlipped && (currentCard.id === "f1" || currentCard.id === "h1") && (
          <div style={{ marginTop:14 }}>
            <div style={{ fontSize:12, color:T.textSoft, fontFamily:"system-ui,sans-serif",
              marginBottom:6, letterSpacing:"0.03em" }}>
              {currentCard.id === "f1" ? "写下来（只有你自己看得到）" : "记一句话，证明你做了"}
            </div>
            <textarea
              value={inlineNote}
              onChange={e => setInlineNote(e.target.value)}
              placeholder={currentCard.id === "f1" ? "现在的感受是……" : "我刚才做了……"}
              style={{
                width:"100%", minHeight:80, padding:"12px 14px",
                borderRadius:12, border:`1.5px solid ${T.border}`,
                background:T.bgCard, color:T.text, fontSize:13,
                fontFamily:"system-ui,sans-serif", lineHeight:1.7,
                resize:"none", outline:"none", boxSizing:"border-box",
              }}
            />
          </div>
        )}

        <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:10 }}>
          {!mustChoose && currentCard && cardFlipped && (
            <button onClick={() => { setSelectedCard(currentCard); handleComplete(); }} style={{
              width:"100%", padding:"15px",
              background:`linear-gradient(135deg,${T.brownLight},${T.brown})`,
              border:"none", borderRadius:14, color:"#FFF8EF",
              fontSize:15, cursor:"pointer", fontFamily:"'Georgia',serif",
              boxShadow:`0 4px 16px rgba(150,80,20,0.22)`,
            }}>我决定做这个</button>
          )}
          {!mustChoose && drawCount <= 3 && currentCard && cardFlipped && (
            <button onClick={() => {
              if (drawCount >= 3) { setForceChoose(true); }
              else { doDraw(); }
            }} disabled={isDrawing} style={{
              width:"100%", padding:"14px",
              background:"transparent",
              border:`1.5px solid ${T.border}`,
              borderRadius:14,
              color:T.textMid,
              fontSize:15, cursor: isDrawing ? "default" : "pointer",
              fontFamily:"'Georgia',serif", opacity: isDrawing ? 0.6 : 1,
              transition:"all 0.2s",
            }}>{isDrawing ? "抽取中…" : drawCount >= 3 ? "换一张" : `换一张（还剩 ${3-drawCount} 次）`}</button>
          )}
          {mustChoose && (
            <button onClick={handleComplete} disabled={!selectedCard} style={{
              width:"100%", padding:"15px",
              background: selectedCard ? `linear-gradient(135deg,${T.brownLight},${T.brown})` : T.bgDeep,
              border:"none", borderRadius:14,
              color: selectedCard ? "#FFF8EF" : T.textSoft,
              fontSize:15, cursor: selectedCard ? "pointer" : "default",
              fontFamily:"'Georgia',serif",
              boxShadow: selectedCard ? `0 4px 16px rgba(150,80,20,0.22)` : "none",
              transition:"all 0.2s",
            }}>{selectedCard ? "选好了，做这个" : "请先选择一张"}</button>
          )}
        </div>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════ COMPLETE
  if (screen === "complete") {
    const card = completedCard;
    const cat  = card ? CATEGORIES[card.cat] : null;
    return (
      <div style={wrap}>
        <div style={{ ...pad, alignItems:"center", justifyContent:"center", textAlign:"center" }}>

          {/* ── 横幅 + 猴子庆祝区 ── */}
          <div style={{ position:"relative", width:"100%", marginBottom:24, paddingTop:12 }}>
            {/* 彩带装饰 */}
            <div style={{ position:"absolute", top:0, left:0, right:0,
              fontSize:18, letterSpacing:"0.15em", opacity:0.55,
              animation:"confettiFade 0.6s ease" }}>
              🎉✨🎊✨🎉
            </div>
            {/* 猴子 */}
            <div style={{ display:"flex", justifyContent:"center", paddingTop:28,
              animation:"bounceIn 0.5s ease" }}>
              <Monkey size={100} celebrating/>
            </div>
            {/* 固定横幅 */}
            <div style={{
              marginTop:14,
              padding:"10px 20px",
              borderRadius:50,
              background:`linear-gradient(135deg, #F5C842, ${T.brownLight}, #E87040)`,
              display:"inline-block",
              boxShadow:"0 4px 18px rgba(200,120,30,0.30)",
              animation:"bannerPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
            }}>
              <span style={{ fontSize:16, color:"#FFF8EF", fontFamily:"'Georgia',serif",
                letterSpacing:"0.04em", fontWeight:400 }}>
                你完成咯～一次行为激活！
              </span>
            </div>
            {/* 底部彩带 */}
            <div style={{ fontSize:16, letterSpacing:"0.2em", opacity:0.5, marginTop:8,
              animation:"confettiFade 0.6s ease 0.1s both" }}>
              🌟🎈🌟🎈🌟
            </div>
          </div>

          {/* ── 爪印盖章区 ── */}
          <div style={{ position:"relative", marginBottom: stamped ? 20 : 28 }}>

            {/* 未盖章：可点击按钮 */}
            {!stamped && (
              <button
                onClick={() => setStamped(true)}
                style={{
                  background:"none", border:"none", cursor:"pointer", padding:0,
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                  animation:"bounceIn 0.4s ease 0.4s both",
                }}
                onPointerDown={e => e.currentTarget.style.transform="scale(0.93)"}
                onPointerUp={e => e.currentTarget.style.transform="scale(1)"}
              >
                {/* 爪印SVG */}
                <div style={{ position:"relative", width:110, height:110 }}>
                  <svg viewBox="0 0 110 110" width="110" height="110" style={{ filter:"drop-shadow(0 4px 12px rgba(160,80,20,0.35))" }}>
                    {/* 掌心 */}
                    <ellipse cx="55" cy="68" rx="26" ry="22" fill="#C4813A" opacity="0.9"/>
                    {/* 大拇指方向趾垫 */}
                    <ellipse cx="28" cy="58" rx="9" ry="11" fill="#C4813A" opacity="0.85" transform="rotate(-20 28 58)"/>
                    {/* 四个趾垫 */}
                    <ellipse cx="36" cy="38" rx="8" ry="10" fill="#C4813A" opacity="0.85" transform="rotate(-10 36 38)"/>
                    <ellipse cx="51" cy="32" rx="8" ry="10" fill="#C4813A" opacity="0.85"/>
                    <ellipse cx="66" cy="34" rx="8" ry="10" fill="#C4813A" opacity="0.85" transform="rotate(10 66 34)"/>
                    <ellipse cx="79" cy="44" rx="8" ry="10" fill="#C4813A" opacity="0.85" transform="rotate(20 79 44)"/>
                    {/* 高光 */}
                    <ellipse cx="50" cy="62" rx="10" ry="7" fill="white" opacity="0.12"/>
                  </svg>
                  {/* 脉冲环 */}
                  <div style={{
                    position:"absolute", top:"50%", left:"50%",
                    transform:"translate(-50%,-50%)",
                    width:110, height:110, borderRadius:"50%",
                    border:"2px solid rgba(196,129,58,0.4)",
                    animation:"pulseRing 1.4s ease-out infinite",
                  }}/>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:16, color:T.brown, fontFamily:"'Georgia',serif", lineHeight:1.3 }}>
                    我做到咯～
                  </div>
                  <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif", marginTop:2 }}>
                    略略～
                  </div>
                </div>
              </button>
            )}

            {/* 盖章后：印章落定效果 */}
            {stamped && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ position:"relative", width:100, height:100, animation:"stampCrash 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
                  {/* 冲击光晕 */}
                  <div style={{
                    position:"absolute", top:"50%", left:"50%",
                    transform:"translate(-50%,-50%)",
                    width:130, height:130, borderRadius:"50%",
                    background:"radial-gradient(circle, rgba(196,129,58,0.25) 0%, transparent 70%)",
                    animation:"impactGlow 0.5s ease-out forwards",
                  }}/>
                  {/* 爪印（红色印泥版） */}
                  <svg viewBox="0 0 110 110" width="100" height="100">
                    <ellipse cx="55" cy="68" rx="26" ry="22" fill="#C0392B" opacity="0.88"/>
                    <ellipse cx="28" cy="58" rx="9" ry="11" fill="#C0392B" opacity="0.85" transform="rotate(-20 28 58)"/>
                    <ellipse cx="36" cy="38" rx="8" ry="10" fill="#C0392B" opacity="0.85" transform="rotate(-10 36 38)"/>
                    <ellipse cx="51" cy="32" rx="8" ry="10" fill="#C0392B" opacity="0.85"/>
                    <ellipse cx="66" cy="34" rx="8" ry="10" fill="#C0392B" opacity="0.85" transform="rotate(10 66 34)"/>
                    <ellipse cx="79" cy="44" rx="8" ry="10" fill="#C0392B" opacity="0.85" transform="rotate(20 79 44)"/>
                    <ellipse cx="50" cy="62" rx="10" ry="7" fill="white" opacity="0.10"/>
                  </svg>
                  {/* 小星星爆散 */}
                  {["✦","✦","✦","✦","✦","✦"].map((s,i) => (
                    <div key={i} style={{
                      position:"absolute", top:"50%", left:"50%",
                      fontSize: 10 + (i%3)*3,
                      color: ["#F5C842","#E87040","#C4813A","#F5C842","#E87040","#C4813A"][i],
                      animation:`starBurst${i} 0.5s ease-out forwards`,
                      pointerEvents:"none",
                    }}>{s}</div>
                  ))}
                </div>
                <div style={{ fontSize:13, color:"#C0392B", fontFamily:"'Georgia',serif",
                  letterSpacing:"0.04em", animation:"fadeSlideUp 0.3s ease 0.2s both", opacity:0 }}>
                  ✓ 已打卡
                </div>
              </div>
            )}
          </div>

          {/* ── 盖章后展开的内容 ── */}
          {stamped && (
            <div style={{ width:"100%", animation:"fadeSlideUp 0.4s ease 0.15s both", opacity:0 }}>
              {/* 占位：移除原有的已打卡印章div，内容直接开始 */}
              <div style={{ display:"none" }}/>

              {/* 卡片类别 + 行为 */}
              {cat && (
                <div style={{ width:"100%", marginBottom:14 }}>
                  <div style={{ fontSize:11, color:cat.color, letterSpacing:"0.14em",
                    fontFamily:"system-ui,sans-serif", textTransform:"uppercase", marginBottom:8 }}>
                    {cat.emoji} {cat.label}
                  </div>
                  <div style={{ padding:"14px 18px", borderRadius:14,
                    background:`${cat.color}12`, border:`1.5px solid ${cat.color}28` }}>
                    <p style={{ fontSize:18, color:T.text, lineHeight:1.45, margin:0 }}>{card.action}</p>
                  </div>
                </div>
              )}

              {/* 为什么 + 科学注释 */}
              {card && (
                <div style={{ width:"100%", padding:"14px 16px", borderRadius:14,
                  background:T.bgCard, border:`1.5px solid ${T.border}`,
                  marginBottom:16, textAlign:"left", boxShadow:`0 2px 12px ${T.shadow}` }}>
                  <div style={{ fontSize:11, color:T.textSoft, letterSpacing:"0.08em",
                    fontFamily:"system-ui,sans-serif", marginBottom:6 }}>这件事对你的帮助</div>
                  <p style={{ fontSize:13, color:T.textMid, lineHeight:1.8, margin:0,
                    fontFamily:"system-ui,sans-serif" }}>{card.why}</p>
                  {card.science && <>
                    <div style={{ height:1, background:T.border, margin:"10px 0" }}/>
                    <p style={{ fontSize:12, color:T.textSoft, lineHeight:1.7, margin:0,
                      fontFamily:"system-ui,sans-serif" }}>🧠 {card.science}</p>
                  </>}
                  {inlineNote && (card.id === "f1" || card.id === "h1") && <>
                    <div style={{ height:1, background:T.border, margin:"10px 0" }}/>
                    <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif", marginBottom:4 }}>你写的</div>
                    <p style={{ fontSize:13, color:T.text, lineHeight:1.75, margin:0,
                      fontFamily:"system-ui,sans-serif", whiteSpace:"pre-wrap" }}>{inlineNote}</p>
                  </>}
                </div>
              )}

              {/* 随机鼓励语 */}
              <div style={{ marginBottom:28, padding:"0 4px" }}>
                {encouragement.split("\n").map((line,i) => (
                  <p key={i} style={{
                    fontSize: i===0 ? 17 : 13, margin:"3px 0", lineHeight:1.65,
                    color: i===0 ? T.text : T.textMid,
                    fontFamily: i===0 ? "'Georgia',serif" : "system-ui,sans-serif",
                  }}>{line}</p>
                ))}
              </div>

              {/* 底部导航链接 */}
              <div style={{ width:"100%", display:"flex", justifyContent:"center", gap:32, paddingTop:4, paddingBottom:16 }}>
                <button onClick={reset} style={{
                  background:"none", border:"none", padding:"8px 0",
                  color:T.brown, fontSize:14, cursor:"pointer",
                  fontFamily:"system-ui,sans-serif",
                  borderBottom:`1.5px solid ${T.brown}`,
                }}>返回主页</button>
                <button onClick={() => setScreen("history")} style={{
                  background:"none", border:"none", padding:"8px 0",
                  color:T.brown, fontSize:14, cursor:"pointer",
                  fontFamily:"system-ui,sans-serif",
                  borderBottom:`1.5px solid ${T.brown}`,
                }}>查看我的记录</button>
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes bounceIn{0%{transform:scale(0.5);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
          @keyframes bannerPop{0%{transform:scale(0.6);opacity:0}100%{transform:scale(1);opacity:1}}
          @keyframes confettiFade{0%{opacity:0;transform:translateY(-6px)}100%{opacity:0.55;transform:translateY(0)}}
          @keyframes fadeSlideUp{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}
          @keyframes stampCrash{0%{transform:scale(2.2) translateY(-30px) rotate(-12deg);opacity:0}60%{transform:scale(0.88) translateY(4px) rotate(2deg);opacity:1}80%{transform:scale(1.06) translateY(-2px) rotate(-1deg)}100%{transform:scale(1) translateY(0) rotate(0deg);opacity:1}}
          @keyframes impactGlow{0%{transform:translate(-50%,-50%) scale(0.3);opacity:1}100%{transform:translate(-50%,-50%) scale(2);opacity:0}}
          @keyframes pulseRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0.6}100%{transform:translate(-50%,-50%) scale(1.5);opacity:0}}
          @keyframes starBurst0{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% + 45px),calc(-50% - 35px));opacity:0}}
          @keyframes starBurst1{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% - 50px),calc(-50% - 30px));opacity:0}}
          @keyframes starBurst2{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% + 55px),calc(-50% + 20px));opacity:0}}
          @keyframes starBurst3{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% - 45px),calc(-50% + 25px));opacity:0}}
          @keyframes starBurst4{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% + 10px),calc(-50% - 55px));opacity:0}}
          @keyframes starBurst5{0%{transform:translate(-50%,-50%);opacity:1}100%{transform:translate(calc(-50% - 15px),calc(-50% + 55px));opacity:0}}
        `}</style>
      </div>
    );
  }

  // ══════════════════════════════════════════════ HISTORY
  if (screen === "history") return (
    <div style={wrap}>
      <div style={{ ...pad, paddingBottom:40 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <h2 style={{ fontSize:22, fontWeight:400, color:T.text, margin:0 }}>行为激活记录</h2>
          {backBtn(() => setScreen("home"))}
        </div>

        {/* 卡池入口 */}
        <button onClick={() => setScreen("pool")} style={{
          width:"100%", padding:"13px 16px", marginBottom:18,
          background:T.bgCard, border:`1.5px solid ${T.border}`,
          borderRadius:14, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          boxShadow:`0 2px 8px ${T.shadow}`,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:18 }}>🗂</span>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:14, color:T.text, fontFamily:"'Georgia',serif" }}>浏览全部行为激活卡片</div>
              <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif", marginTop:1 }}>
                {SYSTEM_CARDS.length} 张系统卡片 · {customCards.length} 张自定义
              </div>
            </div>
          </div>
          <span style={{ fontSize:16, color:T.textSoft }}>→</span>
        </button>

        {history.length === 0 ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:16 }}>
            <Monkey size={90}/>
            <p style={{ color:T.textSoft, fontSize:14, fontFamily:"system-ui,sans-serif",
              textAlign:"center", lineHeight:1.75 }}>
              还没有记录。<br/>做完第一件事后，它会出现在这里。
            </p>
            <button onClick={() => setScreen("home")} style={{
              padding:"12px 28px",
              background:`linear-gradient(135deg,${T.brownLight},${T.brown})`,
              border:"none", borderRadius:12, color:"#FFF8EF",
              fontSize:14, cursor:"pointer", fontFamily:"'Georgia',serif",
            }}>去完成第一次行为激活</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:18, padding:"16px 18px", borderRadius:16,
              background:T.bgCard, border:`1.5px solid ${T.border}`,
              boxShadow:`0 2px 10px ${T.shadow}`,
              display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ textAlign:"center", minWidth:52 }}>
                <div style={{ fontSize:30, color:T.brown, fontWeight:300, lineHeight:1 }}>{history.length}</div>
                <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif", marginTop:2 }}>次启动</div>
              </div>
              <div style={{ width:1, height:36, background:T.border }}/>
              <p style={{ fontSize:13, color:T.textMid, lineHeight:1.75, margin:0,
                fontFamily:"system-ui,sans-serif" }}>
                每一次都是一次真实的行动，<br/>不管当时有没有感觉到。
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {history.map(entry => {
                const cat = CATEGORIES[entry.card.cat];
                return (
                  <div key={entry.id} style={{
                    padding:"14px 16px", borderRadius:14,
                    background:T.bgCard, border:`1.5px solid ${T.border}`,
                    display:"flex", alignItems:"flex-start", gap:12,
                  }}>
                    <div style={{ width:36, height:36, borderRadius:"50%",
                      background:`${cat.color}18`, display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:16, flexShrink:0 }}>{cat.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, color:cat.color, letterSpacing:"0.07em",
                        fontFamily:"system-ui,sans-serif", marginBottom:2 }}>{cat.label}</div>
                      <div style={{ fontSize:15, color:T.text, lineHeight:1.4, marginBottom:5 }}>
                        {entry.card.action}</div>
                      {entry.note && (
                        <div style={{ fontSize:12, color:T.textMid, fontFamily:"system-ui,sans-serif",
                          marginBottom:4, fontStyle:"italic", lineHeight:1.6 }}>「{entry.note}」</div>
                      )}
                      <div style={{ fontSize:11, color:T.textSoft,
                        fontFamily:"system-ui,sans-serif" }}>{formatDate(entry.ts)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ══════════════════════════════════════════════ PREFS
  if (screen === "prefs") return (
    <div style={wrap}>
      <div style={{ ...pad, paddingBottom:40 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <h2 style={{ fontSize:22, fontWeight:400, color:T.text, margin:0 }}>抽卡偏好</h2>
          {backBtn(() => setScreen("pool"))}
        </div>
        <p style={{ fontSize:13, color:T.textSoft, fontFamily:"system-ui,sans-serif",
          margin:"0 0 24px", lineHeight:1.75 }}>
          调整每个类别的出现频率。关掉的类别不会再被抽到。
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const explored = exploredCats.has(key);
            const pref = prefs[key] ?? 1;
            return (
              <div key={key} style={{
                padding:"14px 16px", borderRadius:14,
                background:T.bgCard, border:`1.5px solid ${pref===0 ? T.border : cat.color+"28"}`,
                opacity: pref===0 ? 0.5 : 1, transition:"all 0.2s",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%",
                    background:`${cat.color}18`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:16, flexShrink:0 }}>{cat.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{ fontSize:14, color:T.text, fontFamily:"'Georgia',serif" }}>{cat.label}</span>
                      {!explored && (
                        <span style={{ fontSize:10, color:T.textSoft,
                          fontFamily:"system-ui,sans-serif",
                          background:T.bgDeep, padding:"1px 7px", borderRadius:8 }}>未探索</span>
                      )}
                    </div>
                    <div style={{ fontSize:11, color:T.textSoft,
                      fontFamily:"system-ui,sans-serif", marginTop:1 }}>{cat.desc}</div>
                  </div>
                </div>

                {/* three-way toggle */}
                <div style={{ display:"flex", gap:6, marginTop:12 }}>
                  {[
                    { val:0, label:"不抽" },
                    { val:1, label:"正常" },
                    { val:2, label:"多抽" },
                  ].map(opt => (
                    <button key={opt.val} onClick={() => savePrefs({ ...prefs, [key]: opt.val })} style={{
                      flex:1, padding:"7px 0",
                      borderRadius:10,
                      background: pref===opt.val
                        ? (opt.val===0 ? "#BF6A6A22" : opt.val===2 ? `${cat.color}22` : `${T.brown}18`)
                        : "transparent",
                      border: pref===opt.val
                        ? `1.5px solid ${opt.val===0 ? "#BF6A6A55" : opt.val===2 ? cat.color+"55" : T.brown+"40"}`
                        : `1.5px solid ${T.border}`,
                      color: pref===opt.val
                        ? (opt.val===0 ? "#BF6A6A" : opt.val===2 ? cat.color : T.brown)
                        : T.textSoft,
                      fontSize:12, cursor:"pointer",
                      fontFamily:"system-ui,sans-serif",
                      transition:"all 0.15s",
                    }}>{opt.label}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* reset */}
        <button onClick={() => savePrefs(Object.fromEntries(Object.keys(CATEGORIES).map(k=>[k,1])))} style={{
          width:"100%", padding:"13px",
          background:"transparent", border:`1.5px solid ${T.border}`,
          borderRadius:14, color:T.textSoft,
          fontSize:13, cursor:"pointer", fontFamily:"system-ui,sans-serif",
        }}>恢复默认（全部正常）</button>
      </div>
    </div>
  );


  // ══════════════════════════════════════════════ POOL
  if (screen === "pool") return (
    <div style={wrap}>
      <div style={{ ...pad, paddingBottom:40 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <h2 style={{ fontSize:22, fontWeight:400, color:T.text, margin:0 }}>行为激活卡片池</h2>
          {backBtn(() => setScreen("history"))}
        </div>
        <p style={{ fontSize:13, color:T.textSoft, fontFamily:"system-ui,sans-serif",
          margin:"0 0 20px", lineHeight:1.7 }}>
          {ALL_CARDS.length} 张卡片 · 点开类别查看全部
        </p>

        {/* categories */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
          {Object.entries(CATEGORIES).map(([key, cat]) => {
            const catCards = ALL_CARDS.filter(c => c.cat === key);
            const isOpen   = expandedCat === key;
            return (
              <div key={key} style={{
                borderRadius:14, background:T.bgCard,
                border:`1.5px solid ${isOpen ? cat.color+"50" : T.border}`,
                overflow:"hidden", transition:"border 0.2s",
              }}>
                {/* header */}
                <div onClick={() => setExpandedCat(isOpen ? null : key)}
                  style={{
                    padding:"13px 16px", cursor:"pointer",
                    display:"flex", alignItems:"center", gap:12,
                  }}>
                  <div style={{ width:34, height:34, borderRadius:"50%",
                    background:`${cat.color}20`, display:"flex", alignItems:"center",
                    justifyContent:"center", fontSize:16, flexShrink:0 }}>{cat.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, color:T.text, fontFamily:"'Georgia',serif" }}>{cat.label}</div>
                    <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif", marginTop:1 }}>
                      {cat.desc}
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif" }}>
                      {catCards.length} 张
                    </span>
                    <span style={{
                      fontSize:13, color:T.textSoft,
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition:"transform 0.2s", display:"inline-block",
                    }}>›</span>
                  </div>
                </div>
                {/* expanded cards */}
                {isOpen && (
                  <div style={{ borderTop:`1px solid ${T.border}`, padding:"8px 12px 12px" }}>
                    {catCards.map(card => (
                      <div key={card.id} style={{
                        padding:"10px 12px", borderRadius:10, marginBottom:6,
                        background: card.custom ? `${cat.color}08` : "transparent",
                        border: card.custom ? `1px dashed ${cat.color}30` : `1px solid transparent`,
                        position:"relative",
                      }}>
                        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:14, color:T.text, lineHeight:1.4, marginBottom:4 }}>
                              {card.action}
                              {card.custom && <span style={{ fontSize:10, color:cat.color,
                                fontFamily:"system-ui,sans-serif", marginLeft:6,
                                background:`${cat.color}18`, padding:"1px 6px", borderRadius:8 }}>自定义</span>}
                            </div>
                            <div style={{ fontSize:12, color:T.textSoft, lineHeight:1.65,
                              fontFamily:"system-ui,sans-serif" }}>{card.why}</div>
                          </div>
                          {card.custom && (
                            <button onClick={() => handleDeleteCustom(card.id)} style={{
                              background:"none", border:"none", color:"#BF6A6A",
                              fontSize:14, cursor:"pointer", padding:"0 2px", flexShrink:0,
                            }}>×</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* add custom card */}
        {!addForm ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <button onClick={() => setAddForm(true)} style={{
              width:"100%", padding:"14px",
              background:"transparent",
              border:`1.5px dashed ${T.brown}50`,
              borderRadius:14, color:T.brown,
              fontSize:14, cursor:"pointer", fontFamily:"'Georgia',serif",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <span style={{ fontSize:18 }}>+</span> 添加我自己的行为
            </button>
            <button onClick={() => setScreen("prefs")} style={{
              width:"100%", padding:"14px",
              background:"transparent",
              border:`1.5px solid ${T.border}`,
              borderRadius:14, color:T.textMid,
              fontSize:14, cursor:"pointer", fontFamily:"system-ui,sans-serif",
              display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            }}>
              <span style={{ fontSize:16 }}>⚙</span> 调整抽卡偏好
            </button>
          </div>
        ) : (
          <div style={{ padding:"18px", borderRadius:16,
            background:T.bgCard, border:`1.5px solid ${T.border}` }}>
            <div style={{ fontSize:13, color:T.textMid, fontFamily:"system-ui,sans-serif",
              marginBottom:14, lineHeight:1.6 }}>
              添加一个你自己知道有用的行为，它会进入抽卡池。
            </div>

            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif",
                marginBottom:5, letterSpacing:"0.06em" }}>行为描述 *</div>
              <input
                value={newAction}
                onChange={e => setNewAction(e.target.value)}
                placeholder="比如：摸一摸我的猫"
                style={{
                  width:"100%", padding:"10px 12px", borderRadius:10,
                  border:`1.5px solid ${T.border}`, background:T.bg,
                  fontSize:14, color:T.text, fontFamily:"system-ui,sans-serif",
                  outline:"none", boxSizing:"border-box",
                }}
              />
            </div>

            <div style={{ marginBottom:12 }}>
              <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif",
                marginBottom:5, letterSpacing:"0.06em" }}>归类到</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {Object.entries(CATEGORIES).map(([k,cat]) => (
                  <button key={k} onClick={() => setNewCat(k)} style={{
                    padding:"5px 11px", borderRadius:20, cursor:"pointer",
                    background: newCat===k ? `${cat.color}22` : "transparent",
                    border: `1.5px solid ${newCat===k ? cat.color+"60" : T.border}`,
                    fontSize:11, color: newCat===k ? cat.color : T.textSoft,
                    fontFamily:"system-ui,sans-serif", transition:"all 0.15s",
                  }}>{cat.emoji} {cat.label}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:16 }}>
              <div style={{ fontSize:11, color:T.textSoft, fontFamily:"system-ui,sans-serif",
                marginBottom:5, letterSpacing:"0.06em" }}>为什么这个对你有用（选填）</div>
              <input
                value={newWhy}
                onChange={e => setNewWhy(e.target.value)}
                placeholder="可以不填"
                style={{
                  width:"100%", padding:"10px 12px", borderRadius:10,
                  border:`1.5px solid ${T.border}`, background:T.bg,
                  fontSize:14, color:T.text, fontFamily:"system-ui,sans-serif",
                  outline:"none", boxSizing:"border-box",
                }}
              />
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={handleAddCard} disabled={!newAction.trim()} style={{
                flex:1, padding:"12px",
                background: newAction.trim()
                  ? `linear-gradient(135deg,${T.brownLight},${T.brown})`
                  : T.bgDeep,
                border:"none", borderRadius:12,
                color: newAction.trim() ? "#FFF8EF" : T.textSoft,
                fontSize:14, cursor: newAction.trim() ? "pointer" : "default",
                fontFamily:"'Georgia',serif", transition:"all 0.2s",
              }}>加入卡池</button>
              <button onClick={() => { setAddForm(false); setNewAction(""); setNewWhy(""); }} style={{
                padding:"12px 16px",
                background:"transparent", border:`1.5px solid ${T.border}`,
                borderRadius:12, color:T.textSoft,
                fontSize:13, cursor:"pointer", fontFamily:"system-ui,sans-serif",
              }}>取消</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
