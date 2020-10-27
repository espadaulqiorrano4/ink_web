export default function({ $auth, redirect }) {
    if ($auth.user) {
        if ($auth.user.roles === 'admin') {
            return redirect('/auth/me')
        } else {
            return redirect('/')
        }

    }
}
