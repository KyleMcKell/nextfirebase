import { forwardRef, useContext } from 'react';
import { UserContext } from '../lib/context';
import Link from 'next/link';
import Image from 'next/image';
import defaultPfp from '../public/default-avatar.png';

interface Props {}

function Navbar(props: Props) {
	const { user, username } = useContext(UserContext);
	const imageSrc = user ? user?.photoURL : defaultPfp;

	// eslint-disable-next-line react/display-name
	const UserImage = forwardRef(() => (
		<Image src={imageSrc} alt={username} height="50" width="50" />
	));

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
							<Link href={`/${username}`} passHref>
								<UserImage />
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
