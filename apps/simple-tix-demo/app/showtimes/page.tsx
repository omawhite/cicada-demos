/** biome-ignore-all lint/correctness/useUniqueElementIds: just leave me 
 alone plz */
"use client";
export default function Showtimes() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Showtimes</h1>

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

          {/* Container where SimpleTix will inject event listings */}
          <div id="smt_Showlist"></div>
        </div>
      </div>
    </div>
  );
}
