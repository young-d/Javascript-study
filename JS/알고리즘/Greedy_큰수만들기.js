function solution(number, k) {
    let stack = [];
    let count = 0;

    for(const n of number) {
        while(count < k && stack[stack.length - 1] < n) {
            stack.pop();
            count++;
        }
        stack.push(n);
    }

    return stack.join('').substr(0, number.length - k);
}