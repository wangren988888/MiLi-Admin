import {
    Cell,
    CellGroup,
    Field,
    Button
} from 'vant'
import {
    mapActions
} from 'vuex'
import { CordovaFileManage } from '@/cordova-plugins'

export default {
    components: {
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            loginForm: {
                userName: 'super_admin',
                password: '1'
            }
        }
    },
    computed: {},
    methods: {
        ...mapActions([
            'handleLogin',
            'getUserInfo'
        ]),
        submit () {
            this.handleLogin(this.loginForm).then(res => {
                this.getUserInfo().then(res => {
                    this.$router.push({
                        name: this.$config.homeName
                    })
                })
            }).catch(error => {
                console.log(error)
            })
        }
    },
    created () {
    },
    mounted () {
    }
}
