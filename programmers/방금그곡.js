const diffMin =(s,e)=>{
  const [sh,sm] = s.split(':').map(Number);
  const [eh,em] = e.split(':').map(Number);
  return (eh-sh)*60+ em-sm;
}

const parser = (music)=>{
  music = music.split('');
  for (let i=0; i<music.length; i++){
      if(music[i]=='#'){
          music[i-1]+='#';
      }
  }
  return music.filter((el)=>el!=='#');
}

function solution(m, musicinfos) {
  let result = [];
  
  m = parser(m);  
  musicinfos.forEach((musicinfo,i)=>{
      let [s,e,title,music] = musicinfo.split(',');
      const duration = diffMin(s,e);
      
      let cIdx = 0; // 라디오에서 나오는 노래
      let mIdx = 0; // 찾고자하는 노래
      music = parser(music);            
      const clen = music.length;
      
      for (let i=0; i<duration; i++){            
          if(music[cIdx] !== m[mIdx]) mIdx=0;
          else mIdx++;
          
          if(mIdx===m.length) {
              result.push([title,duration,i])
              break
          };
          
          if(mIdx==0 && music[cIdx] == m[mIdx]) mIdx++;
          
          cIdx = cIdx + 1 >= clen ? 0 : cIdx+1;                 
      }                     
  })
  result.sort((a,b)=> {
      if(a[1]==b[1]) return a[2]-b[2]
      else return b[1]-a[1];
  });
  return result.length ===0 ? "(None)" : result[0][0];