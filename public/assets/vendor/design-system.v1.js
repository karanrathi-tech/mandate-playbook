/* @ds-bundle: {"format":4,"namespace":"AnarockResidentialDesignSystem_019e08","components":[{"name":"Accordion","sourcePath":"components/Accordion/Accordion.jsx"},{"name":"AnarockLogo","sourcePath":"components/AnarockLogo/AnarockLogo.jsx"},{"name":"AppHeader","sourcePath":"components/AppHeader/AppHeader.jsx"},{"name":"Avatar","sourcePath":"components/Avatar/Avatar.jsx"},{"name":"Breadcrumb","sourcePath":"components/Breadcrumb/Breadcrumb.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"Card","sourcePath":"components/Card/Card.jsx"},{"name":"Checkbox","sourcePath":"components/Checkbox/Checkbox.jsx"},{"name":"DateFilter","sourcePath":"components/DateFilter/DateFilter.jsx"},{"name":"DropdownOption","sourcePath":"components/Dropdown/Dropdown.jsx"},{"name":"DropdownPanel","sourcePath":"components/Dropdown/Dropdown.jsx"},{"name":"Dropdown","sourcePath":"components/Dropdown/Dropdown.jsx"},{"name":"FilterChip","sourcePath":"components/FilterChip/FilterChip.jsx"},{"name":"FilterSectionRow","sourcePath":"components/FilterDrawer/FilterDrawer.jsx"},{"name":"FilterDrawer","sourcePath":"components/FilterDrawer/FilterDrawer.jsx"},{"name":"FilterSection","sourcePath":"components/FilterSection/FilterSection.jsx"},{"name":"GlobalFilter","sourcePath":"components/GlobalFilter/GlobalFilter.jsx"},{"name":"GlobalNavBar","sourcePath":"components/GlobalNavBar/GlobalNavBar.jsx"},{"name":"Icon","sourcePath":"components/Icon/Icon.jsx"},{"name":"Input","sourcePath":"components/Input/Input.jsx"},{"name":"KebabMenu","sourcePath":"components/KebabMenu/KebabMenu.jsx"},{"name":"LeadDrawer","sourcePath":"components/LeadDrawer/LeadDrawer.jsx"},{"name":"LeadList","sourcePath":"components/LeadList/LeadList.jsx"},{"name":"List","sourcePath":"components/List/List.jsx"},{"name":"LocalNavBar","sourcePath":"components/LocalNavBar/LocalNavBar.jsx"},{"name":"UploadDropzone","sourcePath":"components/Modal/Modal.jsx"},{"name":"Modal","sourcePath":"components/Modal/Modal.jsx"},{"name":"Pagination","sourcePath":"components/Pagination/Pagination.jsx"},{"name":"ProgressBar","sourcePath":"components/ProgressBar/ProgressBar.jsx"},{"name":"QuickFilters","sourcePath":"components/QuickFilters/QuickFilters.jsx"},{"name":"Radio","sourcePath":"components/Radio/Radio.jsx"},{"name":"ReportList","sourcePath":"components/ReportList/ReportList.jsx"},{"name":"SearchField","sourcePath":"components/SearchField/SearchField.jsx"},{"name":"SelectionBar","sourcePath":"components/SelectionBar/SelectionBar.jsx"},{"name":"SideNav","sourcePath":"components/SideNav/SideNav.jsx"},{"name":"Spinner","sourcePath":"components/Spinner/Spinner.jsx"},{"name":"Star","sourcePath":"components/Star/Star.jsx"},{"name":"Stepper","sourcePath":"components/Stepper/Stepper.jsx"},{"name":"Table","sourcePath":"components/Table/Table.jsx"},{"name":"Tabs","sourcePath":"components/Tabs/Tabs.jsx"},{"name":"Tag","sourcePath":"components/Tag/Tag.jsx"},{"name":"Toast","sourcePath":"components/Toast/Toast.jsx"},{"name":"Toggle","sourcePath":"components/Toggle/Toggle.jsx"},{"name":"Tooltip","sourcePath":"components/Tooltip/Tooltip.jsx"}],"sourceHashes":{"components/Accordion/Accordion.jsx":"774cf8b57345","components/AnarockLogo/AnarockLogo.jsx":"10fc8861eba9","components/AppHeader/AppHeader.jsx":"d69ea86465a6","components/Avatar/Avatar.jsx":"963b5d8f92a2","components/Breadcrumb/Breadcrumb.jsx":"fae13f81d7f4","components/Button/Button.jsx":"63aef9f40086","components/Card/Card.jsx":"efaec2d7752a","components/Checkbox/Checkbox.jsx":"569f019a0962","components/DateFilter/DateFilter.jsx":"5a8f265f8b6f","components/Dropdown/Dropdown.jsx":"42e1277f5757","components/FilterChip/FilterChip.jsx":"7d49e70dafc6","components/FilterDrawer/FilterDrawer.jsx":"2905873396ff","components/FilterSection/FilterSection.jsx":"04e37fbc6735","components/GlobalFilter/GlobalFilter.jsx":"cd8bad3be139","components/GlobalNavBar/GlobalNavBar.jsx":"cde3477f21e2","components/Icon/Icon.jsx":"70a29131ced4","components/Input/Input.jsx":"3bd1dc740b1f","components/KebabMenu/KebabMenu.jsx":"43ce9da492c3","components/LeadDrawer/LeadDrawer.jsx":"1d55b6bba424","components/LeadList/LeadList.jsx":"e9f7ef82b7de","components/List/List.jsx":"f667a4f010bb","components/LocalNavBar/LocalNavBar.jsx":"6c82b5ba7987","components/Modal/Modal.jsx":"7be20941959a","components/Pagination/Pagination.jsx":"95660e8ef1ae","components/ProgressBar/ProgressBar.jsx":"f8f301eec533","components/QuickFilters/QuickFilters.jsx":"7d877a0b1eb3","components/Radio/Radio.jsx":"afe9c6d217b7","components/ReportList/ReportList.jsx":"9366a4a491a3","components/SearchField/SearchField.jsx":"3a074663bfbb","components/SelectionBar/SelectionBar.jsx":"aa8f64fe632f","components/SideNav/SideNav.jsx":"2894469ca118","components/Spinner/Spinner.jsx":"d24d414b9778","components/Star/Star.jsx":"c8676d10c5f6","components/Stepper/Stepper.jsx":"c24d86f3d9b9","components/Table/Table.jsx":"391fefa94f60","components/Tabs/Tabs.jsx":"84c0cf3df090","components/Tag/Tag.jsx":"d3ecf530d908","components/Toast/Toast.jsx":"122339db60b0","components/Toggle/Toggle.jsx":"1f9a2afa44e7","components/Tooltip/Tooltip.jsx":"c36dbe93c2bc","ui_kits/sales-crm/Components.jsx":"dcb17956c27a","ui_kits/sales-crm/Layout.jsx":"7440a1ce0129","ui_kits/sales-crm/Leads.jsx":"bdc6f5dc425f","ui_kits/sales-crm/browser-window.jsx":"2e3bb69bede4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AnarockResidentialDesignSystem_019e08 = window.AnarockResidentialDesignSystem_019e08 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Accordion/Accordion.jsx
try { (() => {
const ACC_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function AccordionItem({
  item,
  open,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid #EDEDED'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    style: {
      width: '100%',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: '16px 4px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: ACC_FONT,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 500,
      color: '#101721'
    }
  }, item.title), item.meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#9FA6B0'
    }
  }, item.meta), /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#6B7785",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none',
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 160ms ease'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows 180ms ease'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 4px 16px',
      fontSize: 13,
      lineHeight: '20px',
      color: '#6B7785'
    }
  }, item.content))));
}
function Accordion({
  items = [],
  multiple,
  defaultOpen = []
}) {
  const [open, setOpen] = React.useState(() => new Set(defaultOpen));
  const toggle = idx => {
    setOpen(prev => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(idx)) next.delete(idx);else next.add(idx);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid #EDEDED',
      fontFamily: ACC_FONT
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: i,
    item: it,
    open: open.has(i),
    onToggle: () => toggle(i)
  })));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Accordion/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/AnarockLogo/AnarockLogo.jsx
try { (() => {
// ANAROCK master brand lockup. All 18 Figma variants (3 colorways × 6 verticals)
// as one parametric component, rendering the real exported SVGs from assets/logos/anarock/.
const ANAROCK_COLORWAYS = ['white', 'black', 'black-purple'];
const ANAROCK_VERTICALS = ['anarock-ai', 'technology', 'retail', 'retail-1', 'retail-new', 'vov'];
function AnarockLogo({
  colorway = 'black-purple',
  vertical = 'anarock-ai',
  height = 32,
  basePath = 'assets/logos/anarock/',
  alt,
  style
}) {
  const cw = ANAROCK_COLORWAYS.indexOf(colorway) === -1 ? 'black-purple' : colorway;
  const v = ANAROCK_VERTICALS.indexOf(vertical) === -1 ? 'anarock-ai' : vertical;
  const label = alt || 'ANAROCK ' + v.replace(/-/g, ' ');
  return React.createElement('img', {
    src: basePath + cw + '-' + v + '.svg',
    alt: label,
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  });
}
AnarockLogo.COLORWAYS = ANAROCK_COLORWAYS;
AnarockLogo.VERTICALS = ANAROCK_VERTICALS;
Object.assign(__ds_scope, { AnarockLogo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/AnarockLogo/AnarockLogo.jsx", error: String((e && e.message) || e) }); }

// components/Avatar/Avatar.jsx
try { (() => {
const AVATAR_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function Avatar({
  initials,
  size = 32,
  color
}) {
  const palette = ['#6161FF', '#1F69FF', '#10AC60', '#DC4276', '#ED754B', '#47C1BF'];
  const bg = color || palette[(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % palette.length];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      color: '#fff',
      fontFamily: AVATAR_FONT,
      fontSize: size * 0.42,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Avatar/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/Breadcrumb/Breadcrumb.jsx
try { (() => {
const CRUMB_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function Breadcrumb({
  items = [],
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      fontFamily: CRUMB_FONT
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    const clickable = !last && (it.href || onNavigate);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      onClick: clickable ? () => onNavigate && onNavigate(it, i) : undefined,
      style: {
        fontSize: 13,
        lineHeight: '18px',
        color: last ? '#101721' : '#6B7785',
        fontWeight: last ? 600 : 500,
        cursor: clickable ? 'pointer' : 'default',
        textDecoration: 'none'
      },
      onMouseEnter: ev => {
        if (clickable) ev.currentTarget.style.color = '#6161FF';
      },
      onMouseLeave: ev => {
        if (clickable) ev.currentTarget.style.color = '#6B7785';
      }
    }, it.label), !last && /*#__PURE__*/React.createElement("svg", {
      width: 14,
      height: 14,
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "#C7CBD1",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M6 4l4 4-4 4"
    })));
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Breadcrumb/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
const BTN_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// State color maps per variant (default / hover / active), from the Figma Buttons frame.
const BTN_VARIANTS = {
  primary: {
    bg: '#6161FF',
    bgHover: '#5656ED',
    bgActive: '#4040BA',
    fg: '#fff',
    border: 'none'
  },
  secondary: {
    bg: '#fff',
    bgHover: '#F7F7F9',
    bgActive: '#EDEDED',
    fg: '#6B7785',
    border: '1px solid #E0E0E0'
  },
  outline: {
    bg: '#fff',
    bgHover: '#E8E8FF',
    bgActive: '#E8E8FF',
    fg: '#6161FF',
    border: '1px solid #6161FF',
    borderActive: '2px solid #6161FF'
  },
  danger: {
    bg: '#BD2900',
    bgHover: '#A62400',
    bgActive: '#8F1F00',
    fg: '#fff',
    border: 'none'
  },
  link: {
    bg: 'transparent',
    bgHover: 'transparent',
    bgActive: 'transparent',
    fg: '#6161FF',
    border: 'none',
    underlineHover: true
  },
  dropdown: {
    bg: '#E8E8FF',
    bgHover: '#DDDDFF',
    bgActive: '#C0C0FF',
    fg: '#6161FF',
    border: 'none'
  }
};
function Spinner({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'inline-block',
      border: '2px solid ' + color,
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'anrk-btn-spin 0.7s linear infinite'
    }
  });
}
function Button({
  children,
  variant = 'primary',
  size = 'lg',
  onClick,
  leading,
  trailing,
  disabled,
  loading,
  full,
  autoWidth,
  dropdown,
  state
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.primary;
  const isDropdown = variant === 'dropdown' || dropdown;
  const sizes = {
    lg: {
      h: 50,
      px: 16,
      fs: 14,
      minW: 140
    },
    md: {
      h: 40,
      px: 16,
      fs: 12,
      minW: 100
    },
    sm: {
      h: 32,
      px: 12,
      fs: 12,
      minW: 80
    }
  }[size] || {
    h: 50,
    px: 16,
    fs: 14,
    minW: 140
  };

  // Standard button width: solid/outline buttons hold a consistent min-width per size
  // (Figma Large = 140px). Link stays text-width; `full` stretches; `autoWidth` opts out.
  const minWidth = variant === 'link' || full || autoWidth ? undefined : sizes.minW;

  // Resolve visual state: explicit `state` prop (for specimens) overrides interaction.
  const st = state || (disabled ? 'disabled' : loading ? 'loading' : press ? 'active' : hover ? 'hover' : 'default');
  const isActive = st === 'active';
  const isHover = st === 'hover';
  const isFocus = st === 'focus';
  const isLoading = st === 'loading';
  let bg = v.bg,
    fg = v.fg,
    border = v.border;
  if (st === 'disabled') {
    bg = '#F3F3F3';
    fg = '#9FA6B0';
    border = '1px solid #E0E0E0';
  } else if (isActive) {
    bg = v.bgActive;
    border = v.borderActive || v.border;
  } else if (isHover) {
    bg = v.bgHover;
  }
  const spinnerSize = size === 'lg' ? 24 : 16;
  const spinnerColor = variant === 'primary' || variant === 'danger' ? '#fff' : '#6161FF';
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled || loading ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      height: sizes.h,
      padding: variant === 'link' ? '0 8px' : '0 ' + sizes.px + 'px',
      fontSize: sizes.fs,
      fontFamily: BTN_FONT,
      fontWeight: 500,
      lineHeight: 1,
      borderRadius: variant === 'dropdown' ? 3 : 4,
      cursor: disabled || loading ? disabled ? 'not-allowed' : 'default' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: full ? '100%' : undefined,
      minWidth: minWidth,
      background: bg,
      color: fg,
      border,
      boxShadow: isFocus ? '0 0 0 2px #6161FF' : 'none',
      textDecoration: variant === 'link' && (isHover || isFocus) ? 'underline' : 'none',
      transition: 'background 120ms ease, border 120ms ease'
    }
  }, isLoading && /*#__PURE__*/React.createElement(Spinner, {
    size: spinnerSize,
    color: spinnerColor
  }), !isLoading && leading, !isLoading && children, !isLoading && trailing, !isLoading && isDropdown && /*#__PURE__*/React.createElement("svg", {
    style: {
      width: 12,
      height: 12,
      flex: 'none'
    },
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  })));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Card/Card.jsx
try { (() => {
const CARD_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function Card({
  children,
  title,
  subtitle,
  action,
  footer,
  padding = 20,
  elevated,
  interactive,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const shadow = elevated ? '0 1px 2px rgba(16,23,33,.06), 0 2px 8px rgba(16,23,33,.08)' : 'none';
  const hoverShadow = interactive && hover ? '0 2px 4px rgba(16,23,33,.08), 0 6px 16px rgba(16,23,33,.10)' : shadow;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: '#fff',
      border: '1px solid #E0E0E0',
      borderRadius: 4,
      boxShadow: hoverShadow,
      overflow: 'hidden',
      fontFamily: CARD_FONT,
      cursor: interactive || onClick ? 'pointer' : 'default',
      transition: 'box-shadow 140ms ease, border-color 140ms ease',
      borderColor: interactive && hover ? '#C0C0FF' : '#E0E0E0',
      ...style
    }
  }, (title || action) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: (typeof padding === 'number' ? padding : 20) + 'px',
      paddingBottom: 0,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '22px',
      color: '#101721'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: '18px',
      color: '#6B7785',
      marginTop: 4
    }
  }, subtitle)), action), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid #EDEDED',
      background: '#F7F7F9'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Card/Card.jsx", error: String((e && e.message) || e) }); }

// components/Checkbox/Checkbox.jsx
try { (() => {
const CB_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const CB_SIZES = {
  sm: 20,
  md: 24,
  lg: 28
};
function Checkbox({
  checked,
  indeterminate,
  onChange,
  label,
  disabled,
  id,
  size = 'md'
}) {
  const px = CB_SIZES[size] || 24;
  const k = px / 24; // Figma base is Medium = 24
  const on = checked || indeterminate;
  const boxBg = disabled ? '#F3F3F3' : on ? '#6161FF' : '#fff';
  const boxBorder = disabled ? '1.2px solid #E0E0E0' : on ? '1.2px solid #6161FF' : '1.2px solid #C3C9CF';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: CB_FONT,
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: px,
      height: px,
      borderRadius: 3.6 * k,
      background: boxBg,
      border: boxBorder,
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      transition: 'background 120ms ease, border 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: !!checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), indeterminate ?
  /*#__PURE__*/
  // Partial bar: 12 × 2.4 at Medium, white, on violet
  React.createElement("span", {
    style: {
      width: 12 * k,
      height: 2.4 * k,
      background: disabled ? '#9FA6B0' : '#fff',
      borderRadius: 4.33 * k
    }
  }) : checked ? /*#__PURE__*/React.createElement("svg", {
    width: px,
    height: px,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: disabled ? '#9FA6B0' : '#fff',
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.2 12.4 L10.4 15.26 L16.8 8.4"
  })) : null), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '18px',
      color: disabled ? '#9FA6B0' : '#101721'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Checkbox/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/DateFilter/DateFilter.jsx
try { (() => {
const DF_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const DF_BORDER = 'rgb(224,224,224)';
const DF_VIOLET = '#6161FF';
const DF_TEXT = 'rgba(16,23,33,0.94)';
const DF_MUTED = '#6B7785';
const DF_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DF_DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DEFAULT_PRESETS = [['Today', 'Yesterday'], ['This week', 'Last Week'], ['This month', 'Last month'], ['This Quarter', 'Last Quarter'], ['This FY', 'Last FY']];
function TabCell({
  label,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      flexGrow: 1,
      height: 54,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      background: '#fff',
      fontFamily: DF_FONT,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '16px',
      border: '1px solid ' + (active ? DF_VIOLET : DF_BORDER),
      borderBottom: (active ? '2px' : '1px') + ' solid ' + (active ? DF_VIOLET : DF_BORDER),
      color: active ? DF_VIOLET : DF_MUTED
    }
  }, label);
}
function PresetChip({
  label,
  selected,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 164,
      height: 48,
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      fontFamily: DF_FONT,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '20px',
      border: '1px solid ' + (selected ? DF_VIOLET : DF_BORDER),
      background: selected ? '#F4F4FF' : hover ? '#F7F7F9' : '#fff',
      color: selected ? DF_VIOLET : DF_TEXT
    }
  }, label);
}
function NavBtn({
  dir,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": dir === -1 ? 'Previous month' : 'Next month',
    style: {
      width: 40,
      height: 40,
      borderRadius: 3,
      boxSizing: 'border-box',
      background: '#fff',
      border: '1px solid ' + DF_BORDER,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "7",
    height: "12",
    viewBox: "0 0 7 12",
    fill: "none",
    style: dir === -1 ? undefined : {
      transform: 'scaleX(-1)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 1L1 6l5 5",
    stroke: "#101721",
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })));
}
function DateCell({
  day,
  disabled,
  selected,
  inRange,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  if (day == null) return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48
    }
  });
  let bg = '#F7F7F9',
    color = DF_TEXT;
  if (disabled) {
    color = '#9FA6B0';
  } else if (selected) {
    bg = DF_VIOLET;
    color = '#fff';
  } else if (inRange) {
    bg = '#E8E8FF';
    color = DF_VIOLET;
  } else if (hover) {
    bg = '#E8E8FF';
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => !disabled && onClick && onClick(day),
    style: {
      width: 48,
      height: 48,
      borderRadius: 3,
      border: 'none',
      boxSizing: 'border-box',
      background: bg,
      color,
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: DF_FONT,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '18px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, day);
}

/**
 * DateFilter — the Anarock duration / date picker (Figma "Type=Calender"). Two tabs:
 * Presets (a 2-column grid of range chips: Today/Yesterday … This FY/Last FY) and Custom
 * (a month calendar with prev/next nav and a Clear / Apply footer). 402px panel with the
 * standard modal shadow. Composed with the DS Button.
 */
function DateFilter({
  tab = 'presets',
  onTabChange,
  presets = DEFAULT_PRESETS,
  selectedPreset,
  onPresetSelect,
  month = 1,
  year = 2023,
  selectedDate,
  onDateSelect,
  minDate,
  onClear,
  onApply,
  width = 402,
  style
}) {
  const [innerTab, setInnerTab] = React.useState(tab);
  const activeTab = onTabChange ? tab : innerTab;
  const setTab = t => {
    if (onTabChange) onTabChange(t);else setInnerTab(t);
  };
  const [view, setView] = React.useState({
    m: month,
    y: year
  });
  const [innerPreset, setInnerPreset] = React.useState(selectedPreset);
  const preset = onPresetSelect ? selectedPreset : innerPreset;
  const pickPreset = p => {
    if (onPresetSelect) onPresetSelect(p);else setInnerPreset(p);
  };
  const [innerDate, setInnerDate] = React.useState(selectedDate || null);
  const date = onDateSelect ? selectedDate : innerDate;
  const pickDate = d => {
    const picked = {
      d,
      m: view.m,
      y: view.y
    };
    if (onDateSelect) onDateSelect(picked);else setInnerDate(picked);
  };
  const shell = {
    width,
    boxSizing: 'border-box',
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0 8px 16px rgba(16,23,33,0.16), 0 0 4px rgba(16,23,33,0.08)',
    fontFamily: DF_FONT,
    overflow: 'hidden',
    ...style
  };
  const tabs = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(TabCell, {
    label: "Presets",
    active: activeTab === 'presets',
    onClick: () => setTab('presets')
  }), /*#__PURE__*/React.createElement(TabCell, {
    label: "Custom",
    active: activeTab === 'custom',
    onClick: () => setTab('custom')
  }));
  if (activeTab === 'presets') {
    return /*#__PURE__*/React.createElement("div", {
      style: shell
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, tabs, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: '30px 26px'
      }
    }, presets.map((row, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }
    }, row.map(p => /*#__PURE__*/React.createElement(PresetChip, {
      key: p,
      label: p,
      selected: preset === p,
      onClick: () => pickPreset(p)
    })))))));
  }

  // Custom calendar
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  const isDisabled = d => minDate && new Date(view.y, view.m, d) < minDate;
  const prev = () => setView(v => ({
    m: v.m === 0 ? 11 : v.m - 1,
    y: v.m === 0 ? v.y - 1 : v.y
  }));
  const next = () => setView(v => ({
    m: v.m === 11 ? 0 : v.m + 1,
    y: v.m === 11 ? v.y + 1 : v.y
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: shell
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, tabs, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '30px 30px 20px',
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: DF_FONT,
      fontWeight: 600,
      fontSize: 22,
      lineHeight: '26px',
      color: '#101721'
    }
  }, DF_MONTHS[view.m], ", ", view.y), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(NavBtn, {
    dir: -1,
    onClick: prev
  }), /*#__PURE__*/React.createElement(NavBtn, {
    dir: 1,
    onClick: next
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 48px)',
      gap: 1,
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, DF_DOW.map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      height: 20,
      textAlign: 'center',
      fontFamily: DF_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '20px',
      color: DF_MUTED
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, rows.map((r, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 48px)',
      gap: 1,
      justifyContent: 'space-between'
    }
  }, r.map((d, ci) => /*#__PURE__*/React.createElement(DateCell, {
    key: ci,
    day: d,
    disabled: d != null && isDisabled(d),
    selected: !!date && date.d === d && date.m === view.m && date.y === view.y,
    onClick: pickDate
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'stretch',
      height: 80,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      boxShadow: '0 -1px 15px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "md",
    autoWidth: true,
    onClick: onClear
  }, "Clear"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "md",
    autoWidth: true,
    onClick: onApply
  }, "Apply"))));
}
Object.assign(__ds_scope, { DateFilter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/DateFilter/DateFilter.jsx", error: String((e && e.message) || e) }); }

// components/Dropdown/Dropdown.jsx
try { (() => {
const DD_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// 20×20 checkbox for multi-selection rows (Figma "Selection" in Options in dropdown).
function DDCheck({
  checked
}) {
  return checked ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 2,
      background: '#6161FF',
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6.2L4.8 9 10 3.5"
  }))) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 2,
      background: '#fff',
      flex: 'none',
      boxShadow: 'inset 0 0 0 1.5px #9FA6B0',
      boxSizing: 'border-box'
    }
  });
}

/**
 * One option row (Figma "Options in dropdown" — Type=Default/State=Default + Hovered).
 * 52px, padding 12px 20px, main 14/18 Regular #101721, hover #F7F7F9, selected violet.
 */
function DropdownOption({
  label,
  description,
  meta,
  selected,
  multi,
  checked,
  disabled,
  onClick,
  hovered // force the hovered visual (for specimens)
}) {
  const [hover, setHover] = React.useState(false);
  const isHover = hovered || hover;
  return /*#__PURE__*/React.createElement("div", {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      minHeight: 52,
      boxSizing: 'border-box',
      padding: '12px 20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: isHover && !disabled ? '#F7F7F9' : '#fff',
      opacity: disabled ? 0.5 : 1,
      fontFamily: DD_FONT,
      transition: 'background 120ms ease'
    }
  }, multi && /*#__PURE__*/React.createElement(DDCheck, {
    checked: checked
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: selected && !multi ? 500 : 400,
      color: selected && !multi ? '#6161FF' : '#101721',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: '18px',
      fontWeight: 400,
      color: '#6B7785'
    }
  }, description)), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: '18px',
      fontWeight: 400,
      color: '#6B7785',
      flex: 'none'
    }
  }, meta), selected && !multi && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "#6161FF",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 7.3L5.6 10.4 11.5 3.8"
  })));
}

/**
 * The open menu panel (Figma "Dropdowns"): white, padding 20px 0, radius 4,
 * shadow 0 8px 16px / 0 0 4px. 6+ items scroll with the 4px gray/dark scrollbar.
 * options: string | { value, label, description, meta, disabled }.
 */
function DropdownPanel({
  options = [],
  value,
  onChange,
  multi,
  width = 300,
  maxVisible = 6,
  emptyText = 'No results found',
  style
}) {
  const values = multi ? Array.isArray(value) ? value : [] : value;
  const scroll = options.length > maxVisible;
  React.useEffect(() => {
    if (document.getElementById('an-dd-scroll-style')) return;
    const el = document.createElement('style');
    el.id = 'an-dd-scroll-style';
    el.textContent = '.an-dd-scroll::-webkit-scrollbar{width:4px}.an-dd-scroll::-webkit-scrollbar-track{background:#E0E0E0}.an-dd-scroll::-webkit-scrollbar-thumb{background:#101721}';
    document.head.appendChild(el);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: scroll ? 'an-dd-scroll' : undefined,
    style: {
      width,
      boxSizing: 'border-box',
      background: '#fff',
      borderRadius: 4,
      padding: '20px 0',
      fontFamily: DD_FONT,
      boxShadow: '0 8px 16px rgba(16,23,33,.16), 0 0 4px rgba(16,23,33,.08)',
      maxHeight: scroll ? 40 + maxVisible * 52 : undefined,
      overflowY: scroll ? 'auto' : undefined,
      scrollbarWidth: scroll ? 'thin' : undefined,
      scrollbarColor: scroll ? '#101721 #E0E0E0' : undefined,
      ...style
    }
  }, options.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 52,
      boxSizing: 'border-box',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      fontSize: 14,
      lineHeight: '18px',
      color: '#101721'
    }
  }, emptyText), options.map((o, i) => {
    const val = o && o.value !== undefined ? o.value : o && o.label !== undefined ? o.label : o;
    const lab = o && o.label !== undefined ? o.label : o;
    const isSel = multi ? values.indexOf(val) !== -1 : val === values;
    return /*#__PURE__*/React.createElement(DropdownOption, {
      key: i,
      label: lab,
      description: o && o.description,
      meta: o && o.meta,
      disabled: o && o.disabled,
      multi: multi,
      checked: isSel,
      selected: isSel,
      hovered: o && o.hovered,
      onClick: () => {
        if (!onChange) return;
        if (multi) {
          onChange(isSel ? values.filter(v => v !== val) : values.concat([val]));
        } else onChange(val);
      }
    });
  }));
}

/**
 * Trigger button + panel. Single-select closes on pick; multi stays open with checkboxes.
 */
function Dropdown({
  label = 'Select',
  options = [],
  value,
  onChange,
  tinted = true,
  multi,
  width,
  maxVisible,
  emptyText
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const close = ev => {
      if (ref.current && !ref.current.contains(ev.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  let display = label;
  if (multi) {
    const n = Array.isArray(value) ? value.length : 0;
    if (n > 0) display = label + ' · ' + n;
  } else {
    const current = options.find(o => (o && o.value !== undefined ? o.value : o && o.label !== undefined ? o.label : o) === value);
    if (current) display = current.label !== undefined ? current.label : current;
  }
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-block',
      fontFamily: DD_FONT
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(!open),
    style: {
      height: 40,
      padding: '0 20px',
      borderRadius: 4,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: DD_FONT,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1,
      background: tinted ? '#E8E8FF' : '#fff',
      color: tinted ? '#6161FF' : '#101721',
      border: tinted ? '1px solid #E8E8FF' : '1px solid #E0E0E0'
    }
  }, display, /*#__PURE__*/React.createElement("svg", {
    style: {
      width: 12,
      height: 12,
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 150ms ease'
    },
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  }))), open && /*#__PURE__*/React.createElement(DropdownPanel, {
    options: options,
    value: value,
    multi: multi,
    width: width,
    maxVisible: maxVisible,
    emptyText: emptyText,
    onChange: v => {
      if (onChange) onChange(v);
      if (!multi) setOpen(false);
    },
    style: {
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      zIndex: 10
    }
  }));
}
Object.assign(__ds_scope, { DropdownOption, DropdownPanel, Dropdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Dropdown/Dropdown.jsx", error: String((e && e.message) || e) }); }

// components/FilterChip/FilterChip.jsx
try { (() => {
const CHIP_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function FilterChip({
  children,
  count,
  selected,
  onClick,
  removable,
  onRemove,
  disabled,
  leading,
  forceHover
}) {
  const [hover, setHover] = React.useState(false);
  const hovering = forceHover || hover;
  let bg = '#fff',
    fg = '#6B7785',
    border = '#E0E0E0';
  if (disabled) {
    bg = '#F7F7F9';
    fg = '#9FA6B0';
    border = '#EDEDED';
  } else if (selected) {
    bg = '#F4F4FF';
    fg = '#6161FF';
    border = '#6161FF';
  } else if (hovering) {
    bg = '#F7F7F9';
    border = '#C0C0FF';
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: 36,
      padding: '0 14px',
      borderRadius: 3,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: '1px solid ' + border,
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: CHIP_FONT,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1,
      transition: 'background 120ms ease, border 120ms ease, color 120ms ease'
    }
  }, leading, /*#__PURE__*/React.createElement("span", null, children), count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: selected ? '#6161FF' : '#101721'
    }
  }, "\xB7 ", count), removable && /*#__PURE__*/React.createElement("span", {
    onClick: ev => {
      ev.stopPropagation();
      onRemove && onRemove();
    },
    style: {
      display: 'inline-flex',
      marginLeft: 2,
      color: 'currentColor'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 12,
    height: 12,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  }))));
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/FilterChip/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/FilterDrawer/FilterDrawer.jsx
try { (() => {
const FD_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// Self-contained footer buttons (no load-order dependency on Button).
function FDBtn({
  children,
  kind,
  onClick,
  width
}) {
  const [hover, setHover] = React.useState(false);
  const map = {
    secondary: {
      bg: hover ? '#F7F7F9' : '#fff',
      fg: '#6161FF',
      border: '1px solid #6161FF'
    },
    primary: {
      bg: hover ? '#5656ED' : '#6161FF',
      fg: '#fff',
      border: 'none'
    }
  }[kind] || {};
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: 40,
      padding: '0 16px',
      borderRadius: 4,
      cursor: 'pointer',
      flex: 'none',
      width,
      fontFamily: FD_FONT,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1,
      background: map.bg,
      color: map.fg,
      border: map.border,
      transition: 'background 120ms ease'
    }
  }, children);
}

/** Applied-filter chip (Figma "Filter Chip") — violet-tint pill with an × to clear. Internal to the drawer; the standalone family is the top-level FilterChip component. */
function AppliedChip({
  label,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 24,
      padding: '0 8px 0 10px',
      borderRadius: 3,
      background: '#E8E8FF',
      color: '#6161FF',
      flex: 'none',
      whiteSpace: 'nowrap',
      fontFamily: FD_FONT,
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1
    }
  }, label, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": 'Remove ' + label,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      color: '#6161FF'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  }))));
}

// A small violet "CTA" link (Figma link button) used in the header + section rows.
function CtaLink({
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function (ev) {
      ev.stopPropagation();
      if (onClick) onClick();
    },
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      color: '#6161FF',
      fontFamily: FD_FONT,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '18px'
    }
  }, label);
}

/**
 * One collapsible filter section (Figma "Filter" — Type=Collapsed / List).
 * 8px radius white card, heading + chevron + optional CTA link (right), violet #7070FF dot
 * when active. Children render below when expanded.
 */
function FilterSectionRow({
  heading,
  active,
  cta,
  onCta,
  defaultOpen,
  open,
  onToggle,
  children
}) {
  const [innerOpen, setInnerOpen] = React.useState(!!defaultOpen);
  const isOpen = open !== undefined ? open : innerOpen;
  const toggle = () => {
    if (onToggle) onToggle(!isOpen);
    if (open === undefined) setInnerOpen(!isOpen);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      alignSelf: 'stretch',
      borderRadius: 8,
      background: '#fff',
      overflow: 'hidden',
      fontFamily: FD_FONT
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      textAlign: 'left',
      padding: 0,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '20px',
      color: '#101721',
      fontFamily: FD_FONT
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    "aria-label": "Toggle",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#101721",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: isOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 150ms ease'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  }))), cta && /*#__PURE__*/React.createElement(CtaLink, {
    label: cta,
    onClick: onCta
  }))), active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 8,
      top: 30,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#7070FF'
    }
  }), isOpen && children != null && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px 24px'
    }
  }, children));
}

/**
 * Right filter drawer (Figma "Left Drawer" frame — opened from "More Filters").
 * 580px: 80px close rail + #F7F7F9 body (header, applied chips, accordion of filter
 * sections), sticky white footer with Reset (+ caret) and a full-width primary CTA.
 */
function FilterDrawer({
  title = 'Right Drawer',
  onClose,
  headerCta,
  onHeaderCta,
  chips = [],
  onRemoveChip,
  sections = [],
  openSection,
  onToggleSection,
  resetLabel = 'Reset',
  ctaLabel = 'Main CTA will Come Here',
  onReset,
  onApply,
  children,
  inline = true,
  width = 580
}) {
  const panel = /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: '100%',
      height: '100%',
      minHeight: 0,
      background: 'transparent',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      fontFamily: FD_FONT
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      flex: 'none',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 40,
      height: 40,
      borderRadius: 4,
      background: '#FFFFFF',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000000',
      boxShadow: '0 0 2px rgba(16,23,33,.08), 0 0 8px rgba(16,23,33,.16)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      background: '#F7F7F9',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-4px 0 4px rgba(16,23,33,.06), -12px 0 24px rgba(16,23,33,.10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 72,
      flex: 'none',
      boxSizing: 'border-box',
      padding: '24px',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '20px',
      color: '#101721'
    }
  }, title), headerCta && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#101721",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  })), /*#__PURE__*/React.createElement(CtaLink, {
    label: headerCta,
    onClick: onHeaderCta
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'auto',
      padding: '16px 24px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, chips.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 4
    }
  }, chips.map((c, i) => {
    const label = typeof c === 'string' ? c : c.label;
    return /*#__PURE__*/React.createElement(AppliedChip, {
      key: i,
      label: label,
      onRemove: onRemoveChip ? () => onRemoveChip(c, i) : undefined
    });
  })), children, sections.map((s, i) => /*#__PURE__*/React.createElement(FilterSectionRow, {
    key: s.id || i,
    heading: s.heading,
    active: s.active,
    cta: s.cta,
    onCta: s.onCta,
    defaultOpen: s.defaultOpen,
    open: openSection !== undefined ? openSection === (s.id || i) : undefined,
    onToggle: onToggleSection ? next => onToggleSection(next ? s.id || i : null) : undefined
  }, s.content))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 82,
      flex: 'none',
      boxSizing: 'border-box',
      background: '#fff',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      boxShadow: '0 0 2px rgba(16,23,33,.08), 0 0 8px rgba(16,23,33,.16)'
    }
  }, /*#__PURE__*/React.createElement(FDBtn, {
    kind: "secondary",
    onClick: onReset
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, resetLabel, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  })))), /*#__PURE__*/React.createElement(FDBtn, {
    kind: "primary",
    onClick: onApply,
    width: '100%'
  }, ctaLabel))));
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(16,23,33,0.45)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%'
    },
    onClick: e => e.stopPropagation()
  }, panel));
}
Object.assign(__ds_scope, { FilterSectionRow, FilterDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/FilterDrawer/FilterDrawer.jsx", error: String((e && e.message) || e) }); }

// components/FilterSection/FilterSection.jsx
try { (() => {
const FS_FONT = '"Graphik", "Inter", system-ui, sans-serif';

/* Internal atoms — exact values from the Figma Filter Section frames.
   Self-contained on purpose (components in this DS don't cross-import). */

function FsHoverable({
  style,
  hoverStyle,
  children,
  onClick,
  title
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: title,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontFamily: FS_FONT,
      boxSizing: 'border-box',
      background: '#fff',
      border: 'none',
      transition: 'background 120ms ease, box-shadow 120ms ease, color 120ms ease',
      ...style,
      ...(h ? hoverStyle : null)
    }
  }, children);
}
function FsCaret({
  color = '#6B7785'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  }));
}

/* Table search — Figma "Type=Table search, State=Default", 300×40. */
function FsSearch({
  placeholder = 'Search lead by name',
  width = 300,
  onChange
}) {
  const [focus, setFocus] = React.useState(false);
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height: 40,
      boxSizing: 'border-box',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      background: '#fff',
      borderRadius: 3,
      boxShadow: 'inset 0 0 0 1px ' + (focus ? '#6161FF' : '#E0E0E0') + (focus ? ', 0 0 0 3px rgba(97,97,255,.16)' : ''),
      transition: 'box-shadow 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#9FA6B0",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "4.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.5 10.5L14 14"
  })), /*#__PURE__*/React.createElement("input", {
    value: v,
    placeholder: placeholder,
    onChange: ev => {
      setV(ev.target.value);
      onChange && onChange(ev.target.value);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: FS_FONT,
      fontSize: 12,
      color: '#101721'
    }
  }));
}

/* Search with left field-picker — Figma "Type=Search with left dropdown", 340×40. */
function FsSearchWithDropdown({
  field = 'Name',
  placeholder = 'Search lead by name',
  width = 340
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height: 40,
      boxSizing: 'border-box',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 3,
      boxShadow: 'inset 0 0 0 1px ' + (focus ? '#6161FF' : '#E0E0E0') + (focus ? ', 0 0 0 3px rgba(97,97,255,.16)' : ''),
      transition: 'box-shadow 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 12px',
      alignSelf: 'stretch',
      borderRight: '1px solid #E0E0E0',
      fontFamily: FS_FONT,
      fontSize: 12,
      color: '#101721',
      flex: 'none',
      cursor: 'pointer'
    }
  }, field, " ", /*#__PURE__*/React.createElement(FsCaret, null)), /*#__PURE__*/React.createElement("input", {
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 12px',
      fontFamily: FS_FONT,
      fontSize: 12,
      color: '#101721'
    }
  }));
}

/* Secondary dropdown button — Figma "Type=Secondary, State=Main, Size=Small". */
function FsSecondaryDropdown({
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    style: {
      height: 40,
      padding: '0 16px',
      gap: 8,
      borderRadius: 3,
      boxShadow: 'inset 0 0 0 1px #E0E0E0',
      color: '#101721',
      fontSize: 12,
      fontWeight: 400
    },
    hoverStyle: {
      background: '#F7F7F9'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement(FsCaret, null));
}

/* Outline gray dropdown — "Wuthoit padding" row buttons, 100×40, hairline #E0E0E0. */
function FsOutlineDropdown({
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    style: {
      height: 40,
      width: 100,
      padding: '0 12px',
      gap: 8,
      justifyContent: 'center',
      borderRadius: 4,
      boxShadow: 'inset 0 0 0 1px #E0E0E0',
      color: '#6B7785',
      fontSize: 12,
      fontWeight: 400
    },
    hoverStyle: {
      background: '#F7F7F9'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement(FsCaret, null));
}

/* Violet-tinted dropdown button — Figma "Type=Dropdown button, State=Main, Size=Small". */
function FsTintedDropdown({
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    style: {
      height: 40,
      padding: '13px 20px',
      gap: 8,
      borderRadius: 3,
      background: '#E8E8FD',
      color: '#6161FF',
      fontSize: 12,
      fontWeight: 500
    },
    hoverStyle: {
      background: '#DCDCFC'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, label), /*#__PURE__*/React.createElement(FsCaret, {
    color: "#6161F6"
  }));
}

/* "More filters" with count badge — Figma Dropwdowns/Unselected, 127×40. */
function FsMoreFilters({
  label = 'More filters',
  count,
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    style: {
      height: 40,
      padding: '13px 20px',
      gap: 6,
      borderRadius: 3,
      boxShadow: 'inset 0 0 0 1px #6161F6',
      color: '#6161FF',
      fontSize: 12,
      fontWeight: 400
    },
    hoverStyle: {
      background: '#F4F4FF'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, label), count != null && count > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 17,
      height: 17,
      borderRadius: 22,
      background: '#6161F6',
      color: '#fff',
      fontSize: 10,
      fontWeight: 500,
      lineHeight: '10px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, count));
}

/* Violet outline "More Filters" button — Figma "Type=Outline button", 100×40. */
function FsOutlineViolet({
  label = 'More Filters',
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    style: {
      height: 40,
      width: 100,
      justifyContent: 'center',
      gap: 6,
      borderRadius: 4,
      boxShadow: 'inset 0 0 0 1px #6161FF',
      color: '#6161FF',
      fontSize: 12,
      fontWeight: 500
    },
    hoverStyle: {
      background: '#E8E8FF'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, label));
}

/* Rectangular chip — Figma "Chips" Type=Rectangular, 129×40. */
function FsChip({
  label,
  selected,
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    style: {
      height: 40,
      padding: '12px 20px',
      justifyContent: 'center',
      borderRadius: 4,
      boxShadow: 'inset 0 0 0 1px ' + (selected ? '#6161FF' : '#E0E0E0'),
      background: selected ? '#F4F4FF' : '#fff',
      color: selected ? '#6161FF' : '#101721',
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '16px'
    },
    hoverStyle: selected ? null : {
      background: '#F7F7F9',
      boxShadow: 'inset 0 0 0 1px #C0C0FF'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap'
    }
  }, label));
}

/* Circular download action — Figma Frame 427319229, 44×44. */
function FsDownload({
  onClick
}) {
  return /*#__PURE__*/React.createElement(FsHoverable, {
    onClick: onClick,
    title: "Download",
    style: {
      width: 44,
      height: 44,
      borderRadius: 22.08,
      justifyContent: 'center',
      boxShadow: 'inset 0 0 0 0.736px #E0E0E0'
    },
    hoverStyle: {
      background: '#F7F7F9'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "18",
    viewBox: "0 0 14 18",
    fill: "none",
    stroke: "#6161FF",
    strokeWidth: "1.3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1v11M3.5 8.5L7 12l3.5-3.5M1 16.5h12"
  })));
}

/* Secondary tabs strip (optional, "Detailed one"). */
function FsTabs({
  tabs,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignSelf: 'stretch',
      flex: 'none'
    }
  }, tabs.map(t => {
    const on = t === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      type: "button",
      onClick: () => onChange && onChange(t),
      style: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '0 16px',
        fontFamily: FS_FONT,
        fontSize: 12,
        fontWeight: 500,
        color: on ? '#6161FF' : '#6B7785',
        boxShadow: on ? 'inset 0 -2px 0 0 #6161FF' : 'none'
      }
    }, t);
  }));
}
function FilterSection({
  variant = 'detailed',
  searchPlaceholder = 'Search lead by name',
  onSearch,
  tabs,
  activeTab,
  onTabChange,
  filters = ['Choose project(14)', 'Agents'],
  moreFiltersCount = 3,
  onMoreFilters,
  actions = ['Date Range', 'Columns'],
  showDownload = true,
  onDownload,
  chips = ['In Followup - 25', 'Site Visit - 12', 'Negotiation - 8', 'Booked - 4'],
  activeChip,
  onChipClick,
  dropdowns = ['Project', 'Status', 'Source', 'Agent'],
  primaryAction,
  onPrimaryAction,
  searchField = 'Name',
  width = '100%'
}) {
  const bar = (pad, justify) => ({
    width,
    height: 64,
    boxSizing: 'border-box',
    background: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 ' + pad + 'px',
    gap: 12,
    justifyContent: justify || 'flex-start',
    fontFamily: FS_FONT
  });
  if (variant === 'with-padding') {
    return /*#__PURE__*/React.createElement("div", {
      style: bar(144, 'space-between')
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        minWidth: 0,
        overflow: 'hidden'
      }
    }, chips.map(c => /*#__PURE__*/React.createElement(FsChip, {
      key: c,
      label: c,
      selected: c === activeChip,
      onClick: () => onChipClick && onChipClick(c)
    })), /*#__PURE__*/React.createElement(FsOutlineViolet, {
      onClick: onMoreFilters
    })), /*#__PURE__*/React.createElement(FsSearchWithDropdown, {
      field: searchField,
      placeholder: searchPlaceholder
    }));
  }
  if (variant === 'without-padding') {
    return /*#__PURE__*/React.createElement("div", {
      style: bar(24, 'space-between')
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        minWidth: 0,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(FsSearch, {
      placeholder: searchPlaceholder,
      onChange: onSearch
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, dropdowns.map(d => /*#__PURE__*/React.createElement(FsOutlineDropdown, {
      key: d,
      label: d
    })), /*#__PURE__*/React.createElement(FsOutlineViolet, {
      onClick: onMoreFilters
    }))), primaryAction && /*#__PURE__*/React.createElement(FsHoverable, {
      onClick: onPrimaryAction,
      style: {
        height: 40,
        padding: '0 20px',
        justifyContent: 'center',
        borderRadius: 4,
        background: '#6161FF',
        color: '#fff',
        fontSize: 12,
        fontWeight: 500
      },
      hoverStyle: {
        background: '#5656ED'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: 'nowrap'
      }
    }, primaryAction)));
  }

  /* detailed (default) */
  return /*#__PURE__*/React.createElement("div", {
    style: bar(24)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flex: 1,
      minWidth: 0,
      alignSelf: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(FsSearch, {
    placeholder: searchPlaceholder,
    onChange: onSearch
  }), tabs && tabs.length > 0 && /*#__PURE__*/React.createElement(FsTabs, {
    tabs: tabs,
    active: activeTab || tabs[0],
    onChange: onTabChange
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(FsSecondaryDropdown, {
    key: f,
    label: f
  })), /*#__PURE__*/React.createElement(FsMoreFilters, {
    count: moreFiltersCount,
    onClick: onMoreFilters
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flex: 'none'
    }
  }, showDownload && /*#__PURE__*/React.createElement(FsDownload, {
    onClick: onDownload
  }), actions.map(a => /*#__PURE__*/React.createElement(FsTintedDropdown, {
    key: a,
    label: a
  }))));
}
Object.assign(__ds_scope, { FilterSection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/FilterSection/FilterSection.jsx", error: String((e && e.message) || e) }); }

// components/GlobalNavBar/GlobalNavBar.jsx
try { (() => {
const GNB_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const GNB_VIOLET = 'rgb(64,64,179)'; // #4040B3 — the global nav bar's own violet
const GNB_INACTIVE = 'rgb(165,165,218)'; // #A5A5DA — inactive tab label

// Real icon geometry extracted from the .fig (node 6336:22304)
const GNB_WAFFLE_PATH = 'M 0 1.01 C 0 0.451 0.443 0 1.01 0 L 2.99 0 C 3.549 0 4 0.443 4 1.01 L 4 2.99 C 4 3.549 3.557 4 2.99 4 L 1.01 4 C 0.451 4 0 3.557 0 2.99 L 0 1.01 Z M 0 7.01 C 0 6.452 0.443 6 1.01 6 L 2.99 6 C 3.548 6 4 6.443 4 7.01 L 4 8.99 C 4 9.549 3.557 10 2.99 10 L 1.01 10 C 0.451 10 0 9.557 0 8.99 L 0 7.01 Z M 6 1.01 C 6 0.452 6.443 0 7.01 0 L 8.99 0 C 9.548 0 10 0.443 10 1.01 L 10 2.99 C 10 3.549 9.557 4 8.99 4 L 7.01 4 C 6.451 4 6 3.557 6 2.99 L 6 1.01 Z M 6 7.01 C 6 6.452 6.443 6 7.01 6 L 8.99 6 C 9.548 6 10 6.443 10 7.01 L 10 8.99 C 10 9.548 9.557 10 8.99 10 L 7.01 10 C 6.452 10 6 9.557 6 8.99 L 6 7.01 Z M 12 1.01 C 12 0.452 12.443 0 13.01 0 L 14.99 0 C 15.548 0 16 0.443 16 1.01 L 16 2.99 C 16 3.549 15.557 4 14.99 4 L 13.01 4 C 12.451 4 12 3.557 12 2.99 L 12 1.01 Z M 12 7.01 C 12 6.452 12.443 6 13.01 6 L 14.99 6 C 15.548 6 16 6.443 16 7.01 L 16 8.99 C 16 9.548 15.557 10 14.99 10 L 13.01 10 C 12.452 10 12 9.557 12 8.99 L 12 7.01 Z M 0 13.01 C 0 12.452 0.443 12 1.01 12 L 2.99 12 C 3.548 12 4 12.443 4 13.01 L 4 14.99 C 4 15.549 3.557 16 2.99 16 L 1.01 16 C 0.451 16 0 15.557 0 14.99 L 0 13.01 Z M 6 13.01 C 6 12.452 6.443 12 7.01 12 L 8.99 12 C 9.548 12 10 12.443 10 13.01 L 10 14.99 C 10 15.548 9.557 16 8.99 16 L 7.01 16 C 6.452 16 6 15.557 6 14.99 L 6 13.01 Z M 12 13.01 C 12 12.452 12.443 12 13.01 12 L 14.99 12 C 15.548 12 16 12.443 16 13.01 L 16 14.99 C 16 15.548 15.557 16 14.99 16 L 13.01 16 C 12.452 16 12 15.557 12 14.99 L 12 13.01 Z';
const GNB_HORN_PATH = 'M 2.28 12.531 C 2.45 12.701 2.652 12.836 2.875 12.928 C 3.097 13.021 3.336 13.068 3.576 13.068 C 3.817 13.068 4.056 13.021 4.278 12.928 C 4.501 12.836 4.703 12.701 4.873 12.531 L 2.28 9.937 C 2.109 10.107 1.974 10.309 1.882 10.532 C 1.79 10.754 1.742 10.993 1.742 11.234 C 1.742 11.475 1.79 11.713 1.882 11.936 C 1.974 12.158 2.109 12.361 2.28 12.531 L 2.28 12.531 Z M 6.769 1.356 L 6.104 2.02 C 5.387 2.737 4.078 3.682 3.165 4.139 L 0.4 5.522 C -0.054 5.749 -0.136 6.232 0.228 6.595 L 8.071 14.438 C 8.436 14.801 8.916 14.725 9.145 14.266 L 10.529 11.501 C 10.982 10.596 11.928 9.283 12.647 8.563 L 13.312 7.897 C 14.066 7.143 14.537 6.15 14.644 5.089 C 14.751 4.027 14.488 2.961 13.898 2.071 C 13.997 1.992 14.078 1.893 14.138 1.782 C 14.197 1.67 14.232 1.548 14.242 1.422 C 14.252 1.296 14.237 1.169 14.196 1.05 C 14.155 0.93 14.09 0.82 14.006 0.727 C 13.921 0.633 13.818 0.558 13.703 0.505 C 13.588 0.453 13.463 0.425 13.337 0.423 C 13.211 0.42 13.085 0.444 12.968 0.492 C 12.851 0.54 12.746 0.611 12.657 0.701 C 12.636 0.724 12.615 0.746 12.597 0.77 C 11.839 0.268 10.95 0 10.041 0 C 9.433 -0.001 8.831 0.119 8.27 0.351 C 7.708 0.584 7.198 0.925 6.769 1.355 L 6.769 1.356 Z';
const GNB_HELP_PATH = 'M 10 0 C 4.48 0 0 4.48 0 10 C 0 15.52 4.48 20 10 20 C 15.52 20 20 15.52 20 10 C 20 4.48 15.52 0 10 0 Z M 11 17 L 9 17 L 9 15 L 11 15 L 11 17 Z M 13.07 9.25 L 12.17 10.17 C 11.45 10.9 11 11.5 11 13 L 9 13 L 9 12.5 C 9 11.4 9.45 10.4 10.17 9.67 L 11.41 8.41 C 11.78 8.05 12 7.55 12 7 C 12 5.9 11.1 5 10 5 C 8.9 5 8 5.9 8 7 L 6 7 C 6 4.79 7.79 3 10 3 C 12.21 3 14 4.79 14 7 C 14 7.88 13.64 8.68 13.07 9.25 Z';

// Tabs / Global Nav Bar (Figma node 6336:22304). Project switcher on the left,
// primary tabs in the middle, notification / help / avatar on the right.
// All geometry transcribed verbatim from the .fig.
function GlobalNavBar({
  project = {
    name: 'Shapoorji Vicinia',
    meta: '14 Projects, 31 teams'
  },
  tabs = [{
    label: 'Overview'
  }, {
    label: 'Leads'
  }, {
    label: 'Reports'
  }, {
    label: 'Genie Activity',
    active: true
  }],
  onTabChange,
  onProjectClick,
  projectOpen = false,
  user = {
    initials: 'PD'
  },
  logoSrc,
  width = '100%',
  style
}) {
  const [hover, setHover] = React.useState(-1);
  const tab = (t, i) => {
    const active = !!t.active;
    const hot = hover === i;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => onTabChange && onTabChange(i, t),
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(-1),
      style: {
        position: 'relative',
        height: 50,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        padding: '18px 12px 16px 12px',
        background: 'transparent',
        cursor: 'pointer',
        border: 'none',
        borderBottom: active ? '2px solid #fff' : '2px solid transparent',
        fontFamily: GNB_FONT,
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: '0.2px',
        whiteSpace: 'nowrap',
        color: active ? '#fff' : hot ? '#fff' : GNB_INACTIVE,
        transition: 'color 120ms ease'
      }
    }, t.label, t.beta && /*#__PURE__*/React.createElement("span", {
      style: {
        borderRadius: 3,
        background: '#fff',
        padding: '0 4px',
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: GNB_FONT,
        fontWeight: 500,
        fontSize: 11,
        lineHeight: '16px',
        letterSpacing: '0.2px',
        color: GNB_VIOLET
      }
    }, "Beta"));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      height: 50,
      boxSizing: 'border-box',
      background: GNB_VIOLET,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 24px',
      fontFamily: GNB_FONT,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
      alignSelf: 'stretch',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      alignSelf: 'stretch',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Apps",
    style: {
      width: 16,
      height: 16,
      filter: 'brightness(0) invert(1)'
    }
  }) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-label": "Apps"
  }, /*#__PURE__*/React.createElement("path", {
    d: GNB_WAFFLE_PATH,
    fill: "#fff",
    fillRule: "nonzero"
  }))), project && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onProjectClick,
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
      background: 'transparent',
      border: 'none',
      cursor: onProjectClick ? 'pointer' : 'default',
      padding: '8px 10px 4px 10px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GNB_FONT,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '14px',
      letterSpacing: '0.2px',
      color: '#fff',
      whiteSpace: 'nowrap'
    }
  }, project.name), project.meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GNB_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '0.2px',
      color: '#fff',
      whiteSpace: 'nowrap'
    }
  }, project.meta)), /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none",
    style: {
      flex: 'none',
      transform: projectOpen ? 'rotate(180deg)' : 'none',
      transition: 'transform 150ms ease'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l4 4 4-4",
    stroke: "#fff",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      flex: 'none'
    }
  }, tabs.map(tab))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 18,
      alignItems: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Notifications",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      width: 22,
      height: 22,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14.667",
    height: "14.668",
    viewBox: "0 0 14.667 14.668",
    fill: "none",
    style: {
      position: 'absolute',
      left: 3.665,
      top: 3.666
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: GNB_HORN_PATH,
    fill: "#fff",
    fillRule: "evenodd"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Help",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      width: 22,
      height: 22,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18.34",
    height: "18.34",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: GNB_HELP_PATH,
    fill: "#fff",
    fillRule: "evenodd"
  }))), user && (user.avatarSrc ? /*#__PURE__*/React.createElement("img", {
    src: user.avatarSrc,
    alt: user.initials || 'User',
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      objectFit: 'cover',
      flex: 'none'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      flex: 'none',
      background: '#fff',
      color: GNB_VIOLET,
      fontFamily: GNB_FONT,
      fontWeight: 600,
      fontSize: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, user.initials || ''))));
}
Object.assign(__ds_scope, { GlobalNavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/GlobalNavBar/GlobalNavBar.jsx", error: String((e && e.message) || e) }); }

// components/Icon/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Icon({
  name,
  size = 16,
  color = 'currentColor',
  stroke = 1.5
}) {
  const s = {
    width: size,
    height: size,
    display: 'inline-block',
    flex: 'none'
  };
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'search':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("circle", {
        cx: "7",
        cy: "7",
        r: "4.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10.5 10.5L14 14"
      }));
    case 'cross':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 4l8 8M12 4l-8 8"
      }));
    case 'down':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 6l4 4 4-4"
      }));
    case 'right':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M6 4l4 4-4 4"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M8 3v10M3 8h10"
      }));
    case 'phone':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M3 4.5C3 9.2 6.8 13 11.5 13a1 1 0 0 0 1-1V10.4a.5.5 0 0 0-.4-.5l-2-.4a.5.5 0 0 0-.5.2L8.7 11A8.5 8.5 0 0 1 5 7.3l1.3-.9a.5.5 0 0 0 .2-.5l-.4-2A.5.5 0 0 0 5.6 3.5H4a1 1 0 0 0-1 1z"
      }));
    case 'mail':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "3.5",
        width: "12",
        height: "9",
        rx: "1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 4.5l5.5 4 5.5-4"
      }));
    case 'home':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 7.5L8 3l5.5 4.5V13a1 1 0 0 1-1 1H10v-4H6v4H3.5a1 1 0 0 1-1-1z"
      }));
    case 'lead':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "6",
        r: "2.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 13a5 5 0 0 1 10 0"
      }));
    case 'chart':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M3 13V3M13 13H3M6 11V7M9 11V5M12 11V9"
      }));
    case 'inbox':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2 9l1.5-5h9L14 9v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 9h3l1 1.5h4L11 9h3"
      }));
    case 'settings':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "8",
        r: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 1v2M8 13v2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M1 8h2M13 8h2M3.5 12.5L5 11M11 5l1.5-1.5"
      }));
    case 'filter':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2 3.5h12L9.5 8.5V13l-3-1.5V8.5z"
      }));
    case 'more':
      return /*#__PURE__*/React.createElement("svg", {
        style: s,
        viewBox: "0 0 16 16",
        fill: color,
        stroke: "none"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "3.5",
        r: "1.4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "8",
        r: "1.4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "12.5",
        r: "1.4"
      }));
    case 'rupee':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M5 4h6M5 7h6M5 4c2.5 0 4 1 4 3s-1.5 3-4 3l5 3"
      }));
    case 'cal':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("rect", {
        x: "2.5",
        y: "3.5",
        width: "11",
        height: "10",
        rx: "1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 6.5h11M5.5 2v3M10.5 2v3"
      }));
    case 'tag':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 8.5l5-5h5v5l-5 5z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "9.5",
        cy: "6.5",
        r: ".75",
        fill: color
      }));
    case 'bell':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6.5 13.5a1.5 1.5 0 0 0 3 0"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M3.5 8.5L6.5 11.5 12.5 5"
      }));
    case 'doc':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 2h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 2v3h3"
      }));
    case 'ext':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M9 3h4v4M13 3l-7 7M11 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3"
      }));
    default:
      return null;
  }
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/Input/Input.jsx
try { (() => {
const INPUT_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function InputDots() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 4,
      alignItems: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#7070FF'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#7070FF'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#7070FF'
    }
  }));
}
function InputInfoIcon() {
  return /*#__PURE__*/React.createElement("svg", {
    style: {
      width: 14,
      height: 14,
      flex: 'none'
    },
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#9FA6B0",
    strokeWidth: "1.3"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 7.4V11M8 4.6h.01",
    strokeLinecap: "round"
  }));
}
function Input({
  label,
  required,
  info,
  placeholder,
  value,
  onChange,
  helpText,
  error,
  disabled,
  loading,
  focused,
  multiline,
  rows = 3,
  leading,
  trailing,
  inputType = 'text'
}) {
  const [focus, setFocus] = React.useState(false);
  const active = !disabled && (focus || focused || loading);
  const hasError = !!error && !disabled;
  const errorText = typeof error === 'string' ? error : null;
  const borderColor = disabled ? '#E0E0E0' : hasError ? '#D32F02' : active ? '#7070FF' : '#E0E0E0';
  const fieldText = {
    fontFamily: INPUT_FONT,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    minWidth: 0,
    flex: 1,
    padding: 0,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '18px',
    color: disabled ? '#9FA6B0' : '#101721'
  };
  const control = multiline ? /*#__PURE__*/React.createElement("textarea", {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...fieldText,
      fontWeight: 400,
      resize: 'none',
      minHeight: 46
    }
  }) : /*#__PURE__*/React.createElement("input", {
    type: inputType,
    value: value,
    onChange: onChange,
    disabled: disabled,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: fieldText
  });
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: INPUT_FONT,
      minWidth: 0
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '18px',
      color: disabled ? '#9FA6B0' : '#101721'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#D32F02'
    }
  }, "*"), info && /*#__PURE__*/React.createElement(InputInfoIcon, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      minHeight: multiline ? 80 : 46,
      boxSizing: 'border-box',
      boxShadow: 'inset 0 0 0 1px ' + borderColor,
      borderRadius: 4,
      padding: '14px 16px',
      display: 'flex',
      alignItems: multiline ? 'stretch' : 'center',
      gap: 8,
      background: disabled ? '#EDEDED' : '#fff',
      transition: 'box-shadow 150ms ease'
    }
  }, leading, control, loading && /*#__PURE__*/React.createElement(InputDots, null), trailing), (errorText || helpText) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: 400,
      color: errorText ? '#D32F02' : '#6B7785'
    }
  }, errorText || helpText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Input/Input.jsx", error: String((e && e.message) || e) }); }

// components/KebabMenu/KebabMenu.jsx
try { (() => {
const KM_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const KM_DARK = '#101721';
const KM_MUTED = '#6B7785';
const KM_RED = '#D32F02';
const KM_VIOLET = '#6161FF';
function KebabGlyph({
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: color
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "3",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "13",
    r: "1.5"
  }));
}

/**
 * KebabMenu — a 3-dot "more" button that opens a dropdown action list (Figma report-row kebab).
 * Options are `{ label, icon?, danger?, disabled?, onSelect }` or `{ divider: true }`. The menu
 * is a white 4px card with the DS shadow, 8px rows, hover #F7F7F9; danger items render in
 * #D32F02. Closes on outside click, Escape, or selection. Right-aligned below the button by
 * default (`align="left"` to flip). Controlled `open`/`onOpenChange` supported; else internal.
 */
function KebabMenu({
  options = [],
  align = 'right',
  buttonSize = 36,
  open,
  onOpenChange,
  menuWidth = 200,
  ariaLabel = 'More'
}) {
  const controlled = open !== undefined;
  const [inner, setInner] = React.useState(false);
  const isOpen = controlled ? open : inner;
  const setOpen = v => {
    if (!controlled) setInner(v);
    onOpenChange && onOpenChange(v);
  };
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    if (!isOpen) return undefined;
    const onDoc = ev => {
      if (rootRef.current && !rootRef.current.contains(ev.target)) setOpen(false);
    };
    const onKey = ev => {
      if (ev.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": ariaLabel,
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    onClick: () => setOpen(!isOpen),
    style: {
      width: buttonSize,
      height: buttonSize,
      borderRadius: buttonSize / 2,
      border: 'none',
      cursor: 'pointer',
      background: isOpen ? '#EDEDED' : 'transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    onMouseEnter: ev => {
      if (!isOpen) ev.currentTarget.style.background = '#F7F7F9';
    },
    onMouseLeave: ev => {
      if (!isOpen) ev.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement(KebabGlyph, {
    color: isOpen ? KM_VIOLET : KM_MUTED
  })), isOpen && /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      position: 'absolute',
      top: buttonSize + 4,
      [align]: 0,
      zIndex: 40,
      width: menuWidth,
      background: '#fff',
      borderRadius: 4,
      border: '1px solid #EDEDED',
      boxShadow: '0 0 4px rgba(16,23,33,.08), 0 8px 16px rgba(16,23,33,.16)',
      padding: '4px 0',
      fontFamily: KM_FONT
    }
  }, options.map((o, i) => {
    if (o.divider) return /*#__PURE__*/React.createElement("div", {
      key: `d${i}`,
      style: {
        height: 1,
        background: '#EDEDED',
        margin: '4px 0'
      }
    });
    const color = o.disabled ? '#C3C9CF' : o.danger ? KM_RED : KM_DARK;
    return /*#__PURE__*/React.createElement("button", {
      key: o.label || i,
      type: "button",
      role: "menuitem",
      disabled: o.disabled,
      onClick: () => {
        if (o.disabled) return;
        setOpen(false);
        o.onSelect && o.onSelect();
      },
      style: {
        width: '100%',
        border: 'none',
        background: 'transparent',
        cursor: o.disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px',
        textAlign: 'left',
        fontFamily: KM_FONT,
        fontWeight: 500,
        fontSize: 13,
        lineHeight: '18px',
        color
      },
      onMouseEnter: ev => {
        if (!o.disabled) ev.currentTarget.style.background = '#F7F7F9';
      },
      onMouseLeave: ev => {
        ev.currentTarget.style.background = 'transparent';
      }
    }, o.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        flex: 'none',
        color: o.danger ? KM_RED : KM_MUTED
      }
    }, o.icon), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, o.label));
  })));
}
Object.assign(__ds_scope, { KebabMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/KebabMenu/KebabMenu.jsx", error: String((e && e.message) || e) }); }

// components/List/List.jsx
try { (() => {
const LIST_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function List({
  items = [],
  onItemClick,
  selectedId,
  idKey = 'id',
  divided = true
}) {
  const [hoverKey, setHoverKey] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid #E0E0E0',
      borderRadius: 4,
      overflow: 'hidden',
      fontFamily: LIST_FONT
    }
  }, items.map((it, i) => {
    const key = it[idKey] != null ? it[idKey] : i;
    const selected = selectedId != null && it[idKey] === selectedId;
    const hovered = hoverKey === key;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      onClick: onItemClick ? () => onItemClick(it) : undefined,
      onMouseEnter: () => setHoverKey(key),
      onMouseLeave: () => setHoverKey(null),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        borderBottom: divided && i < items.length - 1 ? '1px solid #EDEDED' : 'none',
        background: selected ? '#F4F4FF' : hovered ? '#F7F7F9' : '#fff',
        cursor: onItemClick ? 'pointer' : 'default',
        borderLeft: selected ? '3px solid #6161FF' : '3px solid transparent',
        paddingLeft: selected ? 13 : 16,
        transition: 'background 120ms ease'
      }
    }, it.leading, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 500,
        color: '#101721',
        lineHeight: '18px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, it.title), it.meta && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: '#6B7785',
        lineHeight: '16px',
        marginTop: 2
      }
    }, it.meta)), it.trailing && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 'none',
        color: '#6B7785',
        fontSize: 13
      }
    }, it.trailing));
  }));
}
Object.assign(__ds_scope, { List });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/List/List.jsx", error: String((e && e.message) || e) }); }

// components/LocalNavBar/LocalNavBar.jsx
try { (() => {
const LNB_FONT = '"Graphik", "Inter", system-ui, sans-serif';

/* Secondary tab — Figma "Secondary tabs": 50px tall, padding 19px 20px,
   12/12 Graphik Medium, +0.2px tracking, maxWidth 144.
   Active: violet text + 1px violet top/left/right border + 2px bottom. */
function LnbTab({
  label,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      height: 50,
      maxWidth: 144,
      boxSizing: 'border-box',
      padding: '19px 20px',
      background: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: LNB_FONT,
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '12px',
      letterSpacing: '0.2px',
      whiteSpace: 'nowrap',
      color: active ? '#6161FF' : hover ? '#101721' : '#6B7785',
      border: 'none',
      boxShadow: active ? 'inset 0 -2px 0 #6161FF' : 'none',
      transition: 'color 120ms ease, box-shadow 120ms ease'
    }
  }, label);
}

/* Right-side secondary dropdown button (Figma Buttons Type=Secondary, 100×40). */
function LnbAction({
  label,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: 40,
      minWidth: 100,
      boxSizing: 'border-box',
      padding: '0 16px',
      borderRadius: 3,
      border: 'none',
      cursor: 'pointer',
      background: hover ? '#F7F7F9' : '#fff',
      boxShadow: 'inset 0 0 0 1px #E0E0E0',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: LNB_FONT,
      fontWeight: 400,
      fontSize: 12,
      color: '#101721',
      whiteSpace: 'nowrap',
      transition: 'background 120ms ease'
    }
  }, label, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#6B7785",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  })));
}
function LocalNavBar({
  tabs = ['Tab A', 'Tab B', 'Tab C', 'Tab D', 'Tab E', 'Tab F'],
  active,
  defaultActive,
  onChange,
  action,
  onAction,
  width = '100%'
}) {
  const controlled = active !== undefined;
  const [inner, setInner] = React.useState(defaultActive ?? (tabs[0] && (tabs[0].id ?? tabs[0])));
  const current = controlled ? active : inner;
  const pick = id => {
    if (!controlled) setInner(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height: 50,
      boxSizing: 'border-box',
      background: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      fontFamily: LNB_FONT
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      minWidth: 0,
      overflow: 'hidden'
    }
  }, tabs.map(t => {
    const id = t.id ?? t;
    const label = t.label ?? t;
    return /*#__PURE__*/React.createElement(LnbTab, {
      key: id,
      label: label,
      active: id === current,
      onClick: () => pick(id)
    });
  })), action && /*#__PURE__*/React.createElement(LnbAction, {
    label: action,
    onClick: onAction
  }));
}
Object.assign(__ds_scope, { LocalNavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LocalNavBar/LocalNavBar.jsx", error: String((e && e.message) || e) }); }

// components/AppHeader/AppHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * AppHeader — the full Anarock navigation stack, composed from the three bars:
 *   1. GlobalNavBar  (50px, deep violet)
 *   2. LocalNavBar   (50px, white secondary tabs) — optional
 *   3. FilterSection (64px, white quick filters)  — optional
 * A 1px #E0E0E0 hairline separates the white layers.
 */
function AppHeader({
  nav = {},
  localNav,
  filters,
  width = '100%'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.GlobalNavBar, _extends({
    width: "100%"
  }, nav)), localNav && /*#__PURE__*/React.createElement("div", {
    style: {
      boxShadow: 'inset 0 -1px 0 #E0E0E0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.LocalNavBar, _extends({
    width: "100%"
  }, localNav))), filters && /*#__PURE__*/React.createElement("div", {
    style: {
      boxShadow: 'inset 0 -1px 0 #E0E0E0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.FilterSection, _extends({
    width: "100%"
  }, filters))));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/AppHeader/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/Modal/Modal.jsx
try { (() => {
const MODAL_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// Self-contained footer button so Modal has no load-order dependency on Button.
function ModalBtn({
  children,
  kind,
  onClick,
  grow,
  width
}) {
  const [hover, setHover] = React.useState(false);
  const map = {
    secondary: {
      bg: hover ? '#F7F7F9' : '#fff',
      fg: '#6B7785',
      border: '1px solid #E0E0E0'
    },
    primary: {
      bg: hover ? '#5656ED' : '#6161FF',
      fg: '#fff',
      border: 'none'
    },
    danger: {
      bg: hover ? '#A62400' : '#BD2900',
      fg: '#fff',
      border: 'none'
    }
  }[kind] || {};
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      height: 50,
      padding: '0 16px',
      borderRadius: 4,
      cursor: 'pointer',
      flex: grow ? 1 : 'none',
      width: width || undefined,
      minWidth: grow ? 0 : width || 140,
      fontFamily: MODAL_FONT,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1,
      background: map.bg,
      color: map.fg,
      border: map.border,
      transition: 'background 120ms ease'
    }
  }, children);
}

/**
 * Upload dropzone body (Figma "Size=Small, Type=Upload Document").
 * Cloud glyph + "Drag & drop file here to upload" + "or" + Browse File primary.
 */
function UploadDropzone({
  hint = 'Drag & drop file here to upload',
  orText = 'or',
  buttonLabel = 'Browse File',
  onBrowse
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: MODAL_FONT,
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "50",
    height: "34",
    viewBox: "0 0 50 34",
    fill: "#E0E0E0",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40.2 12.6C38.9 5.4 32.6 0 25 0 18.9 0 13.6 3.5 11.1 8.7 4.8 9.4 0 14.7 0 21.1 0 27.9 5.6 33.4 12.4 33.4h26.8c5.7 0 10.3-4.6 10.3-10.3 0-5.4-4.2-9.9-9.3-10.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 12l6.2 6.6h-3.9v8.9h-4.6v-8.9h-3.9L25 12z",
    fill: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 17,
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: 400,
      color: '#1F314A'
    }
  }, hint), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: '18px',
      fontWeight: 400,
      color: '#9FA6B0'
    }
  }, orText), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(ModalBtn, {
    kind: "primary",
    width: 148,
    onClick: onBrowse
  }, buttonLabel)));
}
function Modal({
  title,
  subtitle,
  size = 'small',
  children,
  onClose,
  primaryLabel = 'Confirm',
  secondaryLabel = 'Cancel',
  onPrimary,
  onSecondary,
  danger,
  footer,
  hideFooter,
  inline = true,
  rail,
  railTitle,
  backLabel,
  onBack,
  contentTint,
  bodyStyle
}) {
  const width = {
    small: 360,
    medium: 820,
    large: 1300
  }[size] || 360;
  const small = size === 'small';
  // Small modals: 24px paddings. Medium: 50px content gutters. Large: 40px.
  const gutter = small ? 24 : size === 'medium' ? 50 : 40;
  const stickyShadow = '0 0 2px rgba(16,23,33,.08), 0 0 8px rgba(16,23,33,.16)';
  const header = /*#__PURE__*/React.createElement("div", {
    style: {
      padding: small ? '24px 24px' : `24px ${gutter}px`,
      background: '#fff',
      boxShadow: small ? 'none' : stickyShadow,
      position: 'relative',
      zIndex: 1,
      flex: 'none',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MODAL_FONT,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '20px',
      color: '#101721'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MODAL_FONT,
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '16px',
      color: '#6B7785'
    }
  }, subtitle)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      flex: 'none',
      width: 20,
      height: 20,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#101721'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  }))));
  const defaultFooter = backLabel ?
  /*#__PURE__*/
  // Medium/Large "Bottom Nav": Back left, actions right, sticky bar.
  React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ModalBtn, {
    kind: "secondary",
    width: 140,
    onClick: onBack || onClose
  }, backLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(ModalBtn, {
    kind: danger ? 'danger' : 'primary',
    width: 140,
    onClick: onPrimary
  }, primaryLabel)) :
  /*#__PURE__*/
  // Small: Cancel + primary split the full width (flexGrow 1, gap 16).
  React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ModalBtn, {
    kind: "secondary",
    grow: small,
    onClick: onSecondary || onClose
  }, secondaryLabel), /*#__PURE__*/React.createElement(ModalBtn, {
    kind: danger ? 'danger' : 'primary',
    grow: small,
    onClick: onPrimary
  }, primaryLabel));
  const footerBar = hideFooter ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      background: '#fff',
      padding: small ? '0 24px 24px' : `16px ${gutter}px`,
      boxShadow: small ? 'none' : stickyShadow,
      justifyContent: small ? 'stretch' : 'flex-end',
      position: 'relative',
      zIndex: 1
    }
  }, footer !== undefined ? footer : defaultFooter);
  const main = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, header, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: small ? '0 24px 24px' : `28px ${gutter}px`,
      background: contentTint ? '#F7F7F9' : '#fff',
      fontFamily: MODAL_FONT,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '18px',
      color: '#1F314A',
      ...bodyStyle
    }
  }, children), footerBar);
  const panel = /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: '100%',
      background: '#fff',
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: '0 0 4px rgba(16,23,33,.08), 0 8px 16px rgba(16,23,33,.16)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      fontFamily: MODAL_FONT
    }
  }, (rail || railTitle) && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 250,
      flex: 'none',
      background: '#F7F7F9',
      padding: 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 30,
      boxSizing: 'border-box'
    }
  }, railTitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: MODAL_FONT,
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '20px',
      color: '#101721'
    }
  }, railTitle), rail), main);
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(16,23,33,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation()
  }, panel));
}
Object.assign(__ds_scope, { UploadDropzone, Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Modal/Modal.jsx", error: String((e && e.message) || e) }); }

// components/Pagination/Pagination.jsx
try { (() => {
const PAG_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function Arrow({
  dir,
  disabled,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": dir === 'prev' ? 'Previous' : 'Next',
    style: {
      width: 32,
      height: 32,
      borderRadius: 3,
      flex: 'none',
      border: '1px solid ' + (disabled ? '#EDEDED' : hover ? '#C0C0FF' : '#E0E0E0'),
      background: disabled ? '#F7F7F9' : '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: disabled ? '#C7CBD1' : '#6B7785'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 14,
    height: 14,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: dir === 'prev' ? 'rotate(180deg)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 4l4 4-4 4"
  })));
}
function pageList(page, total) {
  // 1-indexed. Returns numbers with '…' gaps.
  const out = [];
  const push = x => out.push(x);
  if (total <= 7) {
    for (let i = 1; i <= total; i++) push(i);
    return out;
  }
  push(1);
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) push('…');
  for (let i = start; i <= end; i++) push(i);
  if (end < total - 1) push('…');
  push(total);
  return out;
}
function Pagination({
  page = 1,
  pageSize = 10,
  totalItems,
  totalPages,
  onChange,
  label = 'items',
  showNumbers = true
}) {
  const total = totalPages != null ? totalPages : Math.max(1, Math.ceil((totalItems || 0) / pageSize));
  const go = p => {
    if (p >= 1 && p <= total && p !== page && onChange) onChange(p);
  };
  const from = totalItems != null ? (page - 1) * pageSize + 1 : null;
  const to = totalItems != null ? Math.min(page * pageSize, totalItems) : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      fontFamily: PAG_FONT
    }
  }, totalItems != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7785'
    }
  }, "Showing ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#101721',
      fontWeight: 600
    }
  }, from, "-", to), " of ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#101721',
      fontWeight: 600
    }
  }, totalItems.toLocaleString('en-IN')), " ", label), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: "prev",
    disabled: page <= 1,
    onClick: () => go(page - 1)
  }), showNumbers && pageList(page, total).map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: 'g' + i,
    style: {
      width: 20,
      textAlign: 'center',
      color: '#9FA6B0',
      fontSize: 13
    }
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    type: "button",
    onClick: () => go(p),
    style: {
      minWidth: 32,
      height: 32,
      padding: '0 6px',
      borderRadius: 3,
      cursor: 'pointer',
      fontFamily: PAG_FONT,
      border: '1px solid ' + (p === page ? '#6161FF' : '#E0E0E0'),
      background: p === page ? '#6161FF' : '#fff',
      color: p === page ? '#fff' : '#6B7785',
      fontSize: 13,
      fontWeight: p === page ? 600 : 500
    }
  }, p)), /*#__PURE__*/React.createElement(Arrow, {
    dir: "next",
    disabled: page >= total,
    onClick: () => go(page + 1)
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Pagination/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/ProgressBar/ProgressBar.jsx
try { (() => {
const PROG_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const PROG_TONES = {
  violet: '#6161FF',
  emerald: '#10AC60',
  yellow: '#F3AA07',
  red: '#D32F02',
  blue: '#1F69FF'
};
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'violet',
  height = 8,
  showLabel,
  label,
  rounded = true
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const color = PROG_TONES[tone] || PROG_TONES.violet;
  const r = rounded ? 999 : 2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: PROG_FONT,
      width: '100%'
    }
  }, (showLabel || label) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#6B7785'
    }
  }, label), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: '#101721',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: '#EDEDED',
      borderRadius: r,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      background: color,
      borderRadius: r,
      transition: 'width 240ms ease'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ProgressBar/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/QuickFilters/QuickFilters.jsx
try { (() => {
const QF_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const QF_SHADOW = '0 0 8px rgba(16,23,33,0.16), 0 0 2px rgba(16,23,33,0.08)';

/** A single circular quick-filter chip with default / hover / selected states. */
function QuickChip({
  label,
  selected,
  onClick,
  width
}) {
  const [hover, setHover] = React.useState(false);
  let bg = '#fff',
    color = '#101721';
  if (selected) {
    bg = '#6161FF';
    color = '#fff';
  } else if (hover) {
    bg = '#E8E8FF';
    color = '#6161FF';
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width,
      height: 40,
      boxSizing: 'border-box',
      flexShrink: 0,
      borderRadius: 20,
      border: 'none',
      background: bg,
      color,
      boxShadow: QF_SHADOW,
      cursor: 'pointer',
      display: 'inline-flex',
      flexDirection: 'row',
      gap: 10,
      padding: '12px 20px',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: QF_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      whiteSpace: 'nowrap',
      transition: 'background 120ms ease, color 120ms ease'
    }
  }, label);
}

/**
 * QuickFilters — Anarock "Quick Filters" bar (Figma node 6866:25439). A leading label
 * ("Lead Current Owners:") followed by a horizontally-scrolling row of circular pill chips.
 * Each chip has default (white + soft shadow), hover (#E8E8FF tint) and selected (violet
 * #6161FF fill, white text) states. Multi-select by default. Sits under the nav as a compact
 * "quick filter" filter-section type.
 */
function QuickFilters({
  label = 'Lead Current Owners:',
  chips = [],
  value,
  defaultValue = [],
  onChange,
  multi = true,
  chipWidth,
  width = '100%',
  style
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const selected = controlled ? value : inner;
  const norm = chips.map(c => typeof c === 'string' ? {
    id: c,
    label: c
  } : c);
  const toggle = id => {
    let next;
    if (multi) {
      next = selected.indexOf(id) !== -1 ? selected.filter(x => x !== id) : selected.concat([id]);
    } else {
      next = selected.indexOf(id) !== -1 ? [] : [id];
    }
    if (!controlled) setInner(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      boxSizing: 'border-box',
      background: '#F0F1F5',
      height: 72,
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
      padding: 16,
      alignItems: 'center',
      fontFamily: QF_FONT,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      fontFamily: QF_FONT,
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '16px',
      color: '#101721'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      overflowX: 'auto',
      flex: 1,
      minWidth: 0
    }
  }, norm.map(c => /*#__PURE__*/React.createElement(QuickChip, {
    key: c.id,
    label: c.label,
    width: chipWidth,
    selected: selected.indexOf(c.id) !== -1,
    onClick: () => toggle(c.id)
  }))));
}
Object.assign(__ds_scope, { QuickFilters });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/QuickFilters/QuickFilters.jsx", error: String((e && e.message) || e) }); }

// components/Radio/Radio.jsx
try { (() => {
const RADIO_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const RADIO_SIZES = {
  sm: 20,
  md: 24,
  lg: 28
};
function Radio({
  checked,
  onChange,
  label,
  disabled,
  name,
  value,
  id,
  size = 'md'
}) {
  const px = RADIO_SIZES[size] || 24;
  const k = px / 24; // Figma base is Medium = 24
  const border = disabled ? '1.2px solid #E0E0E0' : checked ? 2.4 * k + 'px solid #6161FF' : '1.2px solid #C3C9CF';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: RADIO_FONT,
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: px,
      height: px,
      borderRadius: '50%',
      background: disabled ? '#F3F3F3' : '#fff',
      border,
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      transition: 'border 120ms ease'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "radio",
    name: name,
    value: value,
    checked: !!checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9.6 * k,
      height: 9.6 * k,
      borderRadius: '50%',
      background: disabled ? '#9FA6B0' : '#6161FF'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '18px',
      color: disabled ? '#9FA6B0' : '#101721'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Radio/Radio.jsx", error: String((e && e.message) || e) }); }

// components/SearchField/SearchField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SEARCH_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function SearchSelect({
  options = [],
  value,
  onChange,
  side,
  disabled
}) {
  const [v, setV] = React.useState(value ?? (options[0] && (options[0].value ?? options[0])));
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const ref = React.useRef(null);
  const cur = value !== undefined ? value : v;
  const set = nv => {
    if (value === undefined) setV(nv);
    onChange && onChange(nv);
  };
  const curLabel = (() => {
    const o = options.find(x => (x.value ?? x) === cur);
    return o ? o.label ?? o : cur;
  })();
  const border = side === 'leading' ? {
    borderRight: '1px solid #E0E0E0',
    marginRight: 2
  } : {
    borderLeft: '1px solid #E0E0E0',
    marginLeft: 2
  };
  const toggle = () => {
    if (disabled) return;
    const r = ref.current && ref.current.getBoundingClientRect();
    // Open the DS dropdown panel directly under the trigger, matching its width.
    if (r) setPos({
      left: r.left,
      top: r.bottom + 4,
      width: r.width
    });
    setOpen(o => !o);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative',
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      alignSelf: 'stretch',
      ...border
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggle,
    disabled: disabled,
    style: {
      appearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: SEARCH_FONT,
      fontSize: 13,
      fontWeight: 500,
      color: '#101721',
      height: '100%',
      padding: side === 'leading' ? '0 8px 0 4px' : '0 8px 0 8px',
      whiteSpace: 'nowrap'
    }
  }, curLabel, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#6B7785",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: open ? 'rotate(180deg)' : 'none',
      transition: 'transform 150ms ease',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  }))), open && pos && React.createElement(React.Fragment, null, React.createElement('div', {
    onMouseDown: () => setOpen(false),
    style: {
      position: 'fixed',
      inset: 0,
      background: 'transparent',
      zIndex: 999
    }
  }), React.createElement('div', {
    style: {
      position: 'fixed',
      left: pos.left,
      top: pos.top,
      zIndex: 1000
    }
  }, React.createElement(__ds_scope.DropdownPanel, {
    options,
    value: cur,
    onChange: nv => {
      set(nv);
      setOpen(false);
    },
    width: Math.max(pos.width, 180)
  }))));
}
function SearchField({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'Search lead by name',
  size = 'md',
  width = 280,
  disabled,
  leadingSelect,
  trailingSelect,
  variant = 'outline'
}) {
  const controlled = value !== undefined;
  const [inner, setInner] = React.useState(defaultValue);
  const [focus, setFocus] = React.useState(false);
  const v = controlled ? value : inner;
  const set = nv => {
    if (!controlled) setInner(nv);
    onChange && onChange(nv);
  };
  const h = size === 'lg' ? 46 : size === 'sm' ? 32 : 40;
  const icon = size === 'lg' ? 16 : 14;
  const filled = variant === 'filled';

  // outline: white + 1px border + 3px radius. filled ("Search Mandate", Figma Dark-mode
  // frame): #F7F7F9 fill, no resting border, 4px radius (the curve). Both get a violet
  // focus border + ring.
  let bg, border, radius;
  if (disabled) {
    bg = '#F3F3F3';
    border = '1px solid #E0E0E0';
    radius = filled ? 4 : 3;
  } else if (filled) {
    bg = '#F7F7F9';
    radius = 4;
    border = '1px solid ' + (focus ? '#6161FF' : '#F7F7F9');
  } else {
    bg = '#fff';
    radius = 3;
    border = '1px solid ' + (focus ? '#6161FF' : '#E0E0E0');
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      width,
      maxWidth: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px',
      background: bg,
      borderRadius: radius,
      border,
      boxShadow: focus ? '0 0 0 3px rgba(97,97,255,.16)' : 'none',
      transition: 'border 120ms ease, box-shadow 120ms ease, background 120ms ease'
    }
  }, leadingSelect && /*#__PURE__*/React.createElement(SearchSelect, _extends({}, leadingSelect, {
    side: "leading",
    disabled: disabled
  })), /*#__PURE__*/React.createElement("svg", {
    width: icon,
    height: icon,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#9FA6B0",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "7",
    r: "4.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.5 10.5L14 14"
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: v,
    placeholder: placeholder,
    disabled: disabled,
    onChange: ev => set(ev.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onKeyDown: ev => {
      if (ev.key === 'Enter' && onSubmit) onSubmit(v);
    },
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: SEARCH_FONT,
      fontSize: size === 'lg' ? 14 : 13,
      color: '#101721'
    }
  }), v && !disabled && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(''),
    "aria-label": "Clear",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      flex: 'none',
      color: '#9FA6B0',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: icon,
    height: icon,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  }))), trailingSelect && /*#__PURE__*/React.createElement(SearchSelect, _extends({}, trailingSelect, {
    side: "trailing",
    disabled: disabled
  })));
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SearchField/SearchField.jsx", error: String((e && e.message) || e) }); }

// components/GlobalFilter/GlobalFilter.jsx
try { (() => {
const GF_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const GF_BORDER = 'rgb(224,224,224)';
const GF_TEXT = '#101721';
const GF_MUTED = '#6B7785';
const GF_HAIR = '0.5px solid rgb(224,224,224)';
function InfoDot({
  tip
}) {
  const [pos, setPos] = React.useState(null);
  const ref = React.useRef(null);
  const show = () => {
    const r = ref.current && ref.current.getBoundingClientRect();
    if (r) setPos({
      left: r.left + r.width / 2,
      top: r.top - 8
    });
  };
  const hide = () => setPos(null);
  const glyph = /*#__PURE__*/React.createElement("span", {
    ref: ref,
    onMouseEnter: tip ? show : undefined,
    onMouseLeave: tip ? hide : undefined,
    style: {
      display: 'inline-flex',
      cursor: 'default'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-label": "Info"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6.4",
    stroke: "#9FA6B0",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "5.2",
    r: "0.85",
    fill: "#9FA6B0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 7.4v3.4",
    stroke: "#9FA6B0",
    strokeWidth: "1.2",
    strokeLinecap: "round"
  })));
  if (!tip) return glyph;
  // Fixed-position bubble so it escapes the column's overflow:auto clipping.
  return /*#__PURE__*/React.createElement(React.Fragment, null, glyph, pos && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'fixed',
      left: pos.left,
      top: pos.top,
      transform: 'translate(-50%, -100%)',
      background: '#101721',
      color: '#fff',
      borderRadius: 4,
      padding: '12px 16px',
      fontFamily: GF_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      whiteSpace: 'pre-line',
      maxWidth: 280,
      boxShadow: '0 2px 15px rgba(0,0,0,0.1012)',
      zIndex: 1000,
      pointerEvents: 'none'
    }
  }, tip));
}
function Chevron() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 4l4 4-4 4",
    stroke: "#9FA6B0",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

/** One selectable row in any column. */
function FilterRow({
  row,
  onToggle,
  onDrill,
  active
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onToggle && onToggle(row),
    style: {
      minHeight: 52,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: '8px 20px',
      cursor: 'pointer',
      background: active ? '#F4F4FF' : hover ? '#F7F7F9' : '#fff'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      display: 'inline-flex'
    },
    onClick: ev => ev.stopPropagation()
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: !!row.checked,
    indeterminate: !!row.partial,
    onChange: () => onToggle && onToggle(row)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: GF_FONT,
      fontWeight: row.bold ? 600 : 400,
      fontSize: 14,
      lineHeight: '18px',
      color: GF_TEXT,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, row.label), row.info && /*#__PURE__*/React.createElement(InfoDot, {
    tip: row.info
  })), row.count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      fontFamily: GF_FONT,
      fontWeight: 400,
      fontSize: 13,
      lineHeight: '16px',
      color: GF_MUTED,
      fontVariantNumeric: 'tabular-nums'
    }
  }, row.count), row.drill && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      display: 'inline-flex'
    },
    onClick: ev => {
      ev.stopPropagation();
      onDrill && onDrill(row);
    }
  }, /*#__PURE__*/React.createElement(Chevron, null)));
}

/** A single column: header (title or the param+search header for col 0) + scrollable rows. */
function FilterColumn({
  column,
  width,
  isFirst,
  header,
  teamsLink
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      flex: width ? 'none' : 1,
      minWidth: 0,
      boxSizing: 'border-box',
      borderRight: GF_HAIR,
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'stretch',
      background: '#fff'
    }
  }, header ? header : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: GF_HAIR,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: GF_FONT,
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: GF_MUTED
    }
  }, column.title), teamsLink), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto'
    }
  }, column.rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px',
      fontFamily: GF_FONT,
      fontSize: 14,
      color: '#9FA6B0'
    }
  }, column.emptyText || 'No results found') : column.rows.map(r => /*#__PURE__*/React.createElement(FilterRow, {
    key: r.id,
    row: r,
    active: r.id === column.activeId,
    onToggle: column.onToggle,
    onDrill: column.onDrill
  }))));
}

/**
 * GlobalFilter — the cascading multi-column "global filter" that opens from the project
 * switcher. Column 1 carries the radio parameter switcher (BU + P&L / Mandate / Project /
 * Developer / City) + a search row; the following columns drill down (Mandate → Project →
 * Teams). Footer = Clear (secondary) + Apply (primary). Composed entirely from DS atoms:
 * Radio, Checkbox, SearchField, Button, Tooltip.
 */
function GlobalFilter({
  parameters = ['BU + P&L', 'Mandate', 'Project', 'Developer', 'City'],
  activeParameter = 'BU + P&L',
  onParameterChange,
  searchPlaceholder = 'Search BU / P&L City / P&L Name',
  searchValue,
  onSearchChange,
  scopeLabel = 'All',
  onScopeClick,
  columns = [],
  teamsVisible = false,
  onToggleTeams,
  onClear,
  onApply,
  clearLabel = 'Clear',
  applyLabel = 'Apply',
  width,
  bodyHeight = 430,
  style
}) {
  const col0Header = /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: GF_HAIR,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '16px 0',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 20,
      padding: '0 20px'
    }
  }, parameters.map(p => /*#__PURE__*/React.createElement(__ds_scope.Radio, {
    key: p,
    name: "gf-param",
    value: p,
    label: p,
    checked: p === activeParameter,
    onChange: () => onParameterChange && onParameterChange(p)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      gap: 0,
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SearchField, {
    variant: "filled",
    width: "100%",
    placeholder: searchPlaceholder,
    value: searchValue,
    onChange: onSearchChange
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onScopeClick,
    style: {
      flex: 'none',
      minWidth: 96,
      marginLeft: 8,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      background: '#F7F7F9',
      border: '1px solid ' + GF_BORDER,
      borderRadius: 4,
      cursor: 'pointer',
      fontFamily: GF_FONT,
      fontWeight: 600,
      fontSize: 14,
      color: GF_TEXT,
      padding: '0 16px'
    }
  }, scopeLabel, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "6",
    viewBox: "0 0 10 6",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l4 4 4-4",
    stroke: "#101721",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })))));
  const teamsLink = onToggleTeams && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleTeams,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      fontFamily: GF_FONT,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '18px',
      color: '#6161FF'
    }
  }, teamsVisible ? 'Hide Teams' : 'Show Teams');
  const lastIdx = columns.length - 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: width || 'max-content',
      maxWidth: '100%',
      boxSizing: 'border-box',
      background: '#fff',
      border: '1px solid ' + GF_BORDER,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: GF_FONT,
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: bodyHeight,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch'
    }
  }, columns.map((c, i) => /*#__PURE__*/React.createElement(FilterColumn, {
    key: c.key || i,
    column: c,
    width: c.width,
    isFirst: i === 0,
    header: i === 0 ? col0Header : undefined,
    teamsLink: i === lastIdx ? teamsLink : undefined
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      boxSizing: 'border-box',
      flex: 'none',
      background: '#fff',
      boxShadow: 'inset 0 0.5px 0 ' + GF_BORDER,
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '8px 24px 8px 0'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "md",
    autoWidth: true,
    onClick: onClear
  }, clearLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "md",
    autoWidth: true,
    onClick: onApply
  }, applyLabel)));
}
Object.assign(__ds_scope, { GlobalFilter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/GlobalFilter/GlobalFilter.jsx", error: String((e && e.message) || e) }); }

// components/SelectionBar/SelectionBar.jsx
try { (() => {
const SB_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const SB_BORDER = 'rgb(237,237,241)';

/**
 * SelectionBar — the bottom action bar that appears when rows are selected (Figma
 * "Container (Leads | Dashboard)", node 7451:5020). Left: "Select All" / "Custom Select"
 * radios with a segmented count input ( n / total ); right: a Cancel link + a primary
 * confirm button. White bar with a top shadow. Composed from DS Radio + Button.
 */
function SelectionBar({
  mode = 'custom',
  onModeChange,
  count = 0,
  total = 0,
  onCountChange,
  primaryLabel = 'Confirm Push',
  onPrimary,
  cancelLabel = 'Cancel',
  onCancel,
  primaryDisabled,
  width = '100%',
  maxWidth = 1200,
  style
}) {
  const setMode = m => onModeChange && onModeChange(m);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      boxSizing: 'border-box',
      background: '#fff',
      boxShadow: '0 -7px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      fontFamily: SB_FONT,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      padding: '15px 20px',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 36,
      alignItems: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setMode('all'),
    style: {
      cursor: 'pointer',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Radio, {
    name: "selbar-mode",
    value: "all",
    label: "Select All",
    checked: mode === 'all',
    onChange: () => setMode('all')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setMode('custom'),
    style: {
      cursor: 'pointer',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Radio, {
    name: "selbar-mode",
    value: "custom",
    label: "Custom Select",
    checked: mode === 'custom',
    onChange: () => setMode('custom')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      height: 36
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    inputMode: "numeric",
    value: count,
    disabled: mode !== 'custom',
    onChange: e => {
      const n = e.target.value.replace(/[^0-9]/g, '');
      const v = n === '' ? 0 : Math.min(parseInt(n, 10), total || parseInt(n, 10));
      onCountChange && onCountChange(v);
    },
    style: {
      width: 80,
      boxSizing: 'border-box',
      border: '1px solid ' + SB_BORDER,
      borderRadius: '3px 0 0 3px',
      padding: '0 18px',
      outline: 'none',
      background: mode === 'custom' ? '#fff' : '#F9F9FB',
      fontFamily: SB_FONT,
      fontWeight: 400,
      fontSize: 14,
      color: '#101721'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      boxSizing: 'border-box',
      border: '1px solid ' + SB_BORDER,
      borderLeft: 'none',
      borderRadius: '0 3px 3px 0',
      background: '#F9F9FB',
      padding: '0 18px',
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: SB_FONT,
      fontWeight: 400,
      fontSize: 14,
      color: '#101721',
      whiteSpace: 'nowrap'
    }
  }, "/ ", total)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      gap: 24,
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "link",
    size: "md",
    autoWidth: true,
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    onClick: onPrimary,
    disabled: primaryDisabled
  }, primaryLabel))));
}
Object.assign(__ds_scope, { SelectionBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SelectionBar/SelectionBar.jsx", error: String((e && e.message) || e) }); }

// components/SideNav/SideNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SN_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// Inline nav icons (Figma uses Material Symbols — home, emoji_events, receipt_long,
// money, museum, maps_home_work, dashboard, person_outline, receipt).
function NavIcon({
  name,
  color = 'currentColor'
}) {
  const s = {
    width: 18,
    height: 18,
    flex: 'none',
    display: 'block'
  };
  const c = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'home':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("path", {
        d: "M3 8.5L9 3.5l6 5V14a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1z"
      }));
    case 'trophy':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("path", {
        d: "M5 3.5h8v3a4 4 0 0 1-8 0zM5 4.5H3v1a2 2 0 0 0 2 2M13 4.5h2v1a2 2 0 0 1-2 2M7 11.5h4M6.5 14.5h5M9 11.5v3"
      }));
    case 'receipt_long':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("path", {
        d: "M4 2.5h7l1 1v11l-1.3-.9-1.2.9-1.2-.9-1.3.9-1.2-.9-1.3.9V3.5zM6 6h5M6 8.5h5M6 11h3"
      }));
    case 'money':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("rect", {
        x: "2.5",
        y: "4.5",
        width: "13",
        height: "9",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "9",
        r: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 7v4M13 7v4"
      }));
    case 'museum':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("path", {
        d: "M3 7l6-3.5L15 7M4 7v6M14 7v6M7 7v6M11 7v6M3 15h12"
      }));
    case 'maps_home_work':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 15V8l4-2.5V15M6.5 8.5l6-3.5V15h-10M9.5 8h.01M12 8h.01M9.5 11h.01M12 11h.01"
      }));
    case 'dashboard':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("rect", {
        x: "2.5",
        y: "2.5",
        width: "5.5",
        height: "4.5",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "2.5",
        y: "9",
        width: "5.5",
        height: "6.5",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "10",
        y: "2.5",
        width: "5.5",
        height: "6.5",
        rx: "1"
      }), /*#__PURE__*/React.createElement("rect", {
        x: "10",
        y: "11",
        width: "5.5",
        height: "4.5",
        rx: "1"
      }));
    case 'person':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "6",
        r: "2.6"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3.5 15a5.5 5.5 0 0 1 11 0"
      }));
    case 'receipt':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("path", {
        d: "M4 2.5h10v13l-1.7-1-1.6 1-1.7-1-1.7 1-1.6-1L4 15.5zM6.5 6.5h5M6.5 9.5h5"
      }));
    default:
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, c), /*#__PURE__*/React.createElement("circle", {
        cx: "9",
        cy: "9",
        r: "6"
      }));
  }
}
function NavRow({
  item,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const bg = active ? '#E8E8FF' : hover ? '#F7F7F9' : '#fff';
  const fg = active ? '#6161FF' : '#101721';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      alignSelf: 'stretch',
      minHeight: 50,
      boxSizing: 'border-box',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 4,
      background: bg,
      padding: '16px',
      transition: 'background 120ms ease',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      fontFamily: SN_FONT
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(NavIcon, {
    name: item.icon,
    color: fg
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '18px',
      color: fg,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, item.label)), item.badge && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      borderRadius: 4,
      background: '#10AC60',
      color: '#fff',
      padding: '4px 10px',
      fontSize: 10,
      fontWeight: 500,
      lineHeight: '12px'
    }
  }, item.badge === true ? 'New' : item.badge));
}

/**
 * Anarock left/side navigation drawer (Figma "Left nav drawer"). 239px white column, shadow
 * 0 0 16px rgba(197,193,193,.31), 16px gaps. Each row is a 50px item: 18px icon + 14/18 label,
 * optional green "New" badge. Active = #E8E8FF fill + violet #6161FF label/icon; hover on idle
 * rows = #F7F7F9.
 */
function SideNav({
  items = [],
  value,
  onChange,
  width = 239
}) {
  const active = value != null ? value : items[0] && items[0].id;
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width,
      boxSizing: 'border-box',
      minHeight: '100%',
      background: '#fff',
      boxShadow: '0 0 16px rgba(197,193,193,.31)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '20px 8px',
      alignItems: 'flex-start',
      fontFamily: SN_FONT
    }
  }, items.map(it => /*#__PURE__*/React.createElement(NavRow, {
    key: it.id,
    item: it,
    active: it.id === active,
    onClick: () => onChange && onChange(it.id)
  })));
}
Object.assign(__ds_scope, { SideNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/SideNav/SideNav.jsx", error: String((e && e.message) || e) }); }

// components/Spinner/Spinner.jsx
try { (() => {
// Keyframes are injected once (design-system CSS has none for this).
function ensureSpinKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('anrk-spinner-kf')) return;
  const el = document.createElement('style');
  el.id = 'anrk-spinner-kf';
  el.textContent = '@keyframes anrk-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(el);
}
function Spinner({
  size = 24,
  color = '#6161FF',
  thickness,
  track = 'rgba(97,97,255,0.18)',
  label
}) {
  ensureSpinKeyframes();
  const bw = thickness || Math.max(2, Math.round(size / 10));
  const ring = /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flex: 'none',
      display: 'inline-block',
      boxSizing: 'border-box',
      border: bw + 'px solid ' + track,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'anrk-spin 0.7s linear infinite'
    }
  });
  if (!label) return ring;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: '"Graphik","Inter",system-ui,sans-serif'
    }
  }, ring, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#6B7785'
    }
  }, label));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Spinner/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/Star/Star.jsx
try { (() => {
const STAR_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const STAR_SIZES = {
  sm: 20,
  md: 24,
  lg: 28
};

// 5-point star fitted to the Figma bounding box (x 3.443–20.557, y 3.822–20.178 in a 24 grid).
const STAR_PATH = 'M12 3.822 L14.47 9.079 L20.557 9.797 L16.055 13.94 L17.249 20.178 L12 16.984 L6.751 20.178 L7.945 13.94 L3.443 9.797 L9.53 9.079 Z';
function Star({
  selected,
  half,
  onClick,
  disabled,
  size = 'md',
  label
}) {
  const px = STAR_SIZES[size] || 24;
  const fill = disabled ? '#E0E0E0' : '#F3AA07';
  const stroke = disabled ? '#E0E0E0' : '#9FA6B0';
  const gid = React.useMemo(() => 'anrk-star-half-' + Math.random().toString(36).slice(2, 8), []);
  const svg = /*#__PURE__*/React.createElement("svg", {
    width: px,
    height: px,
    viewBox: "0 0 24 24",
    style: {
      display: 'block',
      flex: 'none'
    }
  }, half && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: fill
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#fff"
  }))), /*#__PURE__*/React.createElement("path", {
    d: STAR_PATH,
    fill: selected ? fill : half ? 'url(#' + gid + ')' : 'none',
    stroke: selected ? fill : stroke,
    strokeWidth: selected ? 0 : 1.2,
    strokeLinejoin: "round"
  }));
  const content = /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: disabled ? undefined : onClick,
    "aria-pressed": !!selected,
    "aria-label": label || 'Star',
    disabled: disabled,
    style: {
      border: 'none',
      background: 'transparent',
      padding: 0,
      margin: 0,
      lineHeight: 0,
      cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, svg);
  if (!label) return content;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: STAR_FONT
    }
  }, content, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '18px',
      color: disabled ? '#9FA6B0' : '#101721'
    }
  }, label));
}
Object.assign(__ds_scope, { Star });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Star/Star.jsx", error: String((e && e.message) || e) }); }

// components/Stepper/Stepper.jsx
try { (() => {
const STEP_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const STEP_VIOLET = '#6161FF';
const STEP_BORDER = '#E0E0E0';
function StepDot({
  status,
  index
}) {
  const done = status === 'complete';
  const current = status === 'current';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      flex: 'none',
      background: done ? STEP_VIOLET : current ? '#fff' : '#fff',
      border: '1.5px solid ' + (done || current ? STEP_VIOLET : STEP_BORDER),
      color: done ? '#fff' : current ? STEP_VIOLET : '#9FA6B0',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: STEP_FONT,
      fontSize: 12,
      fontWeight: 600,
      boxShadow: current ? '0 0 0 3px rgba(97,97,255,.16)' : 'none'
    }
  }, done ? /*#__PURE__*/React.createElement("svg", {
    width: 12,
    height: 12,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3.5 8.5l3 3 6-6"
  })) : index + 1);
}
function Stepper({
  steps = [],
  current = 0,
  orientation = 'vertical'
}) {
  const statusFor = i => i < current ? 'complete' : i === current ? 'current' : 'upcoming';
  const vertical = orientation === 'vertical';
  if (vertical) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: STEP_FONT,
        display: 'flex',
        flexDirection: 'column'
      }
    }, steps.map((s, i) => {
      const status = statusFor(i);
      const last = i === steps.length - 1;
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: 'flex',
          gap: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }, /*#__PURE__*/React.createElement(StepDot, {
        status: status,
        index: i
      }), !last && /*#__PURE__*/React.createElement("span", {
        style: {
          width: 2,
          flex: 1,
          minHeight: 28,
          background: i < current ? STEP_VIOLET : STEP_BORDER,
          margin: '4px 0'
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          paddingBottom: last ? 0 : 20
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 14,
          fontWeight: status === 'upcoming' ? 400 : 500,
          color: status === 'upcoming' ? '#9FA6B0' : '#101721'
        }
      }, s.label), s.description && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          lineHeight: '16px',
          color: '#6B7785',
          marginTop: 3
        }
      }, s.description)));
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: STEP_FONT,
      display: 'flex',
      alignItems: 'flex-start'
    }
  }, steps.map((s, i) => {
    const status = statusFor(i);
    const last = i === steps.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        flex: 'none',
        width: 92
      }
    }, /*#__PURE__*/React.createElement(StepDot, {
      status: status,
      index: i
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        textAlign: 'center',
        color: status === 'upcoming' ? '#9FA6B0' : '#101721',
        fontWeight: status === 'current' ? 600 : 500
      }
    }, s.label)), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        height: 2,
        background: i < current ? STEP_VIOLET : STEP_BORDER,
        marginTop: 11
      }
    }));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Stepper/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/Table/Table.jsx
try { (() => {
const TABLE_FONT = '"Graphik", "Inter", system-ui, sans-serif';

/**
 * columns: [{ key, header, width, align, numeric, render }]
 * rows:    [{ ...cellValues }]  (values keyed by column.key)
 */
function Table({
  columns = [],
  rows = [],
  selectable,
  dense,
  onRowClick,
  selectedId,
  rowKey = 'id'
}) {
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  const padY = dense ? 10 : 14;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid #E0E0E0',
      borderRadius: 4,
      overflow: 'hidden',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: TABLE_FONT
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: '#F7F7F9',
      borderBottom: '1px solid #E0E0E0'
    }
  }, selectable && /*#__PURE__*/React.createElement("th", {
    style: {
      width: 28,
      padding: '12px 12px 12px 24px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      accentColor: '#6161FF'
    }
  })), columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || (c.numeric ? 'right' : 'left'),
      padding: '12px',
      paddingLeft: i === 0 && !selectable ? 24 : 12,
      paddingRight: i === columns.length - 1 ? 24 : 12,
      width: c.width,
      fontSize: 11,
      fontWeight: 500,
      color: '#6B7785',
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      whiteSpace: 'nowrap'
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => {
    const key = r[rowKey] != null ? r[rowKey] : ri;
    const selected = selectedId != null && r[rowKey] === selectedId;
    return /*#__PURE__*/React.createElement("tr", {
      key: key,
      onClick: onRowClick ? () => onRowClick(r) : undefined,
      onMouseEnter: () => setHoverIdx(ri),
      onMouseLeave: () => setHoverIdx(-1),
      style: {
        borderBottom: ri === rows.length - 1 ? 'none' : '1px solid #EDEDED',
        background: selected ? '#F4F4FF' : hoverIdx === ri ? '#F7F7F9' : '#fff',
        cursor: onRowClick ? 'pointer' : 'default'
      }
    }, selectable && /*#__PURE__*/React.createElement("td", {
      style: {
        padding: padY + 'px 12px ' + padY + 'px 24px'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: selected || undefined,
      readOnly: true,
      onClick: ev => ev.stopPropagation(),
      style: {
        accentColor: '#6161FF'
      }
    })), columns.map((c, ci) => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        textAlign: c.align || (c.numeric ? 'right' : 'left'),
        padding: padY + 'px 12px',
        paddingLeft: ci === 0 && !selectable ? 24 : 12,
        paddingRight: ci === columns.length - 1 ? 24 : 12,
        fontSize: dense ? 12 : 13,
        lineHeight: '18px',
        fontWeight: ci === 0 ? 500 : 400,
        color: ci === 0 ? '#101721' : '#6B7785',
        fontVariantNumeric: c.numeric ? 'tabular-nums' : 'normal'
      }
    }, c.render ? c.render(r[c.key], r) : r[c.key])));
  }))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Table/Table.jsx", error: String((e && e.message) || e) }); }

// components/Tabs/Tabs.jsx
try { (() => {
const TABS_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline'
}) {
  const active = value != null ? value : tabs[0] && (tabs[0].id != null ? tabs[0].id : tabs[0]);
  const pill = variant === 'pill';
  const boxed = variant === 'boxed';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: pill ? 4 : boxed ? 8 : 0,
      fontFamily: TABS_FONT,
      borderBottom: pill || boxed ? 'none' : '1px solid #E0E0E0',
      background: pill ? '#F7F7F9' : 'transparent',
      padding: pill ? 4 : 0,
      borderRadius: pill ? 4 : 0
    }
  }, tabs.map(t => {
    const id = t.id != null ? t.id : t;
    const label = t.label != null ? t.label : t;
    const on = id === active;
    const base = {
      fontFamily: TABS_FONT,
      fontSize: 14,
      fontWeight: 500,
      lineHeight: '18px',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      whiteSpace: 'nowrap'
    };
    let style;
    if (boxed) {
      // Figma TAB active = white box, 1px violet border, radius 4, violet label.
      style = {
        ...base,
        padding: '10px 20px',
        borderRadius: 4,
        border: on ? '1px solid #6161FF' : '1px solid transparent',
        color: on ? '#6161FF' : '#6B7785',
        background: '#fff'
      };
    } else if (pill) {
      style = {
        ...base,
        padding: '8px 16px',
        borderRadius: 3,
        background: on ? '#fff' : 'transparent',
        color: on ? '#6161FF' : '#6B7785',
        boxShadow: on ? '0 1px 2px rgba(16,23,33,.08)' : 'none'
      };
    } else {
      style = {
        ...base,
        padding: '10px 4px',
        margin: '0 12px',
        marginBottom: -1,
        color: on ? '#6161FF' : '#6B7785',
        borderBottom: on ? '2px solid #6161FF' : '2px solid transparent'
      };
    }
    return /*#__PURE__*/React.createElement(TabButton, {
      key: id,
      on: on,
      style: style,
      variant: variant,
      onClick: () => onChange && onChange(id)
    }, label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        padding: '1px 6px',
        borderRadius: 999,
        background: on ? '#E8E8FF' : '#EDEDED',
        color: on ? '#6161FF' : '#6B7785'
      }
    }, t.count));
  }));
}

// Idle tabs get a hover cue: violet text everywhere, plus a faint tint (pill/boxed)
// or a gray underline hint (underline).
function TabButton({
  on,
  style,
  variant,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const hovered = hover && !on;
  const s = {
    ...style
  };
  if (hovered) {
    if (variant === 'pill') {
      s.color = '#6161FF';
      s.background = 'rgba(255,255,255,.6)';
    } else if (variant === 'boxed') {
      s.color = '#6161FF';
      s.background = '#F7F7F9';
    } else s.color = '#101721'; // underline: darken the label only — no stroke, no primary color
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tabs/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/LeadDrawer/LeadDrawer.jsx
try { (() => {
const LD_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function MenuBtn({
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-label": "More",
    style: {
      width: 40,
      height: 40,
      borderRadius: 3,
      background: '#fff',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "4",
    height: "16",
    viewBox: "0 0 4 16",
    fill: "#101721"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "8",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "14",
    r: "1.6"
  })));
}

/**
 * LeadDrawer — right-side lead-detail drawer (Figma "Container", node 7451:10815). A colorful
 * banner header carries the status line + kebab menu, an initials avatar straddling the banner
 * edge, the lead name / project, and a LEAD ID · PHONE · EMAIL row; below sits a DS Tabs strip
 * (Details / Visits / Inquiries / Calls / History) and a scrolling #F7F7F9 body. An alternative
 * to the filter side-drawer for record detail. Composed from DS Tabs + Avatar.
 */
function LeadDrawer({
  status = 'In Call Center almost 2 years ago',
  name = 'Unnamed',
  project = 'TATA : New Havens Boisar II',
  initials = 'U',
  avatarColor = '#ED754B',
  bannerColor = 'linear-gradient(115deg, #F27B4F 0%, #E8623A 100%)',
  leadId = '# 8807858',
  phone = '+91 *****67685',
  email = '-',
  tabs = ['Details', 'Visits', 'Inquiries', 'Calls', 'History'],
  activeTab = 'Details',
  onTabChange,
  onClose,
  onMenu,
  children,
  width = 530,
  height = '100%',
  style
}) {
  const meta = [['LEAD ID', leadId], ['PHONE', phone], ['EMAIL', email]];
  const panel = /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      boxSizing: 'border-box',
      background: '#F7F7F9',
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: LD_FONT,
      overflow: 'hidden',
      boxShadow: '-8px 0 24px rgba(16,23,33,0.12)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: bannerColor,
      padding: '20px 30px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LD_FONT,
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '16px',
      color: '#fff'
    }
  }, status), /*#__PURE__*/React.createElement(MenuBtn, {
    onClick: onMenu
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: '0 30px 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      background: '#fff',
      borderRadius: '50%',
      padding: 2,
      marginTop: -24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: initials,
    size: 48,
    color: avatarColor
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: LD_FONT,
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '22px',
      letterSpacing: '-0.44px',
      color: '#101721',
      textTransform: 'capitalize'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: LD_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      color: '#6B7785'
    }
  }, project), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'row',
      gap: 32
    }
  }, meta.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LD_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '100%',
      color: '#101721',
      whiteSpace: 'nowrap'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LD_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '100%',
      color: '#6B7785',
      whiteSpace: 'nowrap'
    }
  }, k))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      borderTop: '1px solid #EDEDED'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    tabs: tabs,
    value: activeTab,
    onChange: onTabChange,
    variant: "boxed"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      background: '#F7F7F9',
      padding: '20px 30px 30px'
    }
  }, children));
  if (!onClose) return panel;
  // 80px close rail on the left with a white cross button, matching the FilterDrawer.
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      height,
      fontFamily: LD_FONT
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      flex: 'none',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      width: 40,
      height: 40,
      borderRadius: 4,
      background: '#FFFFFF',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#000000',
      boxShadow: '0 0 2px rgba(16,23,33,.08), 0 0 8px rgba(16,23,33,.16)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  })))), panel);
}
Object.assign(__ds_scope, { LeadDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LeadDrawer/LeadDrawer.jsx", error: String((e && e.message) || e) }); }

// components/LeadList/LeadList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LL_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const LL_DARK = '#101721';
const LL_MUTED = '#6B7785';
const LL_FAINT = '#9FA6B0';
const LL_RED = '#D32F02';
const LL_VIOLET = '#6161FF';

// ── Header-guide toolbar icons (round 44px buttons) ──────────────────────────
function ToolIcon({
  name
}) {
  const s = {
    width: 18,
    height: 18,
    display: 'block'
  };
  const st = {
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  const stv = {
    ...st,
    stroke: LL_VIOLET
  };
  switch (name) {
    case 'genie':
      return /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff'
        }
      }, "g");
    case 'import':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, st), /*#__PURE__*/React.createElement("path", {
        d: "M9 3v8M5.5 7.5L9 11l3.5-3.5M4 14.5h10"
      }));
    case 'filePlus':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, stv), /*#__PURE__*/React.createElement("path", {
        d: "M5 2.5h5l3 3V15a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 4 15V3a.5.5 0 0 1 1-.5z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10 2.5V6h3M8.5 9v3M7 10.5h3"
      }));
    case 'play':
      return /*#__PURE__*/React.createElement("svg", {
        style: s,
        viewBox: "0 0 18 18",
        fill: LL_VIOLET
      }, /*#__PURE__*/React.createElement("path", {
        d: "M5.5 3.5l9 5.5-9 5.5z"
      }));
    case 'download':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, stv), /*#__PURE__*/React.createElement("path", {
        d: "M9 3v8M5.5 7.5L9 11l3.5-3.5M4 14.5h10"
      }));
    case 'undo':
      return /*#__PURE__*/React.createElement("svg", {
        style: s,
        viewBox: "0 0 18 18",
        fill: "none",
        stroke: "#C3C9CF",
        strokeWidth: "1.6",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M5 7H11a3.5 3.5 0 0 1 0 7H7M5 7l2.5-2.5M5 7l2.5 2.5"
      }));
    case 'upload':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 18 18"
      }, stv), /*#__PURE__*/React.createElement("path", {
        d: "M9 11V3M5.5 6.5L9 3l3.5 3.5M4 14.5h10"
      }));
    default:
      return null;
  }
}
function ToolBtn({
  name,
  filled,
  disabled
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    style: {
      width: 44,
      height: 44,
      borderRadius: 25,
      flex: 'none',
      cursor: disabled ? 'default' : 'pointer',
      background: filled ? LL_VIOLET : '#fff',
      border: filled ? 'none' : '1px solid #E0E0E0',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement(ToolIcon, {
    name: name
  }));
}
function WarnIcon() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: '#F9E0D9',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: LL_RED,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 2.5L14.5 13.5H1.5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6.5v3M8 11.6h.01"
  })));
}
function Dot({
  color = '#9FA6B0'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: color,
      flex: 'none'
    }
  });
}
function Flames({
  hot = 0
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2,
      background: '#F7F7F9',
      borderRadius: 4,
      padding: '4px 6px'
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: "12",
    height: "14",
    viewBox: "0 0 12 14",
    fill: i < hot ? '#ED4B2D' : '#C3C9CF'
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 0C6 3 2 4 2 8a4 4 0 0 0 8 0c0-1.6-1-2.6-1.6-3.4C7.8 6 7 6.3 7 4.5 7 2.5 6 1 6 0z"
  }))));
}
function GreenCall() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 16,
      background: '#DBF3E7',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#10AC60",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 4.5C3 9.2 6.8 13 11.5 13a1 1 0 0 0 1-1V10.4a.5.5 0 0 0-.4-.5l-2-.4a.5.5 0 0 0-.5.2L8.7 11A8.5 8.5 0 0 1 5 7.3l1.3-.9a.5.5 0 0 0 .2-.5l-.4-2A.5.5 0 0 0 5.6 3.5H4a1 1 0 0 0-1 1z"
  })));
}

// ── One lead row ─────────────────────────────────────────────────────────────
function LeadRow({
  lead
}) {
  const initials = (lead.name || 'U').slice(0, 1).toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: '24px 20px 16px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 34%',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'row',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    initials: initials,
    size: 44,
    color: lead.avatarColor || '#9FA6B0'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '100%',
      letterSpacing: '-0.234px',
      color: '#000',
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    }
  }, lead.name || 'Unnamed'), lead.owner && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 700,
      fontSize: 11,
      lineHeight: '100%',
      letterSpacing: '0.064px',
      color: LL_MUTED,
      background: '#EDEDED',
      borderRadius: 3,
      padding: '7px 10px'
    }
  }, lead.owner), lead.hot != null && /*#__PURE__*/React.createElement(Flames, {
    hot: lead.hot
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '100%',
      color: LL_MUTED
    }
  }, lead.id), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      background: LL_FAINT
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '100%',
      color: LL_MUTED
    }
  }, lead.phone), lead.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 600,
      fontSize: 10,
      lineHeight: '10px',
      letterSpacing: '0.117px',
      color: '#1F69FF',
      background: '#DDE8FF',
      borderRadius: 3,
      padding: '4px 6px',
      textTransform: 'uppercase'
    }
  }, lead.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '100%',
      color: LL_FAINT
    }
  }, lead.source))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 16%',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Dot, {
    color: lead.statusDot
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '100%',
      color: LL_DARK
    }
  }, lead.status)), lead.statusAge && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 11,
      lineHeight: '100%',
      letterSpacing: '0.02em',
      color: LL_FAINT,
      textTransform: 'uppercase'
    }
  }, lead.statusAge)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 16%',
      minWidth: 0
    }
  }, lead.calls != null ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 16,
      color: LL_DARK
    }
  }, lead.calls, " Calls", /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: LL_MUTED,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 6l4 4 4-4"
  }))), lead.callLast && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 11,
      letterSpacing: '0.02em',
      color: LL_FAINT,
      textTransform: 'uppercase'
    }
  }, "LAST: ", lead.callLast)) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 14,
      color: LL_DARK
    }
  }, lead.callInfo || 'Call Info Not Found')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 17%',
      minWidth: 0,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WarnIcon, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '15.4px',
      letterSpacing: '-0.15px',
      color: lead.eventDone ? LL_DARK : LL_RED
    }
  }, lead.eventDone || 'No event done'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      display: 'flex',
      gap: 6
    }
  }, lead.eventDoneNote && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.02em',
      color: LL_RED,
      textTransform: 'uppercase'
    }
  }, lead.eventDoneNote), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 12,
      color: LL_VIOLET,
      cursor: 'pointer'
    }
  }, "History")))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 17%',
      minWidth: 0,
      display: 'flex',
      gap: 12
    }
  }, lead.fuPlanned ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GreenCall, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '15.4px',
      color: LL_DARK
    }
  }, lead.fuPlanned), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: LL_FONT,
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: '0.02em',
      color: '#10AC60',
      textTransform: 'uppercase'
    }
  }, "FU PLANNED"))) : lead.prevState ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '15.4px',
      color: LL_DARK
    }
  }, lead.prevState), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 11,
      letterSpacing: '0.02em',
      color: LL_FAINT,
      textTransform: 'uppercase'
    }
  }, "PREVIOUS STATE")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WarnIcon, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '15.4px',
      letterSpacing: '-0.15px',
      color: lead.eventScheduled ? LL_DARK : LL_RED
    }
  }, lead.eventScheduled || 'No event scheduled')))), lead.reason && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: '34%',
      marginTop: 16,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 14,
      color: LL_DARK
    }
  }, "Reason: ", lead.reason), lead.note && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: '34%',
      marginTop: 16,
      marginRight: 20,
      borderBottom: '1px dashed #C3C9CF',
      paddingBottom: 10,
      display: 'flex',
      gap: 6,
      color: LL_MUTED,
      fontFamily: LL_FONT,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: LL_FAINT,
      fontSize: 18,
      lineHeight: '12px'
    }
  }, "\u201C"), lead.note), lead.project && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      marginTop: 14,
      fontFamily: LL_FONT,
      fontWeight: 400,
      fontSize: 12,
      letterSpacing: '0.02em',
      color: LL_FAINT,
      textTransform: 'uppercase'
    }
  }, lead.project));
}

/**
 * LeadList — the grid-form leads listing (Figma "Container", nodes 7453:11359 / 7454:15543).
 * Header guide ("Showing N of M Leads" + round action toolbar), a list header of status Tabs,
 * and lead rows: avatar, name + owner pill + hotness flames, id · phone + PLATINUM tag, source,
 * status + age, call info / N Calls ▾, event done + History, event scheduled (No event / value +
 * PREVIOUS STATE / date + FU PLANNED green call), optional Reason line or dashed call note, and
 * the project label. Red "No event" states use the DS warning icon (32px #F9E0D9 / #D32F02).
 * Composed from DS Tabs + Avatar.
 */
function LeadList({
  count = 'Showing 50 of 67446 Leads',
  tools = [{
    name: 'genie',
    filled: true
  }, {
    name: 'import',
    filled: true
  }, {
    name: 'filePlus'
  }, {
    name: 'play'
  }, {
    name: 'download'
  }, {
    name: 'undo',
    disabled: true
  }, {
    name: 'upload'
  }],
  tabs = ['All (67446)', 'Fresh (106)', 'Claimed (9)', 'Interested (29)', 'Meeting done (18)', 'Visit done (10)', 'Final negotiation', 'Booking done (84)', 'Failed (50426)', 'Junk (16020)', 'In Call Center (744)'],
  activeTab,
  onTabChange,
  leads = [],
  width = 1280,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: '100%',
      boxSizing: 'border-box',
      fontFamily: LL_FONT,
      background: '#F2F2F2',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '4px 20px 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: LL_FONT,
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '100%',
      letterSpacing: '-0.44px',
      color: LL_DARK
    }
  }, count), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 10
    }
  }, tools.map((t, i) => /*#__PURE__*/React.createElement(ToolBtn, {
    key: i,
    name: t.name,
    filled: t.filled,
    disabled: t.disabled
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 4,
      padding: '4px 8px 0',
      marginBottom: 16,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    tabs: tabs,
    value: activeTab,
    onChange: onTabChange,
    variant: "underline"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, leads.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l.id || i,
    style: {
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(LeadRow, {
    lead: l
  })))));
}
Object.assign(__ds_scope, { LeadList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/LeadList/LeadList.jsx", error: String((e && e.message) || e) }); }

// components/ReportList/ReportList.jsx
try { (() => {
const RL_FONT = '"Graphik", "Inter", system-ui, sans-serif';
const RL_DARK = '#101721';
const RL_MUTED = '#6B7785';
const RL_FAINT = '#9FA6B0';
const RL_VIOLET = '#6161FF';

// Report-type icon (white glyph on a colored rounded-8 square, 28px). Figma "Table Cell" icon.
function ReportIcon({
  color = '#DC4276'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 8,
      background: color,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 13V3M13 13H3M6 11V7.5M9 11V5.5M12 11V9"
  })));
}
function Star({
  on
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: on ? '#F3AA07' : 'none',
    stroke: on ? '#F3AA07' : RL_FAINT,
    strokeWidth: "1.4",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 1.8l1.85 3.75 4.15.6-3 2.93.71 4.12L8 11.77 4.29 13.2 5 9.08l-3-2.93 4.15-.6z"
  }));
}

// One report row — grid: name | category | date | kebab.
function ReportRow({
  report,
  onToggleFav,
  menuOptions,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 200px 190px 44px',
      alignItems: 'center',
      height: 60,
      background: '#fff'
    },
    onMouseEnter: ev => {
      ev.currentTarget.style.background = '#F7F7F9';
    },
    onMouseLeave: ev => {
      ev.currentTarget.style.background = '#fff';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggleFav,
    "aria-label": "Favourite",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      display: 'inline-flex',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Star, {
    on: report.fav
  })), /*#__PURE__*/React.createElement(ReportIcon, {
    color: report.iconColor
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: RL_FONT,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '100%',
      letterSpacing: '-0.313px',
      color: RL_DARK,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, report.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: RL_FONT,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '100%',
      letterSpacing: '-0.313px',
      color: RL_MUTED
    }
  }, report.category), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: RL_FONT,
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '100%',
      letterSpacing: '-0.313px',
      color: RL_MUTED
    }
  }, report.date), /*#__PURE__*/React.createElement(__ds_scope.KebabMenu, {
    options: menuOptions
  }));
}

/**
 * ReportList — the Reports Listing (Figma "Reports | Listing", node 7455:15998). A white
 * sub-header with a DS SearchField ("Search by report name") + DS Tabs (All Reports / Favourite
 * Reports / Scheduled Reports), a column header (NAME / CATEGORY / LAST VISITED), and grouped
 * report rows. Each row: a favourite star, a colored rounded-8 report icon (28px), the report
 * name (Graphik 500/16, -0.313px), category, last-visited date, and a kebab menu. Group
 * headings ("Reports based on Lead Created", …) separate row clusters. Composed on DS tokens.
 */
function ReportList({
  search = '',
  onSearch,
  searchPlaceholder = 'Search by report name',
  tabs = [{
    label: 'All Reports',
    count: 95
  }, {
    label: 'Favourite Reports',
    count: 1
  }, {
    label: 'Scheduled Reports',
    count: 0
  }],
  activeTab = 'All Reports',
  onTabChange,
  columns = ['NAME', 'CATEGORY', 'LAST VISITED'],
  groups = [],
  onToggleFav,
  onKebab,
  rowMenu,
  width = 1512,
  style
}) {
  const defaultMenu = (report, gi, ri) => [{
    label: 'Open report',
    onSelect: () => onKebab && onKebab(gi, ri, 'open')
  }, {
    label: report.fav ? 'Remove from Favourites' : 'Add to Favourites',
    onSelect: () => onToggleFav && onToggleFav(gi, ri)
  }, {
    label: 'Schedule',
    onSelect: () => onKebab && onKebab(gi, ri, 'schedule')
  }, {
    label: 'Duplicate',
    onSelect: () => onKebab && onKebab(gi, ri, 'duplicate')
  }, {
    divider: true
  }, {
    label: 'Delete',
    danger: true,
    onSelect: () => onKebab && onKebab(gi, ri, 'delete')
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      maxWidth: '100%',
      boxSizing: 'border-box',
      fontFamily: RL_FONT,
      background: '#fff',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      boxShadow: '0 2px 7px 0 #F2F2F2',
      padding: '12px 56px',
      display: 'flex',
      alignItems: 'stretch',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SearchField, {
    variant: "filled",
    width: 215,
    placeholder: searchPlaceholder,
    value: search,
    onChange: v => onSearch && onSearch(v)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    variant: "underline",
    tabs: tabs.map(t => `${t.label} (${t.count})`),
    value: `${activeTab} (${(tabs.find(t => t.label === activeTab) || {}).count})`,
    onChange: str => {
      const m = tabs.find(t => `${t.label} (${t.count})` === str);
      if (m) onTabChange && onTabChange(m.label);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 200px 190px 44px',
      alignItems: 'center',
      height: 40.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: RL_FONT,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '100%',
      color: RL_FAINT
    }
  }, columns[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: RL_FONT,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '100%',
      color: RL_FAINT
    }
  }, columns[1]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: RL_FONT,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '100%',
      color: RL_FAINT
    }
  }, columns[2]), /*#__PURE__*/React.createElement("span", null)), groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: g.heading || gi
  }, g.heading && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 0',
      fontFamily: RL_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '100%',
      color: RL_MUTED
    }
  }, g.heading), (g.reports || []).map((r, ri) => /*#__PURE__*/React.createElement(ReportRow, {
    key: r.name || ri,
    report: r,
    last: ri === g.reports.length - 1,
    onToggleFav: () => onToggleFav && onToggleFav(gi, ri),
    menuOptions: rowMenu ? rowMenu(r, gi, ri) : defaultMenu(r, gi, ri)
  }))))));
}
Object.assign(__ds_scope, { ReportList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ReportList/ReportList.jsx", error: String((e && e.message) || e) }); }

// components/Tag/Tag.jsx
try { (() => {
const TAG_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// Exact palette from the Figma "Tags" frame (bg / text per type).
const TAG_TONES = {
  neutral: {
    bg: 'rgb(247,247,249)',
    fg: 'rgb(107,119,133)'
  },
  success: {
    bg: 'rgb(227,244,229)',
    fg: 'rgb(75,185,82)'
  },
  warning: {
    bg: 'rgb(253,242,218)',
    fg: 'rgb(243,170,7)'
  },
  error: {
    bg: 'rgb(249,224,217)',
    fg: 'rgb(211,47,2)'
  },
  dynamic: {
    bg: 'rgb(239,230,251)',
    fg: 'rgb(146,84,227)'
  },
  removable: {
    bg: 'rgb(232,232,255)',
    fg: 'rgb(97,97,255)'
  }
};
function Tag({
  children,
  type = 'neutral',
  size = 'large',
  removable,
  onRemove,
  maxWidth
}) {
  const tone = TAG_TONES[type] || TAG_TONES.neutral;
  const isRemovable = removable || type === 'removable';
  const large = size !== 'small';
  const fontWeight = !large && isRemovable ? 400 : 500;
  const cross = large ? 12 : 10;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      boxSizing: 'border-box',
      height: large ? 28 : 18,
      minWidth: large && isRemovable ? 64 : undefined,
      maxWidth,
      borderRadius: 3,
      background: tone.bg,
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isRemovable ? large ? 8 : 8 : large ? 4 : 3,
      padding: '6px 8px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: TAG_FONT,
      fontWeight,
      fontSize: large ? 12 : 10,
      lineHeight: large ? '16px' : '12px',
      color: tone.fg,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, children), isRemovable && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      border: 'none',
      background: 'transparent',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      width: cross,
      height: cross,
      color: tone.fg
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: cross,
    height: cross,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l8 8M12 4l-8 8"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tag/Tag.jsx", error: String((e && e.message) || e) }); }

// components/Toast/Toast.jsx
try { (() => {
const TOAST_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// Toast Message (Figma node 6872:29856). Solid-fill, white-text toasts.
// Types: default / success / error / processing. Positions: center (compact,
// centered pill) / side-corner (full-width bar with a close button).
const TOAST_BG = {
  default: 'rgb(16,23,33)',
  // #101721
  success: 'rgb(16,172,96)',
  // #10AC60
  error: 'rgb(189,41,0)',
  // #BD2900
  processing: 'rgb(16,23,33)' // #101721
};
// legacy tone → type
const TOAST_TONE_ALIAS = {
  success: 'success',
  error: 'error',
  info: 'default',
  warning: 'default',
  default: 'default',
  processing: 'processing'
};

// Leading status icons (Figma "task_alt" / "error" Round style — white, 20px box)
function ToastStatusIcon({
  type
}) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      flex: 'none'
    }
  };
  if (type === 'success') {
    return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("path", {
      d: "M17.5 9.3v.7a7.5 7.5 0 1 1-4.45-6.86"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7.5 9.6l2.6 2.6 7.4-7.4"
    }));
  }
  if (type === 'error') {
    return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
      cx: "10",
      cy: "10",
      r: "7.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 6.2v4.6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 13.8h.01"
    }));
  }
  return /*#__PURE__*/React.createElement("svg", common, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "7.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 9.2v4.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 6.4h.01"
  }));
}
function ToastClose({
  color,
  onClose
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      flex: 'none',
      display: 'inline-flex',
      color
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5.5 5.5l9 9M14.5 5.5l-9 9"
  })));
}
function Toast({
  type,
  tone,
  position = 'side-corner',
  children,
  message,
  title,
  onClose,
  progress,
  icon,
  width,
  style
}) {
  const resolved = type || TOAST_TONE_ALIAS[tone] || 'default';
  const bg = TOAST_BG[resolved] || TOAST_BG.default;
  const closeColor = 'rgb(159,166,176)'; // #9FA6B0 — grey close on every type (Figma)
  const label = children != null ? children : message;
  const leading = icon !== undefined ? icon : /*#__PURE__*/React.createElement(ToastStatusIcon, {
    type: resolved
  });

  // ── Processing: dark two-line toast with a progress row ──
  if (resolved === 'processing') {
    const p = progress || {};
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: width || 400,
        boxSizing: 'border-box',
        borderRadius: 4,
        background: bg,
        boxShadow: '0px 1px 2px 0px rgba(16,23,33,0.12), 0px 0px 1px 0px rgba(16,23,33,0.2), 0px 2px 12px 0px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 14,
        fontFamily: TOAST_FONT,
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '18px',
        color: '#fff'
      }
    }, title || 'Employee upload'), onClose && /*#__PURE__*/React.createElement(ToastClose, {
      color: closeColor,
      onClose: onClose
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 2,
        border: '1px solid rgba(237,237,237,0.2)',
        padding: '8px 8px',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        alignSelf: 'stretch'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Spinner, {
      size: 16,
      color: "rgb(112,112,255)",
      track: "rgba(255,255,255,0.24)"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '16px',
        color: '#fff',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, p.label || 'Uploading... about 1 min left')), p.count && /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '16px',
        color: '#fff',
        textAlign: 'right',
        flex: 'none'
      }
    }, p.count)));
  }

  // ── Center: compact, content-width, centered, no close ──
  if (position === 'center') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 50,
        boxSizing: 'border-box',
        borderRadius: 4,
        background: bg,
        display: 'inline-flex',
        flexDirection: 'row',
        gap: 8,
        padding: '0 16px',
        justifyContent: 'center',
        alignItems: 'center',
        width,
        ...style,
        fontFamily: TOAST_FONT
      }
    }, leading, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '18px',
        color: '#fff',
        whiteSpace: 'nowrap'
      }
    }, label));
  }

  // ── Side corner: full-width bar, label left, close right ──
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: width || 400,
      height: 44,
      boxSizing: 'border-box',
      borderRadius: 4,
      background: bg,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      fontFamily: TOAST_FONT,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      minWidth: 0
    }
  }, leading, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '18px',
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label)), onClose && /*#__PURE__*/React.createElement(ToastClose, {
    color: closeColor,
    onClose: onClose
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Toast/Toast.jsx", error: String((e && e.message) || e) }); }

// components/Toggle/Toggle.jsx
try { (() => {
const TOGGLE_FONT = '"Graphik", "Inter", system-ui, sans-serif';
function Toggle({
  checked,
  onChange,
  label,
  disabled,
  id
}) {
  const trackBg = disabled ? '#E0E0E0' : checked ? '#6161FF' : '#9FA6B0';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: TOGGLE_FONT,
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      opacity: disabled ? 0.7 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 20,
      borderRadius: 999,
      background: trackBg,
      position: 'relative',
      flex: 'none',
      transition: 'background 150ms ease',
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: id,
    type: "checkbox",
    checked: !!checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: '#fff',
      transition: 'left 150ms ease',
      boxShadow: '0 1px 2px rgba(16,23,33,.24)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      lineHeight: '18px',
      color: disabled ? '#9FA6B0' : '#101721'
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Toggle/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/Tooltip/Tooltip.jsx
try { (() => {
const TIP_FONT = '"Graphik", "Inter", system-ui, sans-serif';

// Tooltips (Figma node 6171:19830). Dark #101721 bubble, radius 4, padding 12/16,
// Graphik 400 12/16 white, max-width 300. Arrow: 12×12 square rotated 45°, same fill,
// shadow 0 2px 15px rgba(0,0,0,.1012), protruding 6px; inset 16px on cornered variants.
// Figma "Property 1" placements: Bottom / Bottom Left / Bottom Right (below trigger,
// arrow on top edge) and Top / Top Left / Top Right (above trigger, arrow on bottom edge).
const TIP_ARROW_SHADOW = '0px 2px 15px 0px rgba(0,0,0,0.1012)';
const TIP_INSET = 16; // arrow inset from bubble edge on cornered variants
const TIP_GAP = 8; // trigger ↔ bubble gap (6px arrow protrusion + 2)

function Tooltip({
  content,
  children,
  placement = 'top',
  open,
  maxWidth = 300
}) {
  const [hover, setHover] = React.useState(false);
  const show = open != null ? open : hover;

  // legacy aliases
  const p = placement === 'left' || placement === 'right' ? placement : {
    'top': 'top',
    'bottom': 'bottom',
    'top-left': 'top-left',
    'top-right': 'top-right',
    'bottom-left': 'bottom-left',
    'bottom-right': 'bottom-right'
  }[placement] || 'top';
  const above = p.indexOf('top') === 0;
  const shift = TIP_INSET + 6; // align arrow center to trigger center on cornered variants

  const pos = {
    'top': {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: TIP_GAP
    },
    'top-left': {
      bottom: '100%',
      right: '50%',
      transform: 'translateX(' + shift + 'px)',
      marginBottom: TIP_GAP
    },
    'top-right': {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-' + shift + 'px)',
      marginBottom: TIP_GAP
    },
    'bottom': {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: TIP_GAP
    },
    'bottom-left': {
      top: '100%',
      left: '50%',
      transform: 'translateX(-' + shift + 'px)',
      marginTop: TIP_GAP
    },
    'bottom-right': {
      top: '100%',
      right: '50%',
      transform: 'translateX(' + shift + 'px)',
      marginTop: TIP_GAP
    },
    'left': {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: TIP_GAP
    },
    'right': {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: TIP_GAP
    }
  }[p];
  const arrowBase = {
    position: 'absolute',
    width: 12,
    height: 12,
    background: 'rgb(16,23,33)',
    transform: 'rotate(45deg)',
    boxShadow: TIP_ARROW_SHADOW
  };
  const arrow = {
    'top': {
      ...arrowBase,
      bottom: -6,
      left: '50%',
      marginLeft: -6
    },
    'top-left': {
      ...arrowBase,
      bottom: -6,
      right: TIP_INSET
    },
    'top-right': {
      ...arrowBase,
      bottom: -6,
      left: TIP_INSET
    },
    'bottom': {
      ...arrowBase,
      top: -6,
      left: '50%',
      marginLeft: -6
    },
    'bottom-left': {
      ...arrowBase,
      top: -6,
      left: TIP_INSET
    },
    'bottom-right': {
      ...arrowBase,
      top: -6,
      right: TIP_INSET
    },
    'left': {
      ...arrowBase,
      right: -6,
      top: '50%',
      marginTop: -6
    },
    'right': {
      ...arrowBase,
      left: -6,
      top: '50%',
      marginTop: -6
    }
  }[p];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      fontFamily: TIP_FONT
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 20,
      ...pos,
      background: 'rgb(16,23,33)',
      color: '#fff',
      fontFamily: TIP_FONT,
      fontWeight: 400,
      fontSize: 12,
      lineHeight: '16px',
      padding: '12px 16px',
      borderRadius: 4,
      width: 'max-content',
      maxWidth,
      boxSizing: 'border-box',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: arrow
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, content)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Tooltip/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-crm/Components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// node: ui_kits/sales-crm/Components.jsx
// Building blocks for the Anarock Sales CRM.

const C = {
  violet: '#6161FF',
  violetDark: '#5656ED',
  violetDarker: '#4040BA',
  violetLightest: '#E8E8FF',
  violetLighter: '#C0C0FF',
  fg1: 'rgba(16,23,33,.94)',
  fg1Solid: '#101721',
  fg2: '#6B7785',
  fg3: '#9FA6B0',
  border: '#E0E0E0',
  borderSoft: '#EDEDED',
  bgApp: '#F2F2F2',
  bgSubtle: '#F7F7F9',
  white: '#FFFFFF',
  yellow: '#F3AA07',
  yellowL: '#FDF2DA',
  blue: '#1F69FF',
  blueL: '#DDE8FF',
  emerald: '#10AC60',
  emeraldL: '#DBF3E7',
  red: '#D32F02',
  redL: '#F9E0D9'
};
const FONT = '"Graphik", "Inter", system-ui, sans-serif';

// ── Inline icons ───────────────────────────────────────────────────────────
function Icon({
  name,
  size = 16,
  color = 'currentColor',
  stroke = 1.5
}) {
  const s = {
    width: size,
    height: size,
    display: 'inline-block',
    flex: 'none'
  };
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'search':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("circle", {
        cx: "7",
        cy: "7",
        r: "4.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M10.5 10.5L14 14"
      }));
    case 'cross':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 4l8 8M12 4l-8 8"
      }));
    case 'down':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 6l4 4 4-4"
      }));
    case 'right':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M6 4l4 4-4 4"
      }));
    case 'plus':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M8 3v10M3 8h10"
      }));
    case 'phone':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M3 4.5C3 9.2 6.8 13 11.5 13a1 1 0 0 0 1-1V10.4a.5.5 0 0 0-.4-.5l-2-.4a.5.5 0 0 0-.5.2L8.7 11A8.5 8.5 0 0 1 5 7.3l1.3-.9a.5.5 0 0 0 .2-.5l-.4-2A.5.5 0 0 0 5.6 3.5H4a1 1 0 0 0-1 1z"
      }));
    case 'mail':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("rect", {
        x: "2",
        y: "3.5",
        width: "12",
        height: "9",
        rx: "1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 4.5l5.5 4 5.5-4"
      }));
    case 'home':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 7.5L8 3l5.5 4.5V13a1 1 0 0 1-1 1H10v-4H6v4H3.5a1 1 0 0 1-1-1z"
      }));
    case 'lead':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "6",
        r: "2.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 13a5 5 0 0 1 10 0"
      }));
    case 'chart':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M3 13V3M13 13H3M6 11V7M9 11V5M12 11V9"
      }));
    case 'inbox':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2 9l1.5-5h9L14 9v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 9h3l1 1.5h4L11 9h3"
      }));
    case 'settings':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "8",
        r: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M8 1v2M8 13v2M3.5 3.5l1.5 1.5M11 11l1.5 1.5M1 8h2M13 8h2M3.5 12.5L5 11M11 5l1.5-1.5"
      }));
    case 'filter':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2 3.5h12L9.5 8.5V13l-3-1.5V8.5z"
      }));
    case 'more':
      return /*#__PURE__*/React.createElement("svg", {
        style: s,
        viewBox: "0 0 16 16",
        fill: color,
        stroke: "none"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "3.5",
        r: "1.4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "8",
        r: "1.4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "8",
        cy: "12.5",
        r: "1.4"
      }));
    case 'rupee':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M5 4h6M5 7h6M5 4c2.5 0 4 1 4 3s-1.5 3-4 3l5 3"
      }));
    case 'cal':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("rect", {
        x: "2.5",
        y: "3.5",
        width: "11",
        height: "10",
        rx: "1"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 6.5h11M5.5 2v3M10.5 2v3"
      }));
    case 'tag':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M2.5 8.5l5-5h5v5l-5 5z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "9.5",
        cy: "6.5",
        r: ".75",
        fill: color
      }));
    case 'bell':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M6.5 13.5a1.5 1.5 0 0 0 3 0"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M3.5 8.5L6.5 11.5 12.5 5"
      }));
    case 'doc':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M4 2h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 2v3h3"
      }));
    case 'ext':
      return /*#__PURE__*/React.createElement("svg", _extends({
        style: s,
        viewBox: "0 0 16 16"
      }, common), /*#__PURE__*/React.createElement("path", {
        d: "M9 3h4v4M13 3l-7 7M11 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3"
      }));
    default:
      return null;
  }
}

// ── Atoms ──────────────────────────────────────────────────────────────────
function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  leading,
  trailing,
  disabled,
  full
}) {
  const sizes = {
    md: {
      h: 40,
      px: 16,
      fs: 14
    },
    lg: {
      h: 50,
      px: 18,
      fs: 14
    },
    sm: {
      h: 32,
      px: 12,
      fs: 12
    }
  }[size];
  const variants = {
    primary: {
      background: disabled ? '#F3F3F3' : C.violet,
      color: disabled ? C.fg3 : '#fff',
      border: 'none'
    },
    outline: {
      background: '#fff',
      color: C.violet,
      border: `1px solid ${C.violet}`
    },
    secondary: {
      background: '#fff',
      color: C.fg2,
      border: `1px solid ${C.border}`
    },
    danger: {
      background: '#BD2900',
      color: '#fff',
      border: 'none'
    },
    ghost: {
      background: 'transparent',
      color: C.violet,
      border: 'none'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    style: {
      height: sizes.h,
      padding: `0 ${sizes.px}px`,
      fontSize: sizes.fs,
      fontFamily: FONT,
      fontWeight: 500,
      lineHeight: 1,
      borderRadius: 4,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: full ? '100%' : undefined,
      ...variants
    }
  }, leading, children, trailing);
}
function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  leading,
  trailing,
  type = 'text'
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: FONT
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: C.fg2
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 46,
      border: `1px solid ${error ? C.red : focus ? C.violet : C.border}`,
      boxShadow: focus ? '0 0 0 3px rgba(97,97,255,.16)' : 'none',
      borderRadius: 4,
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: '#fff',
      transition: 'all 120ms ease'
    }
  }, leading, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      fontFamily: FONT,
      fontSize: 14,
      color: C.fg1Solid,
      background: 'transparent',
      minWidth: 0
    }
  }), trailing), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.red
    }
  }, error));
}
function Badge({
  children,
  tone = 'gray',
  dot
}) {
  const tones = {
    violet: {
      bg: C.violetLightest,
      fg: C.violet
    },
    yellow: {
      bg: C.yellowL,
      fg: '#A37000'
    },
    blue: {
      bg: C.blueL,
      fg: C.blue
    },
    green: {
      bg: C.emeraldL,
      fg: '#0A7848'
    },
    red: {
      bg: C.redL,
      fg: '#A02400'
    },
    gray: {
      bg: C.bgSubtle,
      fg: C.fg2
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 3,
      fontFamily: FONT,
      fontSize: 12,
      fontWeight: 500,
      background: tones.bg,
      color: tones.fg,
      border: tone === 'gray' ? `1px solid ${C.border}` : 'none'
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
function Avatar({
  initials,
  size = 32,
  color
}) {
  const palette = ['#6161FF', '#1F69FF', '#10AC60', '#DC4276', '#ED754B', '#47C1BF'];
  const bg = color || palette[(initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % palette.length];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      color: '#fff',
      fontFamily: FONT,
      fontSize: size * 0.42,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, initials);
}
Object.assign(window, {
  C,
  FONT,
  Icon,
  Button,
  Input,
  Badge,
  Avatar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-crm/Components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-crm/Layout.jsx
try { (() => {
// node: ui_kits/sales-crm/Layout.jsx
// App chrome: top nav bar + filter sub-header + sidebar.

function TopNav({
  active = 'leads',
  user = 'PD'
}) {
  const items = [{
    id: 'home',
    label: 'Home',
    icon: 'home'
  }, {
    id: 'leads',
    label: 'Leads',
    icon: 'lead'
  }, {
    id: 'reports',
    label: 'Reports',
    icon: 'chart'
  }, {
    id: 'inbox',
    label: 'Inbox',
    icon: 'inbox'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50,
      background: C.violetDarker,
      color: '#fff',
      display: 'flex',
      alignItems: 'stretch',
      padding: '0 24px',
      fontFamily: FONT
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: 24,
      borderRight: '1px solid rgba(255,255,255,.18)',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '.05em'
    }
  }, "ANAROCK ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .55,
      marginLeft: 6,
      fontWeight: 500
    }
  }, "\xB7 Sales")), items.map(it => /*#__PURE__*/React.createElement("span", {
    key: it.id,
    style: {
      padding: '0 18px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      background: active === it.id ? C.violetDark : 'transparent',
      color: active === it.id ? '#fff' : 'rgba(255,255,255,.78)',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 16,
    color: "currentColor"
  }), it.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18,
    color: "rgba(255,255,255,.85)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#fff',
      color: C.violetDarker,
      fontWeight: 600,
      fontSize: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, user)));
}
function FilterBar({
  filters,
  active,
  onPick,
  count = '1-10 of 1941',
  onSearch,
  search
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderBottom: `1px solid ${C.border}`,
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      fontFamily: FONT
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: C.fg2,
      marginRight: 4
    }
  }, "Showing ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: C.fg1Solid,
      fontWeight: 600
    }
  }, count), " Leads"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 22,
      background: C.border,
      margin: '0 6px'
    }
  }), filters.map(f => {
    const on = active === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      onClick: () => onPick(f.id),
      style: {
        height: 36,
        padding: '0 14px',
        borderRadius: 3,
        fontSize: 12,
        fontWeight: 500,
        border: `1px solid ${on ? C.violet : C.border}`,
        color: on ? C.violet : C.fg2,
        background: on ? '#F4F4FF' : '#fff',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: FONT
      }
    }, f.label, f.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: on ? C.violet : C.fg1Solid
      }
    }, "\xB7 ", f.count));
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      height: 36,
      padding: '0 14px',
      borderRadius: 3,
      fontSize: 12,
      fontWeight: 500,
      border: `1px solid ${C.violet}`,
      color: C.violet,
      background: '#fff',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: FONT
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 14,
    color: C.violet
  }), "More Filters"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 36,
      padding: '0 12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      border: `1px solid ${C.border}`,
      borderRadius: 3,
      background: '#fff',
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 14,
    color: C.fg3
  }), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => onSearch(e.target.value),
    placeholder: "Search lead by name",
    style: {
      border: 'none',
      outline: 'none',
      flex: 1,
      fontFamily: FONT,
      fontSize: 13,
      color: C.fg1Solid
    }
  }))));
}
function Sidebar({
  active = 'all',
  onPick,
  items
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 220,
      background: '#fff',
      borderRight: `1px solid ${C.border}`,
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      fontFamily: FONT,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 20px 12px',
      fontSize: 11,
      fontWeight: 500,
      color: C.fg3,
      letterSpacing: '.06em',
      textTransform: 'uppercase'
    }
  }, "Pipeline"), items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onPick(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 20px',
        border: 'none',
        background: on ? C.violetLightest : 'transparent',
        color: on ? C.violet : C.fg1Solid,
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 13,
        fontWeight: on ? 600 : 500,
        fontFamily: FONT,
        borderLeft: on ? `3px solid ${C.violet}` : '3px solid transparent',
        paddingLeft: on ? 17 : 20
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 16,
      color: on ? C.violet : C.fg2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, it.label), it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: on ? C.violet : C.fg3,
        fontWeight: 500
      }
    }, it.count));
  }));
}
Object.assign(window, {
  TopNav,
  FilterBar,
  Sidebar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-crm/Layout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-crm/Leads.jsx
try { (() => {
// node: ui_kits/sales-crm/Leads.jsx
// Leads list (table form), Lead row, and the right-rail Lead-detail inspector.

const STAGES = [{
  id: 'new',
  label: 'New',
  tone: 'violet'
}, {
  id: 'qualified',
  label: 'Qualified',
  tone: 'blue'
}, {
  id: 'visit',
  label: 'Visit Pending',
  tone: 'yellow'
}, {
  id: 'visit-done',
  label: 'Visit Done',
  tone: 'blue'
}, {
  id: 'negotiation',
  label: 'Negotiation',
  tone: 'yellow'
}, {
  id: 'booked',
  label: 'Booked',
  tone: 'green'
}, {
  id: 'lost',
  label: 'Lost',
  tone: 'red'
}];
const SEED_LEADS = [{
  id: 'L-2401',
  name: 'Dinyar Viral Mehta',
  phone: '+91 98765 43210',
  email: 'dinyar.mehta@gmail.com',
  project: 'Lodha Park · Tower B',
  config: '3 BHK',
  budget: '₹2.40 Cr',
  stage: 'booked',
  source: 'Channel Partner',
  owner: 'PD',
  updated: '2h'
}, {
  id: 'L-2402',
  name: 'Rohit Mehta',
  phone: '+91 98233 45891',
  email: 'rohit.mehta@anarock.co',
  project: 'Oberoi Sky City',
  config: '2 BHK',
  budget: '₹1.85 Cr',
  stage: 'visit',
  source: 'Website',
  owner: 'AS',
  updated: '4h'
}, {
  id: 'L-2403',
  name: 'Priya Iyer',
  phone: '+91 98101 22334',
  email: 'priya.iyer@hotmail.com',
  project: 'Godrej Tropical Isle',
  config: '3 BHK',
  budget: '₹3.10 Cr',
  stage: 'negotiation',
  source: 'Referral',
  owner: 'PD',
  updated: '1d'
}, {
  id: 'L-2404',
  name: 'Akash Subramanian',
  phone: '+91 98765 11220',
  email: 'akash.s@outlook.com',
  project: 'Hiranandani Estate',
  config: '2 BHK',
  budget: '₹1.40 Cr',
  stage: 'qualified',
  source: 'Walk-in',
  owner: 'NK',
  updated: '1d'
}, {
  id: 'L-2405',
  name: 'Meera Pillai',
  phone: '+91 91234 56000',
  email: 'meera@gmail.com',
  project: 'Lodha Park · Tower A',
  config: '4 BHK',
  budget: '₹4.80 Cr',
  stage: 'visit-done',
  source: 'Channel Partner',
  owner: 'PD',
  updated: '2d'
}, {
  id: 'L-2406',
  name: 'Vikram Khanna',
  phone: '+91 98555 90011',
  email: 'vikram.k@gmail.com',
  project: 'Runwal Bliss',
  config: '2 BHK',
  budget: '₹1.65 Cr',
  stage: 'new',
  source: 'Website',
  owner: 'AS',
  updated: '3d'
}, {
  id: 'L-2407',
  name: 'Sneha Bhatt',
  phone: '+91 90011 22334',
  email: 'sneha.b@yahoo.in',
  project: 'Kalpataru Sparkle',
  config: '3 BHK',
  budget: '₹2.95 Cr',
  stage: 'lost',
  source: 'Referral',
  owner: 'NK',
  updated: '5d'
}, {
  id: 'L-2408',
  name: 'Arjun Reddy',
  phone: '+91 98019 88712',
  email: 'arjun.reddy@gmail.com',
  project: 'Prestige Falcon City',
  config: '3 BHK',
  budget: '₹2.20 Cr',
  stage: 'qualified',
  source: 'Channel Partner',
  owner: 'PD',
  updated: '6h'
}];
function StageBadge({
  stage
}) {
  const meta = STAGES.find(s => s.id === stage) || {
    label: stage,
    tone: 'gray'
  };
  return /*#__PURE__*/React.createElement(Badge, {
    tone: meta.tone,
    dot: true
  }, meta.label);
}
function LeadRow({
  lead,
  selected,
  onSelect
}) {
  const initials = lead.name.split(' ').map(s => s[0]).slice(0, 2).join('');
  return /*#__PURE__*/React.createElement("tr", {
    onClick: onSelect,
    style: {
      cursor: 'pointer',
      background: selected ? '#F4F4FF' : 'transparent',
      borderBottom: `1px solid ${C.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px 14px 24px',
      width: 28
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    onClick: e => e.stopPropagation(),
    style: {
      accentColor: C.violet
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: initials,
    size: 34
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: C.fg1Solid,
      lineHeight: '18px'
    }
  }, lead.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.fg2,
      lineHeight: '16px',
      marginTop: 2
    }
  }, lead.id, " \xB7 ", lead.phone)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px',
      fontSize: 13,
      color: C.fg1Solid
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500
    }
  }, lead.project), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.fg2,
      marginTop: 2
    }
  }, lead.config)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px',
      fontSize: 13,
      color: C.fg1Solid,
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 500
    }
  }, lead.budget), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px'
    }
  }, /*#__PURE__*/React.createElement(StageBadge, {
    stage: lead.stage
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px',
      fontSize: 12,
      color: C.fg2
    }
  }, lead.source), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 12px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: lead.owner,
    size: 26
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '14px 24px 14px 12px',
      fontSize: 12,
      color: C.fg3,
      textAlign: 'right'
    }
  }, lead.updated, " ago"));
}
function LeadsTable({
  leads,
  selectedId,
  onSelect
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: `1px solid ${C.border}`,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: FONT
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: C.bgSubtle,
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '12px 12px 12px 24px',
      width: 28
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    style: {
      accentColor: C.violet
    }
  })), ['Lead', 'Project', 'Budget', 'Stage', 'Source', 'Owner', 'Updated'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: i === 6 ? 'right' : 'left',
      padding: '12px',
      paddingRight: i === 6 ? 24 : 12,
      fontSize: 11,
      fontWeight: 500,
      color: C.fg2,
      textTransform: 'uppercase',
      letterSpacing: '.04em'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, leads.map(l => /*#__PURE__*/React.createElement(LeadRow, {
    key: l.id,
    lead: l,
    selected: l.id === selectedId,
    onSelect: () => onSelect(l.id)
  })))));
}

// ── Lead detail right-rail inspector ───────────────────────────────────────
function LeadDetail({
  lead,
  onClose,
  onAdvance
}) {
  const initials = lead.name.split(' ').map(s => s[0]).slice(0, 2).join('');
  const stages = STAGES.filter(s => !['lost'].includes(s.id));
  const stageIndex = stages.findIndex(s => s.id === lead.stage);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 460,
      background: '#fff',
      borderLeft: `1px solid ${C.border}`,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: FONT,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      borderBottom: `1px solid ${C.borderSoft}`,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: initials,
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      color: C.fg1Solid,
      lineHeight: '24px'
    }
  }, lead.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.fg2,
      marginTop: 2
    }
  }, lead.id, " \xB7 ", lead.source), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(StageBadge, {
    stage: lead.stage
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cross",
    size: 16,
    color: C.fg2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: `1px solid ${C.borderSoft}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: C.fg3,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      marginBottom: 12
    }
  }, "Pipeline"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0
    }
  }, stages.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.id
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      flex: '0 0 auto',
      minWidth: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: i <= stageIndex ? C.violet : '#fff',
      border: `1.5px solid ${i <= stageIndex ? C.violet : C.border}`,
      color: '#fff',
      fontSize: 11,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600
    }
  }, i < stageIndex ? '✓' : i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: i <= stageIndex ? C.fg1Solid : C.fg3,
      fontWeight: i === stageIndex ? 600 : 500,
      textAlign: 'center'
    }
  }, s.label)), i < stages.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: i < stageIndex ? C.violet : C.border,
      marginTop: -16
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: `1px solid ${C.borderSoft}`,
      display: 'grid',
      gridTemplateColumns: '110px 1fr',
      rowGap: 12,
      columnGap: 16
    }
  }, [['Phone', /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 14,
    color: C.fg2
  }), lead.phone)], ['Email', /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 14,
    color: C.fg2
  }), lead.email)], ['Project', /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500
    }
  }, lead.project)], ['Config', lead.config], ['Budget', /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: C.fg1Solid
    }
  }, lead.budget)], ['Owner', /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: lead.owner,
    size: 22
  }), " ", lead.owner)]].map(([k, v]) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.fg2
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.fg1Solid
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      flex: 1,
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: C.fg3,
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      marginBottom: 12
    }
  }, "Recent activity"), [{
    who: lead.owner,
    what: `Moved to ${STAGES.find(s => s.id === lead.stage).label}`,
    when: `${lead.updated} ago`
  }, {
    who: lead.owner,
    what: 'Logged a call · 4 min',
    when: 'yesterday'
  }, {
    who: 'AS',
    what: 'Sent brochure for ' + lead.project,
    when: '2d ago'
  }, {
    who: lead.owner,
    what: 'Created lead from ' + lead.source,
    when: '4d ago'
  }].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      paddingBottom: 14,
      marginBottom: 14,
      borderBottom: i < 3 ? `1px solid ${C.borderSoft}` : 'none'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    initials: a.who,
    size: 28
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.fg1Solid
    }
  }, a.what), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.fg3,
      marginTop: 2
    }
  }, a.who, " \xB7 ", a.when))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 24px',
      borderTop: `1px solid ${C.borderSoft}`,
      background: '#fff',
      boxShadow: '0 0 2px rgba(16,23,33,.08), 0 0 8px rgba(16,23,33,.06)',
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 14,
      color: C.violet
    })
  }, "Call"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    leading: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 14,
      color: C.violet
    })
  }, "Email"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onAdvance,
    trailing: /*#__PURE__*/React.createElement(Icon, {
      name: "right",
      size: 14,
      color: "#fff"
    })
  }, "Advance Stage")));
}
Object.assign(window, {
  STAGES,
  SEED_LEADS,
  StageBadge,
  LeadRow,
  LeadsTable,
  LeadDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-crm/Leads.jsx", error: String((e && e.message) || e) }); }

// ui_kits/sales-crm/browser-window.jsx
try { (() => {
// Chrome.jsx — Simplified Chrome browser window (dark theme, macOS)
// No dependencies, no image assets. All inline styles + inline SVG.

const CHROME_C = {
  barBg: '#202124',
  tabBg: '#35363a',
  text: '#e8eaed',
  dim: '#9aa0a6',
  urlBg: '#282a2d'
};
function ChromeTrafficLights() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '0 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#ff5f57'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#febc2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#28c840'
    }
  }));
}

// Single tab (active has curved scoops)
function ChromeTab({
  title = 'New Tab',
  active = false
}) {
  const curve = flip => /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "10",
    viewBox: "0 0 8 10",
    style: {
      position: 'absolute',
      bottom: 0,
      [flip ? 'right' : 'left']: -8,
      transform: flip ? 'scaleX(-1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 10C2 9 6 8 8 0V10H0Z",
    fill: CHROME_C.tabBg
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 34,
      alignSelf: 'flex-end',
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: active ? CHROME_C.tabBg : 'transparent',
      borderRadius: '8px 8px 0 0',
      minWidth: 120,
      maxWidth: 220,
      fontFamily: 'system-ui, sans-serif',
      fontSize: 12,
      color: active ? CHROME_C.text : CHROME_C.dim
    }
  }, active && curve(false), active && curve(true), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: '#5f6368',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title));
}
function ChromeTabBar({
  tabs = [{
    title: 'New Tab'
  }],
  activeIndex = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      height: 44,
      background: CHROME_C.barBg,
      paddingRight: 8
    }
  }, /*#__PURE__*/React.createElement(ChromeTrafficLights, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      height: '100%',
      paddingLeft: 4,
      flex: 1
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement(ChromeTab, {
    key: i,
    title: t.title,
    active: i === activeIndex
  }))));
}
function ChromeToolbar({
  url = 'example.com'
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: CHROME_C.dim,
      opacity: 0.4
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      background: CHROME_C.tabBg,
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '0 8px'
    }
  }, iconDot, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 30,
      borderRadius: 15,
      background: CHROME_C.urlBg,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 14px',
      margin: '0 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: CHROME_C.dim,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: CHROME_C.text,
      fontSize: 13,
      fontFamily: 'system-ui, sans-serif'
    }
  }, url)), iconDot);
}
function ChromeWindow({
  tabs = [{
    title: 'New Tab'
  }],
  activeIndex = 0,
  url = 'example.com',
  width = 900,
  height = 600,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 10,
      overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      background: CHROME_C.tabBg
    }
  }, /*#__PURE__*/React.createElement(ChromeTabBar, {
    tabs: tabs,
    activeIndex: activeIndex
  }), /*#__PURE__*/React.createElement(ChromeToolbar, {
    url: url
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#fff',
      overflow: 'auto'
    }
  }, children));
}
Object.assign(window, {
  ChromeWindow,
  ChromeTabBar,
  ChromeToolbar,
  ChromeTab,
  ChromeTrafficLights
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/sales-crm/browser-window.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.AnarockLogo = __ds_scope.AnarockLogo;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DateFilter = __ds_scope.DateFilter;

__ds_ns.DropdownOption = __ds_scope.DropdownOption;

__ds_ns.DropdownPanel = __ds_scope.DropdownPanel;

__ds_ns.Dropdown = __ds_scope.Dropdown;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.FilterSectionRow = __ds_scope.FilterSectionRow;

__ds_ns.FilterDrawer = __ds_scope.FilterDrawer;

__ds_ns.FilterSection = __ds_scope.FilterSection;

__ds_ns.GlobalFilter = __ds_scope.GlobalFilter;

__ds_ns.GlobalNavBar = __ds_scope.GlobalNavBar;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.KebabMenu = __ds_scope.KebabMenu;

__ds_ns.LeadDrawer = __ds_scope.LeadDrawer;

__ds_ns.LeadList = __ds_scope.LeadList;

__ds_ns.List = __ds_scope.List;

__ds_ns.LocalNavBar = __ds_scope.LocalNavBar;

__ds_ns.UploadDropzone = __ds_scope.UploadDropzone;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.QuickFilters = __ds_scope.QuickFilters;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.ReportList = __ds_scope.ReportList;

__ds_ns.SearchField = __ds_scope.SearchField;

__ds_ns.SelectionBar = __ds_scope.SelectionBar;

__ds_ns.SideNav = __ds_scope.SideNav;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Star = __ds_scope.Star;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
