# angular-expandable-list-selector
This is a custom directive that will expand tree data into a selectable list.  It will expand as long as there's data to display. This directive currently requires jQuery.

## Usage
Add angular-expandable-list-selector.js and include "list-selector" in your app module dependencies.  Make sure to add the styles.css to your styles.  Then include
    
    <div class="expand-list" expand-list="data" selection="selected"></div>

pass your data into the expand-list attribute and your selection is returned via the selection attribute.


Your data must have the following format:

    data = [
      {
        id: 0,
        value: "Red",
        collection: []
      }
    ]

Value is what is displayed to click on and collection is where you continue to nest this structure to keep creating branches in the list.
If collection is empty, this tells the list that this is an available item for selection.

## Demo

http://mikemike26.github.io/angular-expandable-list-selector/
<img src="/demo/example.png" width="390" height="209">


## Notes:

The included css is just to animate the list, you will need to style it for your needs for production

### TODO
1. hook into ngModel
2. remove jquery as a requirement
3. output whole data object instead of just value

