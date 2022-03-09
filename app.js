function getRandom(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

const app=Vue.createApp({
    data(){
        return{
            playerHealth:100,
            monsterHealth:100,
            round:0,
            winner:null,
            battleLog:[]
        }
    },
    computed:{
        monsterHealthStyles(){
            if(this.monsterHealth<0){
                return {width:'0%'}
            }
            return {width:this.monsterHealth+'%'}
        },
        playerHealthStyles(){
            if(this.playerHealth<0){
                return {width:'0%'}
            }
            return {width:this.playerHealth+'%'}

        },
        canUseSpecialAttack(){
            return this.round%3!==0
        }
    },
    watch:{
        playerHealth(value){
            if(value<=0 && this.monsterHealth<=0){
                this.winner="draw"
            } else if(value<=0){
                this.winner="monster"

            }
        },
        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.winner="draw"
            } else if(value<=0){
                this.winner="player"

            }
        }
    },
    methods:{
        attackMonster(){
            this.round++;
            const attack=getRandom(5,10)
            this.monsterHealth-=attack
            this.battleLog.unshift(`<h4 class='log--player'>Player Attacked <span class='log--damage'>-${attack}</span> points</h4>`)
            this.attackPlayer()
        },
        attackPlayer(){
            const attack=getRandom(8,15)
            this.playerHealth-=attack
            this.battleLog.unshift(`<h4 class='log--monster'>Monster Attacked <span class='log--damage'>-${attack}</span> points</h4>`)

        },
        specialAttack(){
            this.round++;
            const attack=getRandom(10,20)
            this.monsterHealth-=attack
            this.battleLog.unshift(`<h4 class='log--player'>Player Special Attacked <span class='log--damage'>-${attack}</span> points</h4>`)
            this.attackPlayer()
        },
        heal(){
            this.round++
            const healAmount=getRandom(10,17)
            this.playerHealth+=healAmount
            this.battleLog.unshift(`<h4 class='log--player'>Player Healed <span class='log--heal'>+${healAmount}</span> points</h4>`)
            if(this.playerHealth>100){this.playerHealth=100}
            this.attackPlayer()

        },
        startNew(){
            this.round=0;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.winner=null;
            this.battleLog=[]
        },
        surrender(){
            this.winner="monster"
        }
    }

})

app.mount("#game")