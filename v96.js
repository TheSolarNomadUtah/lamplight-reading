// v96: at phone width, the floating Home button (parked at bottom:56px by v21)
// no longer covers the Lamp effect intro on Kids. Start-edge padding matches
// the v86 Look Up clearance; bottom padding lets the Save row scroll clear.
document.head.insertAdjacentHTML('beforeend',`<style id="v96css">
@media (max-width:640px){
  body.v20float #kids,body.bedtime #kids{padding-bottom:calc(56px + 44px + 20px)}
  body.v20float #kids [data-fx89-picker] > p.soft,
  body.bedtime #kids [data-fx89-picker] > p.soft,
  body.v20float #kids [data-flame81-picker] > p.soft,
  body.bedtime #kids [data-flame81-picker] > p.soft{padding-inline-start:60px}
}
</style>`);
