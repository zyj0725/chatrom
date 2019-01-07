
var setChat=(function(){
  var obj = {};
  function setData(id, data){
      //保存某个人的聊天记录
      if(obj[id]==undefined) {
        obj[id] =[];
        obj[id].push(data);
      }
      else
      {
        obj[id].push(data);
      }
  }
  function getData(id){
      let data = obj[id] ? obj[id] : '';
      return data;
  }
  function clearAllData(){
    obj = {};
  }
  function clearData(id){
    obj[id] = {};
  }
  return {
      setData : setData,
      getData : getData,
      clearData: clearData,
      clearAllData : clearAllData
  }
})()
export default setChat;
