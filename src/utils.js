import { emojiMap, emojiUrl } from './emoji'
export default {
    getUrlKey: function (name) {
        return decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    },
    decodeText:function(payload){
    	let renderDom = []
	  	// 文本消息
	    let temp = payload.text
	    let left = -1
	    let right = -1
	    while (temp !== '') {
	      left = temp.indexOf('[')
	      right = temp.indexOf(']')
	      switch (left) {
	        case 0:
	          if (right === -1) {
	            renderDom.push({
	              name: 'text',
	              text: temp
	            })
	            temp = ''
	          } else {
	            let _emoji = temp.slice(0, right + 1)
	            if (emojiMap[_emoji]) {
	              renderDom.push({
	                name: 'img',
	                src: emojiUrl + emojiMap[_emoji]
	              })
	              temp = temp.substring(right + 1)
	            } else {
	              renderDom.push({
	                name: 'text',
	                text: '['
	              })
	              temp = temp.slice(1)
	            }
	          }
	          break
	        case -1:
		      if(temp.indexOf('http://')==0||temp.indexOf('https://')==0){
		      	renderDom.push({
		            name: 'image',
		            text: temp
		        })
		      }else{
		      	renderDom.push({
		            name: 'text',
		            text: temp
		        })
		      }
	          temp = ''
	          break
	        default:
	          renderDom.push({
	            name: 'text',
	            text: temp.slice(0, left)
	          })
	          temp = temp.substring(left)
	          break
	      }
	    }
	  return renderDom
    }
}