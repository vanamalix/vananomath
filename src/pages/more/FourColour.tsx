import { Ext, PageHead, Step } from '../../components/Shell';
import { M, MD } from '../../tex';

const SRC = {
  thomas: 'https://people.math.gatech.edu/~thomas/FC/fourcolor.html',
  appelHaken: 'https://doi.org/10.1215/ijm/1256049011',
  rsst: 'https://doi.org/10.1006/jctb.1997.1750',
  gonthier: 'https://www.ams.org/notices/200811/tx081101382p.pdf',
  mactutor: 'https://mathshistory.st-andrews.ac.uk/HistTopics/The_four_colour_theorem/',
  code: 'https://github.com/rocq-community/fourcolor',
};

export function FourColour() {
  return (
    <article>
      <PageHead
        kicker="Graph theory · Appel and Haken · 1976"
        title="The Four Colour Theorem"
        lede={<>Any map can be coloured with just four colours so that countries sharing a border get different colours. Easy to state, posed in 1852, and in 1976 the first major theorem whose proof relied on a computer.</>}
      />
      <div className="vn-container prose">
        <aside className="status" aria-labelledby="status-h">
          <h2 id="status-h">At a glance</h2>
          <dl>
            <dt>Who and when</dt>
            <dd>Kenneth Appel and Wolfgang Haken announced the proof in 1976 and published it in two parts in 1977, the second with John Koch (<Ext href={SRC.appelHaken}>Part I</Ext>). Neil Robertson, Daniel Sanders, Paul Seymour and Robin Thomas published a simpler computer proof in <Ext href={SRC.rsst}>1997</Ext>.</dd>
            <dt>Checked</dt>
            <dd>Georges Gonthier finished a complete formal proof in the Coq proof assistant (now called Rocq) in 2005, covering the computer checks and the mathematics around them (<Ext href={SRC.gonthier}>his account</Ext>). The <Ext href={SRC.code}>code is public</Ext>.</dd>
            <dt>Status</dt>
            <dd>Settled. No human has checked every case by hand, and nobody expects to.</dd>
          </dl>
        </aside>

        <h2 id="what">What it says</h2>
        <p>Draw any map on a flat sheet of paper, with each country in one piece. You can colour it with at most four colours so that any two countries sharing a stretch of border get different colours. Countries that meet only at a single point, like a pizza’s slices at the centre, don’t count as neighbours.</p>
        <p>Four is really needed: four countries that all touch each other (one in the middle, three round it) need four colours. The theorem says you never need a fifth.</p>

        <h2 id="history">A long history of near misses</h2>
        <p>Francis Guthrie posed the question in 1852 and it reached Augustus De Morgan, who wrote about it to Hamilton the same day (<Ext href={SRC.mactutor}>MacTutor</Ext>). Alfred Kempe published a proof in 1879. Eleven years later Percy Heawood found a flaw in it, while showing that five colours always suffice. Kempe’s key idea, now called a <em>Kempe chain</em>, survived and is part of the modern proof.</p>

        <h2 id="why">Why it matters</h2>
        <p>Not for cartographers, who rarely care. It matters because of how it was proved. The argument needed far more case checking than any person could do, so for the first time mathematicians had to decide whether to accept a proof that relied on a computer. That debate led, eventually, to proofs checked entirely by software, the same approach behind the Lean proofs elsewhere on this site.</p>

        <h2 id="proof">The proof, as a map</h2>
        <p className="note">This is a map of the proof, not the proof. Steps 1 to 4 are complete and short. Steps 5 to 7 describe what the computer work does, following Robin Thomas’s <Ext href={SRC.thomas}>summary of the 1997 proof</Ext>, which uses the same strategy as Appel and Haken.</p>
        <ol className="steps">
          <Step n={1} title="Turn the map into a network">
            <p>Put a dot in each country, and join two dots with a line when the countries share a border. The lines can be drawn without crossing. Colouring countries is now colouring dots so that joined dots differ. A network drawn like this is called a <em>planar graph</em>.</p>
          </Step>

          <Step n={2} title="Fill in the gaps">
            <p>Add extra lines until every region of the drawing is a triangle. Extra lines only add restrictions, so if every such <em>triangulation</em> can be four-coloured, every planar graph can.</p>
          </Step>

          <Step n={3} title="Take the smallest counterexample">
            <p>Suppose the theorem were false. Then there would be a triangulation needing five colours with as few dots as possible. Call it a <em>minimal counterexample</em>. The whole proof is about showing it can’t exist.</p>
          </Step>

          <Step n={4} title="Euler’s formula forces small degrees">
            <p>The <em>degree</em> of a dot is how many lines meet there. For a triangulation with <M t="V" /> dots, Euler’s formula <M t="V - E + F = 2" /> gives <M t="E = 3V - 6" /> lines. The degrees add up to <M t="2E" />, so</p>
            <MD t="\sum_{\text{dots } v} \bigl(6 - \deg v\bigr) = 6V - 2E = 12" />
            <p>That total is positive, so some dots have degree 5 or less. In other words, every triangulation contains certain small local patterns. This is the fact everything else builds on.</p>
          </Step>

          <Step n={5} title="Reducible configurations">
            <p>A <em>configuration</em> is a small patch of a triangulation. It is <em>reducible</em> if it can’t appear in a minimal counterexample: you could remove it, four-colour the smaller graph, and then (using Kempe chains to swap colours where needed) extend the colouring back. A dot of degree 4 or less is reducible, which Kempe got right. A dot of degree 5 is where his argument broke. The fix is to use bigger configurations. Checking that one is reducible means checking every possible colouring of the ring around it, far too many to do by hand for the larger ones. That is the job for the computer.</p>
          </Step>

          <Step n={6} title="An unavoidable set, by discharging">
            <p>The other half of the proof, much of which can be checked by hand, is to show that every triangulation contains at least one configuration from a fixed list. Give each dot a <em>charge</em> of <M t="6 - \deg v" />, which by step 4 totals 12. Then move charge between neighbouring dots according to fixed <em>discharging rules</em>, which never change the total. Show that if none of the listed configurations appears, every dot ends up with charge 0 or less. That would make the total at most 0, not 12. So some listed configuration must appear.</p>
          </Step>

          <Step n={7} title="Put the two halves together">
            <p>Every triangulation contains a configuration from the list (step 6), and none of those can appear in a minimal counterexample (step 5). So there is no minimal counterexample, and the theorem is true. Appel and Haken’s list had 1,476 configurations and their rules ran to more than 300. The 1997 proof used 633 configurations and 32 rules, both figures from <Ext href={SRC.thomas}>Thomas’s page</Ext>.</p>
          </Step>
        </ol>

        <h2 id="checked">From a computer’s word to a checked proof</h2>
        <p>The worry about Appel and Haken was never that the idea was wrong. It was that the programs, and the hand-checked parts, might contain errors nobody would notice. The 1997 proof reduced the hand-checking and made the programs easier to rerun independently.</p>
        <p>Gonthier went further. He wrote the statement and the entire proof, including the computer checks of all 633 configurations, inside Coq, a proof assistant whose small core checks every step. He reports that this needed new mathematics of its own, a combinatorial description of planar maps called <em>hypermaps</em>, because a formal proof can’t lean on pictures. Since 2005 you no longer have to trust the original programs. You trust Coq’s small checking core instead, which is far easier to scrutinise.</p>

        <h2 id="sources">Sources</h2>
        <ul>
          <li>K. Appel and W. Haken, <Ext href={SRC.appelHaken}>Every planar map is four colorable. Part I: Discharging</Ext>, <em>Illinois Journal of Mathematics</em> 21 (1977)</li>
          <li>N. Robertson, D. Sanders, P. Seymour and R. Thomas, <Ext href={SRC.rsst}>The Four-Colour Theorem</Ext>, <em>Journal of Combinatorial Theory, Series B</em> 70 (1997), with Thomas’s <Ext href={SRC.thomas}>plain summary</Ext></li>
          <li>G. Gonthier, <Ext href={SRC.gonthier}>Formal Proof: The Four-Color Theorem</Ext>, <em>Notices of the AMS</em> 55, no. 11 (2008)</li>
          <li><Ext href={SRC.mactutor}>MacTutor: The four colour theorem</Ext></li>
        </ul>
      </div>
    </article>
  );
}
