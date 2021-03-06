import shared from './Shared';

let Rectangle = {
    mounted() {
        let self = this;

        L.RectangleComponent = L.Rectangle.extend({
            ...shared, ...{
                initialize(structure, readonly = false) {
                    this.structure = structure;
                    this.readonly = readonly;

                    let options = {...this.getAttributes(), ...{draggable: true, transform: true}};

                    L.Rectangle.prototype.initialize.call(this, this.initialCoordinates(), options);

                    if (structure.coordinates) {
                        this.setLatLngs(structure.coordinates);
                    }

                    this.activateEventListeners();
                },
                activateEventListeners() {
                    this.on('click', this.componentClicked);
                },
                startEditing() {
                    this.on('dragend', this.transformHandler);
                    this.on('rotateend', this.transformHandler);
                    this.on('scaleend', this.transformHandler);

                    if (this.dragging) {
                        this.dragging.enable();
                    }

                    if (this.transform) {
                        this.transform.enable();
                        this.transform.setOptions({rotation: true, scaling: true, uniformScaling: true});
                    }
                },
                stopEditing() {
                    this.dragging.disable();
                    this.transform.disable();
                },
                componentClicked(e) {
                    if (!self.currentStructure && !this.readonly) {
                        L.DomEvent.stopPropagation(e);
                        self.startEditing(e.target);
                    }
                },
                getCoordinates() {
                    return this.getLatLngs();
                },
                transformHandler(e) {
                    this.setLatLngs(e.target.getLatLngs());
                },
                initialCoordinates(width = 50, height = 50) {
                    let latLng = L.latLng(self.map.getCenter());
                    let currentPoint = self.map.latLngToContainerPoint(latLng);
                    let xDifference = width / 2;
                    let yDifference = height / 2;

                    let northWest = L.point((currentPoint.x + xDifference), (currentPoint.y - yDifference));
                    let northEast = L.point((currentPoint.x + xDifference), (currentPoint.y + yDifference));
                    let southWest = L.point((currentPoint.x - xDifference), (currentPoint.y - yDifference));
                    let southEast = L.point((currentPoint.x - xDifference), (currentPoint.y + yDifference));

                    return [
                        self.map.containerPointToLatLng(northWest),
                        self.map.containerPointToLatLng(northEast),
                        self.map.containerPointToLatLng(southEast),
                        self.map.containerPointToLatLng(southWest),
                        self.map.containerPointToLatLng(northWest)
                    ];
                }
            }
        });
    }
};

export default Rectangle;