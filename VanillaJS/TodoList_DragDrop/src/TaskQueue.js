export default function TaskQueue() {
    const tasks = [];

    //task에 작업 쌓기
    this.addTask = (task) => {
        tasks.push(task);
    }

    //task에 작업이 쌓여있을 때마다 하나씩 꺼내서 실행해주기
    this.run = async () => {
        if (tasks.length > 0) {
            const task = tasks.shift();
            await task();
            this.run();
        }
    }
}
