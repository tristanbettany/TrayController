const colors = require('tailwindcss/colors')

let SpacingObject = {};
let Spacing = 1;
for (i = 0; i <= 100; i++) {
    SpacingObject[(Spacing * i) + 'px'] = (Spacing * i) + 'px';
    SpacingObject[(Spacing * i) + '%'] = (Spacing * i) + '%';
}

let FontSizeObject = {};
let Size = 1;
for (i = 0; i <= 200; i++) {
    FontSizeObject[(Size * i) + 'px'] = (Size * i) + 'px';
}

module.exports = {
    purge: false,
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            appearance: ['hover', 'focus'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#1A1A1A',
            white: colors.white,
            offWhite: '#FAFAFA',
            gray: {
                faint: '#FBFBFB',
                lighter: '#F3F3F3',
                light: '#E5E5E5',
                medium: '#EDEDED',
            },
            pri: '#004275',
            warn: '#FFF4CE',
            strokeDark: '#8B8B8B'
        },
        spacing: SpacingObject,
        fontSize: FontSizeObject,
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
    plugins: [],
}
