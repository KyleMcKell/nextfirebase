import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

interface Props {}

function Navbar(props: Props) {
	const { user, username } = useContext(UserContext);

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/" passHref>
						<button className="btn-logo">FEED</button>
					</Link>
				</li>
				{/* user is signed in and has username */}
				{username && (
					<>
						<li className="push-left">
							<Link href="/admin" passHref>
								<button className="btn-blue">Write Posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								{/* <Image src={user?.photoURL} alt={username} / */}
								Hello
							</Link>
						</li>
					</>
				)}
				{/* user is not signed OR has not created username */}
				{!username && (
					<li>
						<Link href="/enter" passHref>
							<button className="btn-blue">Log in</button>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
