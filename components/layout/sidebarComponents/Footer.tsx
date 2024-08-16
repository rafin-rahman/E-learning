import Image from "next/image";
import { SEO, socials } from "@/lib/company";
import Link from "next/link";

export default function Footer() {
	return (
		<div className={"h-28 bg-white"}>
			{/*divider*/}
			<div
				className={
					"h-0.5 w-full bg-gradient-to-r  from-red-400 via-amber-300 to-red-400 opacity-35"
				}
			></div>
			<div
				className={
					"container flex justify-evenly h-full items-center gap-x-10"
				}
			>
				<div>
					<ul className={"flex gap-4"}>
						<li>
							<div className={"relative h-6 w-6"}>
								<Link href={"#"}>
									<Image
										src={socials.facebook}
										alt={"logo"}
										className={"object-fill"}
										fill
									/>
								</Link>
							</div>
						</li>
						<li>
							<div className={"relative h-6 w-6"}>
								<Link href={"#"}>
									<Image
										src={socials.instagram}
										alt={"logo"}
										className={"object-fill"}
										fill
									/>
								</Link>
							</div>
						</li>
						<li>
							<div className={"relative h-6 w-6"}>
								<Link href={"#"}>
									<Image
										src={socials.linkedin}
										alt={"logo"}
										className={"object-fill"}
										fill
									/>
								</Link>
							</div>
						</li>
						<li>
							<div className={"relative h-6 w-6"}>
								<Link href={"#"}>
									<Image
										src={socials.web}
										alt={"logo"}
										className={"object-fill"}
										fill
									/>
								</Link>
							</div>
						</li>
					</ul>
				</div>
				<div className={"text-muted-foreground"}>
					{" "}
					E-Learning platform coming soon
				</div>
				<div className={"relative h-14 w-14"}>
					<Link href={"#"}>
						<Image
							src={SEO.logo_light_no_text}
							alt={"logo"}
							className={"object-fill"}
							fill
						/>
					</Link>
				</div>
			</div>
		</div>
	);
}
