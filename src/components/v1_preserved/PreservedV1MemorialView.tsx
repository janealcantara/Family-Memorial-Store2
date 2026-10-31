import React from 'react';
import { MemorialHero } from '../MemorialHero';
import { RelationshipCurations } from '../RelationshipCurations';
import { GardenInspiredSection } from '../GardenInspiredSection';
import { SelectedForFamilySection } from '../SelectedForFamilySection';
import { MemorialJewelrySection } from '../MemorialJewelrySection';
import { FamilyAssistanceSection } from '../FamilyAssistanceSection';
import { TributeProduct } from '../../types';

/**
 * PRESERVED BACKUP: Version 1 Full Memorial & Tribute View
 *
 * This component preserves the original Version 1 design, editorial biographies,
 * memorial heroes, relationship-curated showcases, and tribute layouts intact.
 * It is kept as an archival backup for future reference while Version 2 (Boutique Store)
 * serves as the permanent default customer-facing experience.
 */
interface PreservedV1MemorialViewProps {
  onSelectProduct: (product: TributeProduct) => void;
  onOpenServiceInfo: () => void;
  onOpenSanctuary: () => void;
}

export const PreservedV1MemorialView: React.FC<PreservedV1MemorialViewProps> = ({
  onSelectProduct,
  onOpenServiceInfo,
  onOpenSanctuary,
}) => {
  return (
    <div className="v1-preserved-experience">
      {/* Section 1: Personalized Memorial Introduction */}
      <MemorialHero
        onOpenServiceInfo={onOpenServiceInfo}
        onOpenSanctuary={onOpenSanctuary}
      />

      {/* Section 2: Something Special for Everyone Who Loved Margaret */}
      <RelationshipCurations onSelectProduct={onSelectProduct} />

      {/* Section 3: Inspired by Her Love of Gardening & Roses */}
      <GardenInspiredSection onSelectProduct={onSelectProduct} />

      {/* Section 4: Chosen with Your Family in Mind */}
      <SelectedForFamilySection onSelectProduct={onSelectProduct} />

      {/* Section 5: Little Ways to Keep Margaret Close */}
      <MemorialJewelrySection onSelectProduct={onSelectProduct} />

      {/* Section 6: We're Here to Help Your Family */}
      <FamilyAssistanceSection
        onContact={() => {
          window.location.href = 'tel:5558492100';
        }}
      />
    </div>
  );
};
