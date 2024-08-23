import classes from "./pricing.module.css";

function Pricing() {
  return (
    <div className={classes.container}>
      <img
        className={classes.smiling_guy}
        src="https://sconchun.sirv.com/happy%20guy.png"
        alt="a guy smiling in dark orange background"
      />

      {/* free account */}
      <div className={classes.free_artiste_container}>
        <p className={classes.heading}>Free Account</p>
        <ul>
          <li className={classes.list}>Unlimited number of songs</li>
          <li className={classes.list}>You keep 80% royalty</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Youtube monetization</li>
          <li className={classes.list}>
            Payment direct to your bank accountUnlimited number of songs
          </li>
          <li className={classes.list}>Song get distributed within 12days</li>
        </ul>
      </div>

      {/* independent artiste */}
      <div className={classes.independent_artiste_container}>
        <p className={classes.heading}>Independent Artiste</p>
        <ul>
          <li className={classes.list}>Unlimited distribution</li>
          <li className={classes.list}>You keep 100% royalty</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Royalty split payment</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Youtube monetization</li>
          <li className={classes.list}>Dedicated support team</li>
          <li className={classes.list}>Playlist pitching</li>
          <li className={classes.list}>Free smart link for all of these</li>
          <li className={classes.list}>Daily streaming stats</li>
          <li className={classes.list}>
            Customizable release & pre-order date
          </li>
          <li className={classes.list}>Payment direct to your bank account</li>
        </ul>
      </div>

      {/* mini-label account */}
      <div className={classes.mini_label__artiste_container}>
        <p className={classes.heading}>Mini-Label Artiste</p>
        <ul>
          <li className={classes.list}>Up to 10 artiste</li>
          <li className={classes.list}>You keep 100% royalty</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Royalty split payment</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Youtube monetization</li>
          <li className={classes.list}>Dedicated support team</li>
          <li className={classes.list}>Playlist pitching</li>
          <li className={classes.list}>Free smart link for all of these</li>
          <li className={classes.list}>Song get distributed within 48hours</li>
          <li className={classes.list}>
            Customizable release & pre-order date
          </li>
          <li className={classes.list}>Payment direct to your bank account</li>
        </ul>
      </div>

      {/* label account */}
      <div className={classes.label__artiste_container}>
        <p className={classes.heading}>Mini-Label Artiste</p>
        <ul>
          <li className={classes.list}>Unlimited artiste</li>
          <li className={classes.list}>Unlimited distribution</li>
          <li className={classes.list}>You keep 100% royalty</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Royalty split payment</li>
          <li className={classes.list}>Free barcode & ISRC</li>
          <li className={classes.list}>Youtube monetization</li>
          <li className={classes.list}>Dedicated support team</li>
          <li className={classes.list}>Playlist pitching</li>
          <li className={classes.list}>Free smart link for all of these</li>
          <li className={classes.list}>Song get distributed within 48hours</li>
          <li className={classes.list}>
            Customizable release & pre-order date
          </li>
          <li className={classes.list}>Customizable ISRC codes</li>
          <li className={classes.list}>Payment direct to your bank account</li>
        </ul>
      </div>
    </div>
  );
}
export default Pricing;
