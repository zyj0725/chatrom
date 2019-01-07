import Vue from 'vue';

let scrollBarWidth;
//滚动条
export default function() {
  //如果是浏览器返回0
  if (Vue.prototype.$isServer) return 0;
  //如果浏览器滚动条没有 返回滚动条
  if (scrollBarWidth !== undefined) return scrollBarWidth;
//创建div
  const outer = document.createElement('div');
//div的name
  outer.className = 'el-scrollbar__wrap';
  //默认隐藏
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  //向BODY插入div
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};
