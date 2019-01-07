
//向后台发送Emoji 字符串
const makeEmoji = function(data) {
  let sholl= [];
  let tp  = data;
  // console.log(tp)
  let starts = tp.indexOf('[');
  let ends = tp.indexOf(']');
  if(starts === -1||ends === -1||data === '[]') {
      return data
  }
  function moon()  {
  if(tp === '') {
          return
      }
      let start = tp.indexOf('[');
      let end = tp.indexOf(']');
  if(start === -1||end === -1) {
    sholl.push(tp);
    return
  }
      if(start !== 0) {
    let y = tp.slice(0, start);
       sholl.push(y);
    tp = tp.slice(start,tp.length);

      } else {
    sholl.push(tp.slice(0, end+1));
    tp = tp.slice(end+1, tp.length);
  }

      if(tp !== '') {
          moon()
      } else {
    return
      }
  }
  moon();
  return sholl
}

export default makeEmoji
