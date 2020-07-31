<template>
    <div>
        <div class="page-title">
            <h3>{{'ProfileTitle' | localize}}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model="name"
                        :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <label for="description">Имя</label>
                <small
                        class="helper-text invalid"
                        v-if="$v.name.$dirty && !$v.name.required"
                >Введите имя</small>
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isUkrLocale">
                    <span class="lever"></span>
                    Українська
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {required} from "vuelidate/lib/validators";

    export default {
        name: "Profile",
        mounted() {
            this.name = this.info.name
            this.isUkrLocale = this.info.locale === 'uk-UA'
            setTimeout(() => {
                M.updateTextFields()
            })
        },
        data: () => ({
            name: '',
            isUkrLocale: true
        }),
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        validations: {
            name: {required}
        },
        methods: {
            ...mapActions(['updateInfo']),

            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    await this.updateInfo({
                        name: this.name,
                        locale: this.isUkrLocale ? 'uk-UA' : 'en-US'
                    })
                } catch (e) {
                }
            }
        },
    }
</script>

<style scoped>
    .switch {
        margin: 2rem 0;
    }
</style>