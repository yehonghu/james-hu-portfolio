/*
 * Titanium Keynote — asset registry.
 * Uses BASE_URL to support deployment under any sub-path (e.g. GitHub Pages).
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const ASSETS = {
  logo: `${base}/manus-storage/avatar_james_b2db7aea.png`,
  heroWorkspace: `${base}/manus-storage/hero_portrait_workspace_0f9072b0.png`,
  bookease: {
    home: `${base}/manus-storage/bookease_home_4fc6460a.png`,
    customer: `${base}/manus-storage/bookease_customer_dashboard_66a366a9.png`,
    availability: `${base}/manus-storage/bookease_provider_availability_fb942c5b.png`,
    admin: `${base}/manus-storage/bookease_admin_dashboard_34e2e24e.png`,
    services: `${base}/manus-storage/bookease_services_2425d254.png`,
  },
  kazan: `${base}/manus-storage/restaurant_web_mockup_eed425f0.png`,
  velvet: `${base}/manus-storage/figma_web_design_586d8f40.png`,
  mapleCafe: `${base}/manus-storage/figma_prototype_maplecafe_c9a55dd4.png`,
  lumen: `${base}/manus-storage/brand_identity_board_3467cd1c.png`,
  wechatQr: `${base}/manus-storage/wechat_qr_67a44488.png`,
  iphone15: `${base}/manus-storage/iphone15pro_home_ca046256.png`,
  ourPlanet: `${base}/manus-storage/ourplanet_home_ec31c366.png`,
  findHouse: `${base}/manus-storage/findhouse_home_00eda56e.png`,
};
