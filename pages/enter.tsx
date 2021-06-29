import { auth, googleAuthProvider } from '@lib/firebase';
import Image from 'next/image';
import googleLogo from '../public/google.png';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Enter({}) {
	const { user, username } = useContext(UserContext);

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing username <UsernameForm />
	// 3. user signed in, has username <SignOutButton />
	return (
		<main>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<SignInButton />
			)}
		</main>
	);
}

// Sign in with Google button
function SignInButton() {
	const signInWithGoogle = async () => {
		await auth.signInWithPopup(googleAuthProvider);
	};

	return (
		<button className="btn-google" onClick={signInWithGoogle}>
			<Image src={googleLogo} alt="Google Logo" objectFit="fill" />
			<p>Sign in with Google</p>
		</button>
	);
}

// Sign out button
function SignOutButton() {
	return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
	return null;
}
