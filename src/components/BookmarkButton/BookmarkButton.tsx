import React from 'react';
import { t } from "i18next";
import { ReactComponent as BookmarkIcon } from "../../assets/icons/BookmarkIcon.svg";
import useMobile from "../../hooks/useMobile";
import {
	initFirebase,
	removeMovieFromWatchList,
	addMovieToWatchList,
} from "../../helpers/firebaseUtils";
import { DbUser, Film } from "../../types/global";
import { useEffect, useState } from "react";

const BookmarkButton = ({
	user,
	cardData,
}: {
	user: DbUser;
	cardData: Film;
}) => {
	const isMobile = useMobile();

	const [inList, setInlist] = useState<boolean>(false);

	const updateInList = (list: Film[], obj: Film) => {
		const movieInList = list.find((m) => m.id === obj.id);
		movieInList?.id === obj.id ? setInlist(true) : setInlist(false);
	};

	useEffect(() => {
		if (user) {
			updateInList(user.watchList, cardData);
		}
	}, [cardData, user]);

	const onClick = async () => {
		if (user) {
			const { db } = await initFirebase();
			const { doc, updateDoc } = await import("firebase/firestore");

			const docRef = doc(db, "users", user.docId);
			const userWatchList = user.watchList;
			let updatedList: Film[] = [];
			inList
				? (updatedList = removeMovieFromWatchList(userWatchList, cardData))
				: (updatedList = addMovieToWatchList(userWatchList, cardData));
			try {
				await updateDoc(docRef, {
					watchList: updatedList,
				});
				updateInList(updatedList, cardData);
			} catch (error) {
				console.log("Error when trying to add movie to watchlist: " + error);
			}
		}
	};

	return (
		<button
      onClick={() => onClick()}
			className={`
						w-7 h-7 absolute top-5 right-2 bg-gray-static rounded-full justify-center items-center z-10 flex group-hover:flex
						${isMobile ? "" : "hidden"}
					`}
			aria-label={t("")}
		>
			<BookmarkIcon
				className={`w-5 h-5`}
				style={inList ? {} : { fill: "transparent" }}
			/>
		</button>
	);
};

export default BookmarkButton;
