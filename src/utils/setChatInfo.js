var setChatInfo=(function(){
  var MyChatList = [];
  function setChatInfo(id){
      //保存某个人的聊天记录
      if(MyChatList.indexOf(id)< 0 && MyChatList.indexOf(id) <=1) {
        MyChatList.push(id);

      }
      else if(MyChatList.length ==0)
      {
        MyChatList.push(id);

      }
  }
  function getChatInfo(){
    let data = MyChatList.length !== 0 ? MyChatList : '';
    return data;
  }
  function clearChatInfo(){
    MyChatList = [];
  }
  return {
    setChatInfo : setChatInfo,
    getChatInfo : getChatInfo,
    clearChatInfo: clearChatInfo,
  }
})()
export default setChatInfo;
