import jQuery from "jquery";
import { afterRouteEnter } from "routve";

afterRouteEnter((context, next) => {
  jQuery('[data-toggle="tooltip"], .tooltip').tooltip("hide");
  next();
});

function setTooltip(element, [place, value]) {
  if (value !== jQuery(element).attr("data-original-title")) {
    jQuery(element).attr("data-original-title", value).tooltip({
      title: value,
      placement: place,
      trigger: "hover",
      selector: true,
    });

    if (jQuery(jQuery(element).data("bs.tooltip").tip).hasClass("show")) {
      jQuery(element).tooltip("show");
    }
  }
}

export default function tooltip(element, [place, value]) {
  setTooltip(element, [place, value]);

  return {
    update([place, value]) {
      setTooltip(element, [place, value]);
    },
  };
}
