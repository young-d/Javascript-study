function solution(s){
    const stack = [];
    
    for(const bracket of s) {
        if(bracket === '(') stack.push(bracket);
        else {
            if(stack.length === 0) return false;
            stack.pop();
        }
    }    

    return stack.length === 0;
}