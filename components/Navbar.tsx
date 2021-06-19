import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Props {}

const Navbar = (props: Props) => {
	const { user, username }: any = {};

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/" passHref>
						<button>FEED</button>
					</Link>
				</li>
				{/* user is signed in and has username */}
				{username && (
					<>
						<li>
							<Link href="/admin" passHref>
								<button className="btn-blue">Write Posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`} passHref>
								<Image src={user?.photoURL} alt={username} />
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
};

export default Navbar;
