angular.module('sample-app').factory('sampleData', function() {
  return [
    {
      id: 0,
      type: 'category',
      value: "Red",
      collection: [
        {
          id: 0,
          type: "brand",
          value: "Apples",
          collection: [
            {
              id: 0,
              type: "category",
              value: "Sweet",
              collection: [
                {
                  id: 0,
                  type: "product",
                  value: "Fuji"
                },
                {
                  id: 1,
                  type: "product",
                  value: "Red Delicous"
                }
              ]
            },
            {
              id: 1,
              type: "category",
              value: "Tart",
              collection: [
                {
                  id: 0,
                  type: "product",
                  value: "Granny Smith"
                },
                {
                  id: 1,
                  type: "product",
                  value: "Macintosh"
                }
              ]
            }
          ]
        },
        {
          id: 1,
          type: "brand",
          value: "Oranges",
          collection: [
            {
              id: 0,
              type: "product",
              value: "Florida Oranges"
            },
            {
              id: 1,
              type: "product",
              value: "Valencia"
            }
          ]
        }
      ]
    },
    {
      id: 0,
      type: 'category',
      value: "Green",
      collection: [
        {
          id: 0,
          type: "brand",
          value: "Broccoli",
          collection: [
            {
              id: 0,
              type: "product",
              value: "The large kind"
            }
          ]
        }
      ]
    },
    {
      id: 0,
      type: 'category',
      value: "Yellow",
      collection: [
        {
          id: 0,
          type: "brand",
          value: "Peppers",
          collection: [
            {
              id: 0,
              type: "product",
              value: "Bell Peppers"
            },
            {
              id: 1,
              type: "product",
              value: "Chili Peppers"
            }
          ]
        },
        {
          id: 1,
          type: "brand",
          value: "Squash",
          collection: [
            {
              id: 0,
              type: "product",
              value: "Summer Squash"
            },
            {
              id: 1,
              type: "product",
              value: "Spaghetti Squash"
            }
          ]
        }
      ]
    }
  ];
});