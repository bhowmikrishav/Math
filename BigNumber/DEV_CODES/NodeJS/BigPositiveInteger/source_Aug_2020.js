class BigPositiveInteger{
    constructor(s){
        if(s instanceof BigPositiveInteger){
            this.number = `${s.string()}`;
        }else
        {this.number = `${s}`;}
    }

    string(){
        return this.number
    }

    add(s){
        var n;
        if(s instanceof BigPositiveInteger) {
            n = `${s.string()}`
        } else {
            n = `${s}`
        }
        return new BigPositiveInteger(BigPositiveInteger.add(this.string(), n))
    }

    compare(s){
        var n;
        if(s instanceof BigPositiveInteger) {
            n = `${s.string()}`
        } else {
            n = `${s}`
        }
        return BigPositiveInteger.compare(this.string(), n);
    }

    static compare(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        n1 = n1.split('').reverse()
        n2 = n2.split('').reverse()

        if(n1.length > n2.length) {
            return 1;
        }else if(n1.length < n2.length){
            return -1;
        }

        const max = Math.max(n1.length, n2.length)

        for(var i=0; i<max; i++){
            if(Number(n1[i])>Number(n2[i])){
                return 1;
            }
            else if(Number(n1[i])<Number(n2[i])){
                return -1;
            }
        }

        return 0;
    }

    static add(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        n1 = n1.split('').reverse()
        n2 = n2.split('').reverse()

        var carry = [0], res = [];

        const max = Math.max(n1.length, n2.length)
        var i;
        for(i=0; i<max; i++){
            var a10 = (Number(n1[i] || 0) + Number(n2[i] || 0)) + carry[i]
            if(a10>9) {
                carry.push( Number(`${a10}`[0] ))
                res.push( `${a10}`[1] )
            }
            else {
                carry.push( 0 )
                res.push(a10)
            }

        }

        if(carry[i]>0){res.push(carry[i]);}

        return res.reverse().join('').replace(/(0)*/,"")
    }

    static substract(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        const comp = BigPositiveInteger.compare(n1, n2)

        if(comp == 0)return 0;

        n1 = n1.split('').reverse()
        n2 = n2.split('').reverse()

        var carry = [0], res = []
        var i;
        if(comp>0){
            //when n1>n2
            const max = n1.length

            for(i=0; i<max; i++){
                var  u = (Number(n1[i] || 0) - carry[i])
                //console.log('u', u, 'c', carry[i], 'n1', Number(n1[i] || 0), 'n2', Number(n2[i] || 0))
                if(u < Number(n2[i] || 0)){
                    carry.push(1)
                    u+=10 
                }else {
                    carry.push(0)
                }
                
                res.push(u - Number(n2[i] || 0))
            }
            return res.reverse().join('').replace(/(0)*/,"")
        }
        else{
            //when n1<n2
            const max = n2.length

            for(i=0; i<max; i++){
                var  u = (Number(n2[i] || 0) - carry[i])
                //console.log('u', u, 'c', carry[i], 'n1', Number(n1[i] || 0), 'n2', Number(n2[i] || 0))
                if(u < Number(n1[i] || 0)){
                    carry.push(1)
                    u+=10 
                }else {
                    carry.push(0)
                }
                
                res.push(u - Number(n1[i] || 0))
            }
            return "-"+res.reverse().join('')
        }

    }

    static mul_1d(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'number')||( n2 > 10)){
            throw Error("Bad Input")
        }
        n1 = n1.split('').reverse()

        var carry = [0], res = [];
        var i;
        for(i=0; i<n1.length;i++){
            
            const a10 = Number(n1[i] || 0) * n2 + carry[i]

            if(a10 > 9){
                carry.push( Number(`${a10}`[0] ))
                res.push( `${a10}`[1] )
            }else{
                carry.push( 0 )
                res.push(a10)
            }
        }

        if(carry[i]>0){res.push(carry[i]);}

        return res.reverse().join('').replace(/(0)*/,"")
    }

    static mul(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        if(n1.length<n2.length){
            const t = n2; n2 = n1; n1 = t
        }

        n2 = n2.split('').reverse()

        var digs = []

        for(var i=0; i<n2.length; i++){
            const node = BigPositiveInteger.mul_1d(n1, Number(n2[i])) + Array(i+1).join("0")
            digs.push(node)
        }

        var out = "0"

        for(var i=0; i<digs.length; i++){
            out = BigPositiveInteger.add(out, digs[i])
        }

        return out;

    }

    static div_1d(n1, n2){
        if((typeof n1 != 'string')||(typeof n2 != 'number')||( n2 > 10)){
            throw Error("Bad Input")
        }
        n1 += '0'

        var carry = 0, res = [];
        var i;
        for(i=0; i<n1.length;i++){
            carry*=10
            const a10 = Math.floor( ( carry + Number(n1[i] || 0)) / n2)
            carry = (( carry + Number(n1[i] || 0)) % n2)
            res.push(a10)
            console.log(carry, a10)
        }
        //res.pop()
        return res.join('').substr(0,res.length-1).replace(/(0)*/,"");
    }

   //under development................................................................UNSAFE yet
   //honestly I am stuck with this divide thing, feel free to help me
    static div(n1, n2) {
        if((typeof n1 != 'string')||(typeof n2 != 'string')){
            throw Error("Bad Input")
        }

        if(n1.length<n2.length){
            const t = n2; n2 = n1; n1 = t
        }

        n2 = n2.split('').reverse()
        var res = new BigPositiveInteger('0')

        for(var i=0; i<n2.length; i++){
            const d10 = BigPositiveInteger.div_1d(n1, Number(n2[i])) + Array(i+1).join('0')
            console.log(d10)
            res = res.add(d10)
        }

        return res.string()
    }
    //////////////////////////////
}


//tests
//var num = new BigPositiveInteger("1551231239920808234080982309823098234098234098230498230948230999999")

//var sum = num.add(new BigPositiveInteger("1223199823984089238798723987239872398479872987324807203480980928348"))

//console.log(`Sum : ${sum.string()}`)

//console.log(`compare : ${BigPositiveInteger.compare("323", "321")}`)

//console.log(`Sub : ${BigPositiveInteger.substract('1551231239920808234080982309823098234098234098230498230948230999999', '32991329913299132991')}`)

//console.log(`Sub : ${BigPositiveInteger.substract('122319982398408923879872398723987239847987298732480720348098092834898723984798723948732991329913299132991', '15512312399208082340809823098230982340982340982304982309482309999991551231239920808234080982309823098234098234098230498230948230999999')}`)

//console.log(`Sub : ${BigPositiveInteger.substract('1992','1891')}`)
//console.log(`Sum : ${BigPositiveInteger.add("9989","3121")}`)
//console.log(`Mul 1D : ${BigPositiveInteger.mul_1d("123",8)}`)

//console.log(`Mul: ${BigPositiveInteger.mul("999118072308740723409823098409283409823498998230984098230948029384898981","9808723409723097203974090982098023984098230972304972309723407")}`)
//console.log(`Div 1D : ${BigPositiveInteger.div_1d("87120709120928309009998723897230740923049823098230982340972307320847234087",9)}`)


//under development....................................
console.log(`Div : ${BigPositiveInteger.div("1024", "128")}`)
