
(function (vue) {
	var todoapp = new Vue({
		el: '#todoapp',
		data: {
			mes: "task list",
			todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
			// [
			// 	{ id: 1, title: '吃饭1', done: true },
			// 	{ id: 2, title: '吃饭2', done: false },
			// 	{ id: 3, title: '吃饭3', done: true },
			// 	{ id: 4, title: '吃饭4', done: false },
			// ]
		},
		methods: {

			//添加项目功能
			//获取事件源的value 追加到数组todos中
			handleAddItem(e) {
				const value = e.target.value;
				//确定id， 判断todos 最后一项是否存在存在，lastid+1， 不存在赋值为1
				const { todos } = this;
				const lastItem = todos[todos.length - 1];
				const id = lastItem ? lastItem.id + 1 : 1;

				if (value.trim() != '') {
					const newItem = {
						id: id,         // id:id ，简写成id
						title: value,
						done: false
					}
					todos.push(newItem);

					//清空输入框
					e.target.value = '';
				}

			},

			//删除单个项目
			handleDelItem(index) {
				//接收index 删除一项
				this.todos.splice(index, 1);
			},

			

			//切换所有任务的完成状态 上部选中， 下部跟随全选
			handleAllItem(e) {
				//获取上方的选中状态
				let checked = e.target.checked;
				this.todos.forEach(ele => {
					ele.done = checked;   //这里改变的是done的值，直接影响v-model
				});
			},


			// * 删除所有已完成任务项
			handleDelAllItem() {
				// for循环遍历符合条件删除， 注意索引值的变化， 删除时i--;
				for (let i = 0; i < this.todos.length; i++) {
					if (this.todos[i].done == true) {
						this.todos.splice(i, 1);
						i--;
					}
				}
			}



		},
		computed: {

			//下方全部选中则上方才选中
			getAllStatus() {
				//定义开关
				let allStatus = true;
				this.todos.forEach(ele => {
					if (ele.done === false) {
						allStatus = false;
					}
				})

				return allStatus;
			},


			//显示剩余任务的条数
			getRemaining() {
				let count = 0;
				this.todos.forEach(element => {
					if (element.done === false) {
						count++;
					}
				});
				return count;
			}


		},
		watch: {
			//数据持久化， 把数组todos放到本地存储中国localStorage

			todos: {
				handler(){
				//如果电话以后执行的函数
				window.localStorage.setItem('todos', JSON.stringify(this.todos));
				}, 
				deep: true,
			}

		}

	})
})(Vue)    //这里是大写的Vue 实参