export default function({ store, redirect }) {
    if (store.getters['a/authenticated']) {
        return redirect('/')
    }
}
