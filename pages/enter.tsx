import { auth, firestore, googleAuthProvider } from '@lib/firebase';
import Image from 'next/image';
import googleLogo from '../public/google.png';
import { useContext, useEffect } from 'react';
import { UserContext } from '@lib/context';
import { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

export default function Enter({}) {
	const { user, username } = useContext(UserContext);
	const [error, setError] = useState('');

	// 1. user signed out <SignInButton />
	// 2. user signed in, but missing username <UsernameForm />
	// 3. user signed in, has username <SignOutButton />
	return (
		<main>
			{error && <p className="text-danger">{error}</p>}
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton setError={setError} />
				)
			) : (
				<SignInButton setError={setError} />
			)}
		</main>
	);
}

// Sign in with Google button
function SignInButton({ setError }) {
	const signInWithGoogle = async () => {
		try {
			await auth.signInWithPopup(googleAuthProvider);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<>
			<button className="btn-google" onClick={signInWithGoogle}>
				<Image src={googleLogo} alt="Google Logo" objectFit="fill" />
				<p>Sign in with Google</p>
			</button>
		</>
	);
}

// Sign out button
function SignOutButton({ setError }) {
	const clickHandler = () => {
		try {
			auth.signOut();
		} catch (error) {
			setError(error.message);
		}
	};

	return <button onClick={clickHandler}>Sign Out</button>;
}

function UsernameForm() {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const { user, username } = useContext(UserContext);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const checkUsername = useCallback(
		debounce(async (username: string) => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const { exists } = await ref.get();
				console.log('Firestore read executed!');
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[]
	);

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue, checkUsername]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userDoc = firestore.doc(`users/${user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		const batch = firestore.batch();
		batch.set(userDoc, {
			username: formValue,
			photoURL: user.photoURL,
			displayName: user.displayName,
		});
		batch.set(usernameDoc, { uid: user.uid });

		await batch.commit();
	};

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form onSubmit={onSubmit}>
					<input
						name="username"
						placeholder="Username"
						value={formValue}
						onChange={onChange}
					/>

					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>

					<button type="submit" className="btn-green" disabled={!isValid}>
						Choose
					</button>

					<h3>Debug State</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username Valid: {isValid.toString()}
					</div>
				</form>
			</section>
		)
	);
}

function UsernameMessage({ username, isValid, loading }) {
	if (loading) {
		return <p>Checking...</p>;
	} else if (isValid) {
		return <p className="text-success">{username} is available!</p>;
	} else if (username && !isValid) {
		return <p className="text-danger">That username is taken!</p>;
	} else {
		return <p></p>;
	}
}
