const services=[
{id:'A001',name:'주민등록 발급 안내',category:'민원',agency:'국토교통부',online:'가능',call:'1374'},
{id:'A002',name:'전입신고 안내',category:'민원',agency:'보건복지부',online:'가능',call:'1352'},
{id:'A003',name:'인감증명 안내',category:'민원',agency:'국토교통부',online:'가능',call:'1313'},
{id:'A004',name:'민원접수 안내',category:'민원',agency:'교육부',online:'가능',call:'1341'},
{id:'A005',name:'정부24 이용 안내',category:'민원',agency:'국토교통부',online:'가능',call:'1356'},
{id:'A006',name:'기초연금 안내',category:'복지',agency:'행정안전부',online:'불가',call:'1386'},
{id:'A007',name:'복지급여 안내',category:'복지',agency:'고용노동부',online:'가능',call:'1319'},
{id:'A008',name:'장애인지원 안내',category:'복지',agency:'보건복지부',online:'가능',call:'1337'},
{id:'A009',name:'아동수당 안내',category:'복지',agency:'지자체',online:'가능',call:'1326'},
{id:'A010',name:'지방세 납부 안내',category:'세금',agency:'보건복지부',online:'가능',call:'1357'},
{id:'A011',name:'취득세 안내',category:'세금',agency:'국토교통부',online:'가능',call:'1341'},
{id:'A012',name:'재산세 안내',category:'세금',agency:'지자체',online:'가능',call:'1317'},
{id:'A013',name:'자동차등록 안내',category:'교통',agency:'국토교통부',online:'가능',call:'1399'},
{id:'A014',name:'운전면허 안내',category:'교통',agency:'보건복지부',online:'불가',call:'1357'},
{id:'A015',name:'주정차단속 안내',category:'교통',agency:'국토교통부',online:'가능',call:'1367'},
{id:'A016',name:'재난지원금 안내',category:'재난',agency:'행정안전부',online:'불가',call:'1356'},
{id:'A017',name:'대피소 안내',category:'재난',agency:'국세청',online:'가능',call:'1359'},
{id:'A018',name:'안전신고 안내',category:'재난',agency:'국세청',online:'가능',call:'1357'},
{id:'A019',name:'국민취업지원 안내',category:'일자리',agency:'지자체',online:'가능',call:'1386'},
{id:'A020',name:'구직급여 안내',category:'일자리',agency:'국토교통부',online:'불가',call:'1350'},
{id:'A021',name:'청년일자리 안내',category:'일자리',agency:'지자체',online:'가능',call:'1392'},
{id:'A022',name:'평생교육 안내',category:'교육',agency:'국토교통부',online:'가능',call:'1379'},
{id:'A023',name:'학자금 안내',category:'교육',agency:'지자체',online:'가능',call:'1324'},
{id:'A024',name:'교육비지원 안내',category:'교육',agency:'행정안전부',online:'가능',call:'1368'}];
const searchInput=document.getElementById('searchInput'),categoryFilter=document.getElementById('categoryFilter'),resultCount=document.getElementById('resultCount'),serviceGrid=document.getElementById('serviceGrid'),emptyState=document.getElementById('emptyState');
[...new Set(services.map(x=>x.category))].forEach(category=>{const option=document.createElement('option');option.value=category;option.textContent=category;categoryFilter.appendChild(option)});
function escapeHTML(value){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
function render(){const keyword=searchInput.value.trim().toLocaleLowerCase('ko-KR'),category=categoryFilter.value;const filtered=services.filter(item=>(!keyword||item.name.toLocaleLowerCase('ko-KR').includes(keyword))&&(category==='전체'||item.category===category));resultCount.textContent=`현재 ${filtered.length}건`;emptyState.hidden=filtered.length!==0;serviceGrid.innerHTML=filtered.map(item=>`<article class="service-card"><div class="card-top"><span class="category-badge">${escapeHTML(item.category)}</span><span class="online-badge ${item.online==='가능'?'yes':'no'}">온라인 ${escapeHTML(item.online)}</span></div><h2>${escapeHTML(item.name)}</h2><div class="meta"><div class="meta-row"><span class="meta-key">소관기관</span><span class="meta-value">${escapeHTML(item.agency)}</span></div><div class="meta-row"><span class="meta-key">콜센터</span><span class="callcenter">${escapeHTML(item.call)}</span></div></div></article>`).join('')}
searchInput.addEventListener('input',render);categoryFilter.addEventListener('change',render);render();