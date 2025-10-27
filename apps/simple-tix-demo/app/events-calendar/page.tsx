/** biome-ignore-all lint/correctness/useUniqueElementIds: just leave me 
alone plz */
import Script from "next/script";

export default function EventsCalendar() {
	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-4xl font-bold mb-8 text-center">Events Calendar</h1>

				{/* Content will be added here */}
				<div className="text-center text-gray-500 mt-16">
					<p>Events calendar content coming soon...</p>
				</div>

				{/* Load SimpleTix CSS */}
				<link
					href="https://embed.prod.simpletix.com/assets/widget/widget.min.css?t=2024.05.08"
					rel="stylesheet"
				/>

				{/* Load SimpleTix script */}
				<Script src="https://embed.prod.simpletix.com/assets/widget/widget.min.js?t=2025.10.09"></Script>

				{/* SimpleTix calendar */}
				<div className="smt-Calendar">
					<input
						type="hidden"
						value="5d56123d-da7b-4a8d-88ea-78852d090434"
						id="smt_hdnApplicationId"
					/>
					<input type="hidden" value="OLW" id="smt_hdnStoreName" />
					<div id="smt_CalendarTable"></div>
					<input type="hidden" value="" id="smt_selectedInternalCategories" />
				</div>
			</div>
		</div>
	);
}
