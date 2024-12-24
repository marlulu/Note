// 思路：将状态通过键值对方式存储在缓存中
// 订阅的时候添加进去
// 发布的时候遍历使用

class EventEmitter {
    constructor() {
        this.cache = {}
    } 

    // 订阅
    on(name, fn) {
        if(this.cache[name]) {
            // 可以多个事件被订阅
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }

    // 取消订阅
    off(name, fn) {
        const tasks = this.cache[name]
        if (tasks) {
            // 移除订阅的方法或者移除方法回调进行的订阅
            const index = tasks.findIndex(f => f === fn || fn === f.callback)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }

    // 发布
    emit(name, once=false, ...args) {
        if (this.cache[name]) {
            // 创建副本
            const tasks = this.cache[name].slice()
            for (const task of tasks) {
                // 需要传的参
                task(...args)
            }

            if (once) {
                delete this.cache[name]
            }
        }
    }
    
}

const eventBus = new EventEmitter()
const task1 = () => { console.log('task1'); }
const task2 = () => { console.log('task2'); }

eventBus.on('task', task1)
eventBus.on('task', task2)
eventBus.off('task', task1)
setTimeout(() => {
  eventBus.emit('task') // task2
}, 1000)
 