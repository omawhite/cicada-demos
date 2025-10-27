/** biome-ignore-all lint/correctness/useUniqueElementIds: just leave me 
 alone plz */
"use client";
import Script from "next/script";

export default function Showtimes() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Showtimes</h1>

        {/* Load SimpleTix CSS */}
        <link
          href="https://embed.prod.simpletix.com/assets/widget/widget.min.css?t=2024.05.08"
          rel="stylesheet"
        />
        {/* Load SimpleTix script */}
        <Script src="https://embed.prod.simpletix.com/assets/widget/widget.min.js?t=2025.10.09"></Script>

        {/* SimpleTix pin board */}
        <div className="smt-pin-board" id="smt_pinBoard">
          <input
            type="hidden"
            value="5d56123d-da7b-4a8d-88ea-78852d090434"
            id="smt_hdnApplicationId"
          />
          <input type="hidden" value="OLW" id="smt_hdnStoreName" />
          <input type="hidden" value="0" id="smt_openEventPageType" />
          <input type="hidden" value="1" id="smt_isDisplayEventCategory" />
          <input type="hidden" value="" id="smt_selectedEventCategories" />
          <input type="hidden" value="Next50" id="smt_displayStyle" />
          <input type="hidden" value="" id="smt_selectedInternalCategories" />
        </div>
      </div>
    </div>
  );
}
