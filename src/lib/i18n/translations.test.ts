import { describe, it, expect } from 'vitest';
import { translations } from './translations';

describe('i18n Translation Consistency', () => {
    const enKeys = Object.keys(translations.en);
    const arKeys = Object.keys(translations.ar);

    it('has the same top-level namespaces in both languages', () => {
        expect(enKeys.sort()).toEqual(arKeys.sort());
    });

        enKeys.forEach(namespace => {
        it(`namespace "${namespace}" has matching keys in both languages`, () => {
            const enNamespaceKeys = Object.keys(translations.en[namespace as keyof typeof translations.en]);
            const arNamespaceKeys = Object.keys(translations.ar[namespace as keyof typeof translations.ar]);
            
            // Check for missing keys in Arabic
            const missingInAr = enNamespaceKeys.filter(key => !arNamespaceKeys.includes(key));
            // Check for extra keys in Arabic (not in English)
            const missingInEn = arNamespaceKeys.filter(key => !enNamespaceKeys.includes(key));

            expect(missingInAr, `Missing keys in Arabic for namespace "${namespace}": ${missingInAr.join(', ')}`).toEqual([]);
            expect(missingInEn, `Extra keys in Arabic for namespace "${namespace}" not found in English: ${missingInEn.join(', ')}`).toEqual([]);
        });
    });
});
