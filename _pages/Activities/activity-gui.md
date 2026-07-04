---
layout: activity
permalink: /Activities/GUI
title: "CS375: Software Engineering - GUI"


info:
  goals:
    - To implement a Progressive Web App (PWA) in JavaScript, HTML5, and CSS
    - To create interactive user interfaces using Python
    - To explain best practices in developing user interfaces for usability
    - To choose a color palette for a user interface and verify its contrast and color-blind accessibility against WCAG guidelines

  models:
    - model: |
        Review the example below as a class.
      title: A Static Progressive Web App for Mobile Clients
      questions:
        - How do we name elements in HTML5 for dynamic updating?  What is the name of the main body element that we're updating?
        - What JavaScript command is used to set the content of a web page element?
        - How do we define each list item to be a box?
        - How do we ensure that each box appears in a dynamically-sized grid?
        - How do we intercept a fetch and serve the content locally, serving as a cache?
        - Load the web page in a Chrome browser on your mobile device, if you have one.  From the Chrome menu, you can add the app to your home screen.  Try changing the navigation color and the home screen icon.
      embed: <iframe height="800px" width="100%" src="https://www.billmongan.com/Ursinus-CS375/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2Fpwa-example-static-linkclass.zip&title=pwa%20example%20static%20linkclass" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>  
    - model: |
      title: A Dynamic PWA Using a Backend Web Service
      embed: <iframe height="400px" width="100%" src="https://www.billmongan.com/Ursinus-CS375/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2Fpwa-example-dynamic.zip&title=pwa%20example%20dynamic" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe><br /><br /><iframe height="400px" width="100%" src="https://www.billmongan.com/Ursinus-CS375/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2Fpwa-example-server.zip&title=pwa%20example%20server" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>          
      questions:
        - "In <code>script.js</code>, where has the <code>courses</code> array gone?"
        - How has the service worker changed to intercept fetches and forward them to the web server if they are remote data calls?
        - What would happen if the server side data changed?  What could we do about this?  
    - model: |
        <iframe width="560" height="315" src="https://www.youtube.com/embed/wuzV9P8geDg" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      title: "Application Graphical User Interface (GUI) with Python"
      embed: <iframe height="400px" width="100%" src="https://www.billmongan.com/Ursinus-CS375/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FGUIExample.zip&title=GUIExample" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>
      questions:
        - "In your own words, what is a callback function?"
        - "Design a GUI using <code>pygubu-designer</code> with an input and a display element, and connect them with a callback."
        - "Choose a UI design basic principle and describe it in your own words with an example.  You may draw a sketch or use PowerPoint to do this."

  additional_reading:
    - link: "https://www.usability.gov/what-and-why/user-interface-design.html"
      title: "User Interface Design Basics from usability.gov"
    - link: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
      title: "Understanding WCAG Contrast (Minimum)"
    - link: "https://webaim.org/resources/contrastchecker/"
      title: "WebAIM Contrast Checker"
    - link: "https://coolors.co/"
      title: "Coolors Palette Generator"
    - link: "https://davidmathlogic.com/colorblind/"
      title: "Coblis-style Color Blindness Palette Simulator"

tags:
  - gui
  - pwa
  - html5
  - javascript
  - css  

---

## Choosing Colors: Palettes, Contrast, and Accessibility

Color is one of the first things a user notices about your interface, and one of the first things teams get wrong -- either by using every color at once, or by choosing combinations that a meaningful fraction of users literally cannot read.  Fortunately, color choice is one place where design has *rules you can compute*.

### Building a Palette

Do not pick colors one widget at a time; pick a **palette** (a small, fixed set of colors) up front and reuse it everywhere -- consistency is itself a usability feature.  Tools like [Coolors](https://coolors.co/), [Adobe Color](https://color.adobe.com/), and [Material Design's palette builder](https://m2.material.io/design/color/the-color-system.html) generate harmonious palettes from a single starting color, using color-wheel relationships (complementary, analogous, triadic).

A time-tested allocation is the **60-30-10 rule**, borrowed from interior design:

| Share | Role | Example in a web app |
|-------|------|----------------------|
| 60% | Dominant/neutral color | Page and card backgrounds |
| 30% | Secondary color | Navigation bars, headers, panels |
| 10% | Accent color | Buttons, links, highlights, alerts |

Because the accent color is scarce, it *pops*: the user's eye goes exactly where you want it (the "Submit" button, the error message).  If everything is an accent, nothing is.

### Contrast You Can Calculate: WCAG

The Web Content Accessibility Guidelines (WCAG) define a measurable **contrast ratio** between text and its background:

```
contrast = (L1 + 0.05) / (L2 + 0.05)
```

where `L1` and `L2` are the **relative luminances** (perceived brightness, 0 for black to 1 for white) of the lighter and darker color, respectively.  Relative luminance is a weighted sum of the linearized R, G, B channels:

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
```

(each channel is first converted from its 0-255 value to a 0-1 value `c'`, and then gamma-corrected: `c = ((c' + 0.055) / 1.055) ^ 2.4` when `c'` is above 0.03928, else `c = c' / 12.92`).  Notice green dominates the weights -- human eyes are most sensitive to green.

The ratio ranges from 1:1 (identical colors) to 21:1 (black on white).  WCAG requires, for **Level AA** conformance:

* **4.5:1** minimum for normal body text
* **3:1** minimum for large text (18pt+, or 14pt bold) and for UI components/icons
* **7:1** for the stricter Level AAA body text

**Worked example:** medium gray text `#767676` on a white background.  All three channels are `118/255 = 0.4627`; gamma-corrected, `c = ((0.4627 + 0.055) / 1.055) ^ 2.4 = 0.1811`, and since the three weights sum to 1, `L_gray = 0.1811`.  White has `L = 1.0`.  Then `contrast = (1.0 + 0.05) / (0.1811 + 0.05) = 4.54` -- this gray *barely* passes AA for body text; anything lighter fails.  You do not have to do this by hand: paste any foreground/background pair into the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) and it computes the ratio and pass/fail for you.  But now you know what the number means.

### Designing for Color Blindness

About 8% of men and 0.5% of women have some form of color-vision deficiency, most commonly reduced ability to distinguish **red from green**.  Practical rules:

1. **Never encode information in color alone.**  Pair color with a second cue: an icon, a label, a pattern, or position (a red X *and* the word "failed").  This is also a WCAG requirement ("Use of Color").
2. **Avoid red/green as a distinguishing pair**; blue/orange is the classic safe alternative.
3. **Test your palette in a simulator** such as [davidmathlogic.com/colorblind](https://davidmathlogic.com/colorblind/) or the Coblis simulator, which re-render your colors as they appear under protanopia, deuteranopia, and tritanopia.
4. When in doubt, start from a published color-blind-safe palette such as [Paul Tol's palettes](https://sronpersonalpages.nl/~pault/) or [ColorBrewer](https://colorbrewer2.org/) (designed for maps and charts).

### Questions

1. Choose a palette for your course project using one of the generator tools, allocate it with the 60-30-10 rule, and record the hex codes in your Objects/API Summary design checklist.
2. Verify your body-text color against your background color with the WebAIM checker.  What is the ratio?  Does it meet AA?  AAA?
3. Run your palette through a color-blindness simulator.  Do any two colors that *mean different things* in your UI become indistinguishable?  What second cue (icon, label, pattern) will you add?
4. Find a real website that fails one of these guidelines, take a screenshot, and propose the smallest fix that would bring it into conformance.
