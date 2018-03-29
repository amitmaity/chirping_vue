<template>
    <div id="app">
        <app-header></app-header>
        <app-timeline></app-timeline>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Timeline from './components/Timeline';
    import Header from './components/Header';
    import Footer from './components/Footer';

    export default {
        components: {
            'app-header': Header,
            'app-timeline': Timeline,
            'app-footer': Footer
        },
        data() {
            return {
                msg: 'Keep Chirping'
            }
        }
    }
</script>

<style>
    /*#app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }*/
    .mt-0{
        margin-top: 0!important;
    }
    .mt-3{
        margin-top: 1rem;
    }
    .mt-4{
        margin-top: 1.5rem;
    }
    .mt-5{
        margin-top: 3rem;
    }
</style>
