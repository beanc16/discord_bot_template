const donationLink = {
	description: `Enter a link for user's to donate money to you.
				(Displayed when a user runs the donate command.)
		
		Donation Link`
		.split("\t").join(""),      					// Remove tabs.
	required: false,
};



module.exports = donationLink;
