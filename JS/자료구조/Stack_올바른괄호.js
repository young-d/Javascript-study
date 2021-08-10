function solution(s){
    const stack = [];
    
    for(const bracket of s) {
        if(bracket === '(') stack.push(bracket);
        else {
            if(!stack.length) return false;
            stack.pop();
        }
    }    

    return stack.length ? false : true;
//    return stack.length === 0;
}