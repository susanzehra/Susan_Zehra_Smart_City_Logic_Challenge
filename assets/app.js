"use strict";
const state={name:"",completed:new Set()};
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const classify=[
  ["SensorActive", "literal"],["¬GateOpen", "literal"],["¬Storm ∨ Delay", "clause"],
  ["(¬Storm ∨ Delay) ∧ (¬Delay ∨ Alert)", "cnf"],["robot7", "constant"],["Serves(robot7, stationC)", "atom"]
];
const fol=[
  ["stationC", "constant"],["x", "variable"],["Damaged(x)", "predicate"],
  ["ManagerOf(x)", "function"],["Serves(robot2, stationC)", "atomic"]
];
const options=(items)=>'<option value="">Choose</option>'+items.map(x=>`<option value="${x[0]}">${x[1]}</option>`).join('');
function renderQuestions(){
  const cats=[["literal","Literal"],["clause","Clause"],["cnf","CNF sentence"],["constant","Constant"],["atom","Atomic sentence"]];
  $('#classifyList').innerHTML=classify.map((q,i)=>`<div class="question-row"><label>${i+1}. <code>${q[0]}</code></label><select data-answer="${q[1]}">${options(cats)}</select></div>`).join('');
  const roles=[["constant","Constant"],["variable","Variable"],["predicate","Predicate"],["function","Function"],["atomic","Atomic sentence"]];
  $('#folList').innerHTML=fol.map((q,i)=>`<div class="question-row"><label>${i+1}. <code>${q[0]}</code></label><select data-answer="${q[1]}">${options(roles)}</select></div>`).join('');
}
const cnfCards=[
  {id:'c1',text:'G → (S ∧ C)'},{id:'c2',text:'¬G ∨ (S ∧ C)'},{id:'c3',text:'(¬G ∨ S) ∧ (¬G ∨ C)'}
];
const refCards=[
  {id:'r1',text:'Add ¬CloseC (negate the query)'},{id:'r2',text:'Convert rules: ¬Storm ∨ PowerFailure; ¬PowerFailure ∨ CloseC'},{id:'r3',text:'Resolve Storm to derive PowerFailure'},{id:'r4',text:'Resolve PowerFailure to derive CloseC'},{id:'r5',text:'Resolve CloseC with ¬CloseC to derive □'}
];
function makeCard(c){const d=document.createElement('div');d.className='drag-card';d.draggable=true;d.dataset.id=c.id;d.innerHTML=`<span>${c.text}</span><button class="move-btn" type="button" title="Move card">↔</button>`;d.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',c.id));d.querySelector('button').onclick=()=>{const target=d.parentElement.classList.contains('card-pool')?d.parentElement.nextElementSibling.nextElementSibling:d.parentElement.previousElementSibling.previousElementSibling;target.appendChild(d)};return d}
function setupDnD(poolSel,answerSel,cards){const pool=$(poolSel),ans=$(answerSel);pool.innerHTML='';ans.innerHTML='';cards.forEach(c=>pool.appendChild(makeCard(c)));[pool,ans].forEach(zone=>{zone.addEventListener('dragover',e=>e.preventDefault());zone.addEventListener('drop',e=>{e.preventDefault();const id=e.dataTransfer.getData('text/plain');const card=document.querySelector(`[data-id="${id}"]`);if(card)zone.appendChild(card)})})}
function show(id){$$('main>section').forEach(s=>s.classList.add('hidden'));$('#'+id).classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})}
function feedback(id,ok,msg){const el=$('#'+id+'Feedback');el.className='feedback '+(ok?'good':'bad');el.innerHTML=msg}
function markDone(n){state.completed.add(n);const count=state.completed.size;$('#progressText').textContent=`${count} of 7 missions`;$('#progressBar').style.width=`${count/7*100}%`}
function nextMission(n){markDone(n);setTimeout(()=>show(n===7?'certificate':'m'+(n+1)),650);if(n===7)buildCertificate()}
function allSelectsCorrect(container){return [...$(container).querySelectorAll('select')].every(s=>s.value===s.dataset.answer)}
function ids(sel){return [...$(sel).children].map(x=>x.dataset.id)}
function checkMission(n){
  if(n===1){const ok=allSelectsCorrect('#classifyList');feedback('m1',ok,ok?'Evidence correctly classified. Mission unlocked.':'Some categories are not correct yet. Recheck the difference between a literal, a clause, and a complete CNF sentence.');if(ok)nextMission(1)}
  if(n===2){const ok=JSON.stringify(ids('#cnfAnswer'))===JSON.stringify(['c1','c2','c3']);feedback('m2',ok,ok?'Correct: remove the implication, then distribute OR over AND.':'The sequence is incomplete or out of order. The original rule belongs first and the two-clause CNF belongs last.');if(ok)nextMission(2)}
  if(n===3){const ok=$('#res1').value==='B'&&$('#res2').value==='C'&&$('#res3').value==='□'&&$('#resMeaning').value==='valid';feedback('m3',ok,ok?'Correct. The empty clause shows that the clause set is inconsistent.':'Follow the complementary literals carefully. The remaining literal after each resolution step becomes the input to the next step.');if(ok)nextMission(3)}
  if(n===4){const ok=JSON.stringify(ids('#refutationAnswer'))===JSON.stringify(['r1','r2','r3','r4','r5']);feedback('m4',ok,ok?'Correct. Because KB ∧ ¬CloseC leads to □, the knowledge base entails CloseC.':'Start by negating the query. The empty clause must be the final step, after CloseC has been derived.');if(ok)nextMission(4)}
  if(n===5){const ok=allSelectsCorrect('#folList');feedback('m5',ok,ok?'Correct. The model now has a valid vocabulary.':'One or more roles are incorrect. Remember: a function returns an object; a predicate expresses a property or relation.');if(ok)nextMission(5)}
  if(n===6){const a=document.querySelector('input[name=q61]:checked')?.value;const b=document.querySelector('input[name=q62]:checked')?.value;const ok=a==='a'&&b==='b';feedback('m6',ok,ok?'Correct. Quantifier order captures whether stations may differ or one station must work for everyone.':'Review which object is introduced first. “Some station … every robot” requires ∃y before ∀x.');if(ok)nextMission(6)}
  if(n===7){const explanation=$('#explanation').value.trim();const idea=/same|different|one|each|every|witness|order/i.test(explanation)&&explanation.length>=25;const ok=$('#final1').value==='yes'&&$('#final2').value==='yes'&&$('#final3').value==='north'&&$('#final4').value==='correct'&&idea;feedback('m7',ok,ok?'Excellent. The smart city’s reasoning system has been restored.':'Recheck the North station and the implication-to-CNF conversion. Also explain that changing quantifier order changes whether one shared object or possibly different objects are required.');if(ok)nextMission(7)}
}
function buildCertificate(){const now=new Date();$('#certName').textContent=state.name;$('#certDate').textContent=now.toLocaleString([], {dateStyle:'long',timeStyle:'short'});const seed=(state.name+now.toISOString().slice(0,16)).split('').reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);$('#certCode').textContent='Completion code: SZ-L14-'+seed.toString(16).toUpperCase().padStart(8,'0')}
$('#startBtn').onclick=()=>{const name=$('#studentName').value.trim();if(name.length<2){alert('Please enter your name before beginning.');return}state.name=name;show('review')};
$$('.next').forEach(b=>b.onclick=()=>show(b.dataset.next));$$('.check').forEach(b=>b.onclick=()=>checkMission(Number(b.dataset.check.slice(1))));
$('#resetCnf').onclick=()=>setupDnD('#cnfPool','#cnfAnswer',cnfCards);$('#resetRefutation').onclick=()=>setupDnD('#refutationPool','#refutationAnswer',refCards);
renderQuestions();setupDnD('#cnfPool','#cnfAnswer',cnfCards);setupDnD('#refutationPool','#refutationAnswer',refCards);
