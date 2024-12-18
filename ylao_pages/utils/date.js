export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length)
}

export function myTime (date) {
    var arr = date.split('T')
    var d = arr[0]
    var darr = d.split('-')

    var t = arr[1]
    var tarr = t.split('.000')
    var marr = tarr[0].split(':')

    var dd = parseInt(darr[0]) + '/' + parseInt(darr[1]) + '/' + parseInt(darr[2]) + ' ' + parseInt(marr[0]) + ':' + parseInt(marr[1]) + ':' + parseInt(marr[2])
    return dd
}

export function formatDateTime (date) {
    var time = new Date(Date.parse(date))
    time.setTime(time.setHours(time.getHours() + 8))
    var Y = time.getFullYear() + '-'
    var M = addZero(time.getMonth() + 1) + '-'
    var D = addZero(time.getDate()) + ' '
    var h = addZero(time.getHours()) + ':'
    var m = addZero(time.getMinutes()) + ':'
    var s = addZero(time.getSeconds())
    return Y + M + D + ' ' + h + m + s
}

export function formatDateTime2 (date) {
    var time = new Date(date)
    // time.setTime(time.setHours(time.getHours() + 8))
    var Y = time.getFullYear() + '-'
    var M = addZero(time.getMonth() + 1) + '-'
    var D = addZero(time.getDate()) + ' '
    var h = addZero(time.getHours()) + ':'
    var m = addZero(time.getMinutes()) + ':'
    var s = addZero(time.getSeconds())
    return Y + M + D + ' ' + h + m + s
}

// 数字补0操作
function addZero (num) {
    return num < 10 ? '0' + num : num
}

// 计算时间是否超过当前时间
export function isNowTime (date) {
    return new Date().getTime() > new Date(date).getTime()
}

export function countdownTime(end,isShowMin) {
    var nowtime = new Date(),  //获取当前时间
        endtime = new Date(end);  //定义结束时间
    var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数

        leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
        lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
        leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        lefts = Math.floor(lefttime/1000%60);  //计算秒数

    if(lefttime>0){
        if(isShowMin){
            return leftd + "天" + add0(lefth) + "小时"
        }else{
            if(leftd>0){
                return '剩余：' + leftd + "天" + add0(lefth) + ":" + add0(leftm) + ":" + add0(lefts);  //返回倒计时的字符串
            }else{
                return  '剩余：' + add0(lefth) + ":" + add0(leftm) + ":" + add0(lefts);  //返回倒计时的字符串
            }

        }

    }else{
        return '已截止'
    }

}
function add0(m) {

    return m < 10 ? '0' + m : m;

}