import '@styles/globals.css';
import Navbar from '@components/Navbar';
import { UserContext } from '@lib/context';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@lib/firebase';

function MyApp({ Component, pageProps }) {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState<string>(null);

	useEffect(() => {
		let unsubscribe: () => void;

		if (user) {
			const ref = firestore.collection('users').doc(user.uid);
			unsubscribe = ref.onSnapshot((doc) => {
				setUsername(doc.data()?.username);
			});
		} else {
			setUsername(null);
		}
		return unsubscribe;
	}, [user]);

	return (
		<UserContext.Provider value={{ user, username }}>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</UserContext.Provider>
	);
}

export default MyApp;
