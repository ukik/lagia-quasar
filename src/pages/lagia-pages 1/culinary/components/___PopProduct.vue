<template>
  <q-list bordered class="row">
    <isQItemLabelValueIcon
      label="Sport"
      icon="fa-solid fa-baseball"
      :value="record?.facilitySport"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="Service"
      icon="fa-solid fa-hand-holding-hand"
      :value="record?.facilityService"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="Public"
      icon="fa-solid fa-user-group"
      :value="record?.facilityPublic"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="Kid & Pet"
      icon="fa-solid fa-paw"
      :value="record?.facilityKidPet"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="In Room"
      icon="fa-solid fa-door-closed"
      :value="record?.facilityInRoom"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="General"
      icon="fa-solid fa-house-user"
      :value="record?.facilityGeneral"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="Connectivity"
      icon="fa-solid fa-hand-point-up"
      :value="record?.facilityConnectivity"
    ></isQItemLabelValueIcon>
    <isQItemLabelValueIcon
      label="Business"
      icon="fa-solid fa-briefcase"
      :value="record?.facilityBusiness"
    ></isQItemLabelValueIcon>
  </q-list>
</template>

<
<script>
export default {
  props: ["record"],
};
</script>

