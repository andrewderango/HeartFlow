/*
 * Academic License - for use in teaching, academic research, and meeting
 * course requirements at degree granting institutions only.  Not for
 * government, commercial, or other organizational use.
 *
 * File: firmware_rev4.c
 *
 * Code generated for Simulink model 'firmware_rev4'.
 *
 * Model version                  : 1.59
 * Simulink Coder version         : 9.3 (R2020a) 18-Nov-2019
 * C/C++ source code generated on : Thu Nov 28 15:28:30 2024
 *
 * Target selection: ert.tlc
 * Embedded hardware selection: ARM Compatible->ARM Cortex
 * Code generation objectives: Unspecified
 * Validation result: Not run
 */

#include "firmware_rev4.h"
#include "firmware_rev4_private.h"
#include "rt_powd_snf.h"
#include "rt_roundf_snf.h"

/* Named constants for Chart: '<S23>/Chart' */
#define firmware__IN_NO_ACTIVE_CHILD ((uint8_T)0U)
#define firmware_rev4_IN_Wait       ((uint8_T)1U)
#define firmware_rev4_IN_start      ((uint8_T)3U)
#define firmware_rev_IN_pushActivity ((uint8_T)2U)

/* Named constants for Chart: '<S16>/Chart1' */
#define firmware_IN_ActiveDecreasing ((uint8_T)1U)
#define firmware_rev4_IN_AtMax      ((uint8_T)2U)
#define firmware_rev4_IN_AtMin      ((uint8_T)3U)
#define firmware_rev4_IN_Decreasing ((uint8_T)4U)
#define firmware_rev4_IN_Default    ((uint8_T)5U)
#define firmware_rev4_IN_Increase   ((uint8_T)6U)
#define firmware_rev4_IN_start_k    ((uint8_T)7U)

/* Named constants for Chart: '<S16>/Is Active' */
#define firmware_rev4_IN_isActive   ((uint8_T)1U)
#define firmware_rev4_IN_isNotActive ((uint8_T)2U)

/* Named constants for Chart: '<S2>/LED Pin Control' */
#define firmware_rev4_IN_AAI        ((uint8_T)1U)
#define firmware_rev4_IN_AAIR       ((uint8_T)2U)
#define firmware_rev4_IN_AOO        ((uint8_T)3U)
#define firmware_rev4_IN_AOOR       ((uint8_T)4U)
#define firmware_rev4_IN_DDD        ((uint8_T)5U)
#define firmware_rev4_IN_DDDR       ((uint8_T)6U)
#define firmware_rev4_IN_Initialize ((uint8_T)7U)
#define firmware_rev4_IN_Off        ((uint8_T)8U)
#define firmware_rev4_IN_VOO        ((uint8_T)9U)
#define firmware_rev4_IN_VOOR       ((uint8_T)10U)
#define firmware_rev4_IN_VVI        ((uint8_T)11U)
#define firmware_rev4_IN_VVIR       ((uint8_T)12U)

/* Named constants for Chart: '<S2>/Pacing Pin Control' */
#define firmware_Simu_IN_PreparePaceVentricle ((uint8_T)5U)
#define firmware_Simulin_IN_PreparePaceAtrium ((uint8_T)4U)
#define firmware_re_IN_PaceVentricle ((uint8_T)3U)
#define firmware_rev4_IN_Default_o  ((uint8_T)1U)
#define firmware_rev4_IN_PaceAtrium ((uint8_T)2U)

/* Named constants for Chart: '<S2>/Sensing Pin Control' */
#define firmware_rev4_IN_Sense      ((uint8_T)2U)

/* Named constants for Chart: '<Root>/Pacemaker Control' */
#define firmware_Sim_IN_DischargeBlockingCapA ((uint8_T)1U)
#define firmware_Sim_IN_DischargeBlockingCapV ((uint8_T)3U)
#define firmware_r_IN_ShockVentricle ((uint8_T)12U)
#define firmware_re_IN_PrepVentricle ((uint8_T)5U)
#define firmware_rev4_IN_Pace       ((uint8_T)1U)
#define firmware_rev4_IN_Prep       ((uint8_T)1U)
#define firmware_rev4_IN_PrepAtrium ((uint8_T)4U)
#define firmware_rev4_IN_Reset1     ((uint8_T)6U)
#define firmware_rev4_IN_Reset2     ((uint8_T)7U)
#define firmware_rev4_IN_Reset3     ((uint8_T)8U)
#define firmware_rev4_IN_SenseDelay ((uint8_T)2U)
#define firmware_rev4_IN_Shock      ((uint8_T)2U)
#define firmware_rev4_IN_ShockAtrium ((uint8_T)10U)
#define firmware_rev_IN_SenseDelay_p ((uint8_T)3U)
#define firmware_rev_IN_SenseNoDelay ((uint8_T)3U)
#define firmware_rev_IN_SensedAtrium ((uint8_T)9U)
#define IN_DischargeBlockingCapA_Sensed ((uint8_T)2U)
#define IN_ShockAtrium_SensedVentricle ((uint8_T)11U)

/* Named constants for Chart: '<S4>/COM IN' */
#define firmware__IN_MESSAGE_STORAGE ((uint8_T)4U)
#define firmware_r_IN_SET_PERM_PARAM ((uint8_T)6U)
#define firmware_r_IN_SET_TEMP_PARAM ((uint8_T)7U)
#define firmware_rev4_IN_HANDSHAKE  ((uint8_T)2U)
#define firmware_rev4_IN_INITIALIZE ((uint8_T)3U)
#define firmware_rev4_IN_STANDBY    ((uint8_T)8U)
#define firmware_rev_IN_EGRAM_TOGGLE ((uint8_T)1U)
#define firmware_rev_IN_POLL_REQUEST ((uint8_T)5U)

/* Named constants for Chart: '<S4>/EGRAM CLOCK' */
#define firmware_rev4_IN_Send_EGRAM ((uint8_T)1U)
#define firmware_rev4_IN_Waiting    ((uint8_T)2U)

/* Named constants for Chart: '<S4>/EGRAM DATA COLLECTOR' */
#define firmware_rev4_IN_Send       ((uint8_T)1U)
#define firmware_rev4_IN_Start      ((uint8_T)2U)
#define firmware_rev4_IN_TimeStep1  ((uint8_T)3U)
#define firmware_rev4_IN_TimeStep2  ((uint8_T)4U)
#define firmware_rev4_IN_TimeStep3  ((uint8_T)5U)
#define firmware_rev4_IN_TimeStep4  ((uint8_T)6U)
#define firmware_rev4_IN_TimeStep5  ((uint8_T)7U)
#define firmware_rev4_IN_TimeStep6  ((uint8_T)8U)
#define firmware_rev4_IN_TimeStep7  ((uint8_T)9U)
#define firmware_rev4_IN_TimeStep8  ((uint8_T)10U)
#define firmware_rev4_IN_TimeStep9  ((uint8_T)11U)

/* Block signals (default storage) */
B_firmware_rev4_T firmware_rev4_B;

/* Block states (default storage) */
DW_firmware_rev4_T firmware_rev4_DW;

/* Real-time model */
RT_MODEL_firmware_rev4_T firmware_rev4_M_;
RT_MODEL_firmware_rev4_T *const firmware_rev4_M = &firmware_rev4_M_;

/* Forward declaration for local functions */
static void firmware_rev4_AAI(void);
static real_T SlidingWindowAverageCG_stepImpl(g_dsp_private_SlidingWindowAv_T
  *obj, real_T u);
static void firmware_rev4_AAI_l(void);
static void firmware_rev4_AAIR(void);
static void firmware_rev4_AOO(void);
static void firmware_rev4_AOOR(void);
static void firmware_rev4_DDD(void);
static void firmware_rev4_DDDR(void);
static void firmware_rev4_Off(void);
static void firmware_rev4_VOO(void);
static void A_SystemCore_rele_a(const freedomk64f_SCIRead_firmware_Simuli_T *obj);
static void A_SystemCore_dele_a(const freedomk64f_SCIRead_firmware_Simuli_T *obj);
static void firmware_r_matlabCodegenHa_a(freedomk64f_SCIRead_firmware_Simuli_T *obj);
static void firmware_Simu_SystemCore_release_pb1o(const
  freedomk64f_AnalogInput_firmware_Si_T *obj);
static void firmware_Simul_SystemCore_delete_pb1o(const
  freedomk64f_AnalogInput_firmware_Si_T *obj);
static void matlabCodegenHandle_matlab_pb1o(freedomk64f_AnalogInput_firmware_Si_T *obj);
static void A_SystemCore_release_pb1oxbm4tj(const
  freedomk64f_DigitalWrite_firmware_S_T *obj);
static void firmware_SystemCore_delete_pb1oxbm4tj(const
  freedomk64f_DigitalWrite_firmware_S_T *obj);
static void matlabCodegenHandle__pb1oxbm4tj(freedomk64f_DigitalWrite_firmware_S_T *obj);
static void firmware_Simuli_SystemCore_release_pb(const
  freedomk64f_DigitalRead_firmware_Si_T *obj);
static void firmware_Simulin_SystemCore_delete_pb(const
  freedomk64f_DigitalRead_firmware_Si_T *obj);
static void matlabCodegenHandle_matlabCo_pb(freedomk64f_DigitalRead_firmware_Si_T *obj);
static void firmware_S_SystemCore_release_pb1oxbm(const
  freedomk64f_fxos8700_firmware_Simul_T *obj);
static void firmware_Si_SystemCore_delete_pb1oxbm(const
  freedomk64f_fxos8700_firmware_Simul_T *obj);
static void matlabCodegenHandle_mat_pb1oxbm(freedomk64f_fxos8700_firmware_Simul_T *obj);
static void firmware__SystemCore_release_pb1oxbm4(b_freedomk64f_I2CMasterWrite__T *obj);
static void firmware_S_SystemCore_delete_pb1oxbm4(b_freedomk64f_I2CMasterWrite__T *obj);
static void matlabCodegenHandle_ma_pb1oxbm4(b_freedomk64f_I2CMasterWrite__T *obj);
static void firmware_Si_SystemCore_release_pb1oxb(dsp_simulink_MovingAverage_firmware_T *obj);
static void firmware_Sim_SystemCore_delete_pb1oxb(dsp_simulink_MovingAverage_firmware_T *obj);
static void matlabCodegenHandle_matl_pb1oxb(dsp_simulink_MovingAverage_firmware_T *obj);
static void firmware_Simulin_SystemCore_release_p(const
  freedomk64f_PushButton_firmware_Sim_T *obj);
static void firmware_SystemCore_delete_p(const
  freedomk64f_PushButton_firmware_Sim_T *obj);
static void matlabCodegenHandle_matlabCod_p(freedomk64f_PushButton_firmware_Sim_T *obj);
static void firmware_SystemCore_release_pb1oxbm4t(const
  freedomk64f_PWMOutput_firmware_Simu_T *obj);
static void firmware__SystemCore_delete_pb1oxbm4t(const
  freedomk64f_PWMOutput_firmware_Simu_T *obj);
static void matlabCodegenHandle_m_pb1oxbm4t(freedomk64f_PWMOutput_firmware_Simu_T *obj);
static void firmware_SystemCore_setup_pb(freedomk64f_SCIRead_firmware_Simuli_T *obj);
static void firmware__SystemCore_setup_p(freedomk64f_fxos8700_firmware_Simul_T *obj);
static void rate_monotonic_scheduler(void);

/*
 * Set which subrates need to run this base step (base rate always runs).
 * This function must be called prior to calling the model step function
 * in order to "remember" which rates need to run this base step.  The
 * buffering of events allows for overlapping preemption.
 */
void firmware_rev4_SetEventsForThisBaseStep(boolean_T *eventFlags)
{
  /* Task runs when its counter is zero, computed via rtmStepTask macro */
  eventFlags[1] = ((boolean_T)rtmStepTask(firmware_rev4_M, 1));
}

/*
 *   This function updates active task flag for each subrate
 * and rate transition flags for tasks that exchange data.
 * The function assumes rate-monotonic multitasking scheduler.
 * The function must be called at model base rate so that
 * the generated code self-manages all its subrates and rate
 * transition flags.
 */
static void rate_monotonic_scheduler(void)
{
  /* Compute which subrates run during the next base time step.  Subrates
   * are an integer multiple of the base rate counter.  Therefore, the subtask
   * counter is reset when it reaches its limit (zero means run).
   */
  (firmware_rev4_M->Timing.TaskCounters.TID[1])++;
  if ((firmware_rev4_M->Timing.TaskCounters.TID[1]) > 1) {/* Sample time: [0.002s, 0.0s] */
    firmware_rev4_M->Timing.TaskCounters.TID[1] = 0;
  }
}

/* Function for Chart: '<S2>/LED Pin Control' */
static void firmware_rev4_AAI(void)
{
  firmware_rev4_B.r = true;
  firmware_rev4_B.g = false;
  firmware_rev4_B.b = true;
  if ((firmware_rev4_B.mode != firmware_rev4_DW.AAI_o) &&
      (firmware_rev4_B.mode != firmware_rev4_DW.AAIR_c)) {
    firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_VVI;
    firmware_rev4_DW.temporalCounter_i1_m = 0U;
    firmware_rev4_B.r = false;
    firmware_rev4_B.g = false;
    firmware_rev4_B.b = true;
  } else {
    if ((firmware_rev4_B.mode == firmware_rev4_DW.AAIR_c) &&
        (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
         (firmware_rev4_DW.delay * 500.0))) {
      firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_AAIR;
      firmware_rev4_DW.temporalCounter_i1_m = 0U;
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
    }
  }
}

static real_T SlidingWindowAverageCG_stepImpl(g_dsp_private_SlidingWindowAv_T
  *obj, real_T u)
{
  real_T y;
  real_T cumRevIndex;
  real_T csum;
  real_T z;
  int32_T z_tmp;
  memcpy(&firmware_rev4_B.csumrev[0], &obj->pCumSumRev[0], 999U * sizeof
         (real_T));
  csum = obj->pCumSum + u;
  z_tmp = (int32_T)obj->pCumRevIndex - 1;
  z = obj->pCumSumRev[z_tmp] + csum;
  firmware_rev4_B.csumrev[z_tmp] = u;
  if (obj->pCumRevIndex != 999.0) {
    cumRevIndex = obj->pCumRevIndex + 1.0;
  } else {
    cumRevIndex = 1.0;
    csum = 0.0;
    for (z_tmp = 997; z_tmp >= 0; z_tmp--) {
      firmware_rev4_B.csumrev[z_tmp] += firmware_rev4_B.csumrev[z_tmp + 1];
    }
  }

  y = z / 1000.0;
  obj->pCumSum = csum;
  memcpy(&obj->pCumSumRev[0], &firmware_rev4_B.csumrev[0], 999U * sizeof
         (real_T));
  obj->pCumRevIndex = cumRevIndex;
  return y;
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_AAI_l(void)
{
  uint32_T tmp;
  if (firmware_rev4_B.mode != firmware_rev4_DW.AAI) {
    switch (firmware_rev4_DW.is_AAI) {
     case firmware_rev4_IN_Pace:
      firmware_rev4_DW.is_AAI = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_SenseDelay:
      firmware_rev4_DW.is_AAI = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev_IN_SenseNoDelay:
      firmware_rev4_DW.is_AAI = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else {
    switch (firmware_rev4_DW.is_AAI) {
     case firmware_rev4_IN_Pace:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min)) {
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_DW.is_AAI = firmware_rev_IN_SenseNoDelay;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
        firmware_rev4_B.sense = true;
      }
      break;

     case firmware_rev4_IN_SenseDelay:
      firmware_rev4_B.sense = true;
      tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
      if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract)) && (tmp >=
           (uint32_T)ceil(firmware_rev4_B.Min_b))) {
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_AAI = firmware_rev4_IN_Pace;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceAtrium = true;
      } else {
        if (firmware_rev4_B.ATR_CMP_DETECT &&
            (firmware_rev4_DW.temporalCounter_i1_o >= 50U)) {
          firmware_rev4_DW.is_AAI = firmware_rev4_IN_SenseDelay;
          firmware_rev4_DW.temporalCounter_i1_o = 0U;
          firmware_rev4_B.preparePaceAtrium = true;
          firmware_rev4_B.sense = true;
        }
      }
      break;

     default:
      /* case IN_SenseNoDelay: */
      firmware_rev4_B.sense = true;
      if (firmware_rev4_B.ATR_CMP_DETECT) {
        firmware_rev4_DW.is_AAI = firmware_rev4_IN_SenseDelay;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
        firmware_rev4_B.sense = true;
      } else {
        tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
        if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract)) && (tmp >=
             (uint32_T)ceil(firmware_rev4_B.Min_b))) {
          firmware_rev4_B.preparePaceAtrium = false;
          firmware_rev4_DW.is_AAI = firmware_rev4_IN_Pace;
          firmware_rev4_DW.temporalCounter_i1_o = 0U;
          firmware_rev4_B.paceAtrium = true;
        }
      }
      break;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_AAIR(void)
{
  uint32_T tmp;
  if (firmware_rev4_B.mode != firmware_rev4_DW.AAIR) {
    switch (firmware_rev4_DW.is_AAIR) {
     case firmware_rev4_IN_Pace:
      firmware_rev4_DW.is_AAIR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_SenseDelay:
      firmware_rev4_DW.is_AAIR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev_IN_SenseNoDelay:
      firmware_rev4_DW.is_AAIR = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else {
    switch (firmware_rev4_DW.is_AAIR) {
     case firmware_rev4_IN_Pace:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min)) {
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_DW.is_AAIR = firmware_rev_IN_SenseNoDelay;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
        firmware_rev4_B.sense = true;
      }
      break;

     case firmware_rev4_IN_SenseDelay:
      firmware_rev4_B.sense = true;
      tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
      if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract_k)) && (tmp >=
           (uint32_T)ceil(firmware_rev4_B.Min_b))) {
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_AAIR = firmware_rev4_IN_Pace;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceAtrium = true;
      } else {
        if (firmware_rev4_B.ATR_CMP_DETECT &&
            (firmware_rev4_DW.temporalCounter_i1_o >= 50U)) {
          firmware_rev4_DW.is_AAIR = firmware_rev4_IN_SenseDelay;
          firmware_rev4_DW.temporalCounter_i1_o = 0U;
          firmware_rev4_B.preparePaceAtrium = true;
          firmware_rev4_B.sense = true;
        }
      }
      break;

     default:
      /* case IN_SenseNoDelay: */
      firmware_rev4_B.sense = true;
      if (firmware_rev4_B.ATR_CMP_DETECT) {
        firmware_rev4_DW.is_AAIR = firmware_rev4_IN_SenseDelay;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
        firmware_rev4_B.sense = true;
      } else {
        tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
        if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract_k)) && (tmp >=
             (uint32_T)ceil(firmware_rev4_B.Min_b))) {
          firmware_rev4_B.preparePaceAtrium = false;
          firmware_rev4_DW.is_AAIR = firmware_rev4_IN_Pace;
          firmware_rev4_DW.temporalCounter_i1_o = 0U;
          firmware_rev4_B.paceAtrium = true;
        }
      }
      break;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_AOO(void)
{
  if (firmware_rev4_B.mode != firmware_rev4_DW.AOO) {
    switch (firmware_rev4_DW.is_AOO) {
     case firmware_rev4_IN_Prep:
      firmware_rev4_DW.is_AOO = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Shock:
      firmware_rev4_DW.is_AOO = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else if (firmware_rev4_DW.is_AOO == firmware_rev4_IN_Prep) {
    if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
        (firmware_rev4_B.Subtract - firmware_rev4_B.Min)) {
      firmware_rev4_B.preparePaceAtrium = false;
      firmware_rev4_DW.is_AOO = firmware_rev4_IN_Shock;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.paceAtrium = true;
    }
  } else {
    /* case IN_Shock: */
    if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
        (firmware_rev4_B.Min)) {
      firmware_rev4_B.paceAtrium = false;
      firmware_rev4_DW.is_AOO = firmware_rev4_IN_Prep;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceAtrium = true;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_AOOR(void)
{
  if (firmware_rev4_B.mode != firmware_rev4_DW.AOOR) {
    switch (firmware_rev4_DW.is_AOOR) {
     case firmware_rev4_IN_Prep:
      firmware_rev4_DW.is_AOOR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Shock:
      firmware_rev4_DW.is_AOOR = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else if (firmware_rev4_DW.is_AOOR == firmware_rev4_IN_Prep) {
    if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
        (firmware_rev4_B.Subtract_k - firmware_rev4_B.Min)) {
      firmware_rev4_B.preparePaceAtrium = false;
      firmware_rev4_DW.is_AOOR = firmware_rev4_IN_Shock;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.paceAtrium = true;
    }
  } else {
    /* case IN_Shock: */
    if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
        (firmware_rev4_B.Min)) {
      firmware_rev4_B.paceAtrium = false;
      firmware_rev4_DW.is_AOOR = firmware_rev4_IN_Prep;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceAtrium = true;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_DDD(void)
{
  uint32_T tmp;
  if (firmware_rev4_B.mode != firmware_rev4_DW.DDD) {
    switch (firmware_rev4_DW.is_DDD) {
     case firmware_Sim_IN_DischargeBlockingCapA:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case IN_DischargeBlockingCapA_Sensed:
      firmware_rev4_DW.t = 0.0;
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_Sim_IN_DischargeBlockingCapV:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_PrepAtrium:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_re_IN_PrepVentricle:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Reset1:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Reset2:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Reset3:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev_IN_SensedAtrium:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_ShockAtrium:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case IN_ShockAtrium_SensedVentricle:
      firmware_rev4_DW.t = 0.0;
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_r_IN_ShockVentricle:
      firmware_rev4_DW.is_DDD = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else {
    switch (firmware_rev4_DW.is_DDD) {
     case firmware_Sim_IN_DischargeBlockingCapA:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          ((firmware_rev4_B.Min_m - firmware_rev4_B.Min) / 2.0)) {
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_DDD = firmware_rev4_IN_Reset1;
        firmware_rev4_B.reset = true;
      } else if (firmware_rev4_B.VENT_CMP_DETECT ||
                 firmware_rev4_B.PUSH_BUTTON_SW3) {
        firmware_rev4_DW.is_DDD = IN_DischargeBlockingCapA_Sensed;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
      } else {
        firmware_rev4_DW.t++;
      }
      break;

     case IN_DischargeBlockingCapA_Sensed:
      tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
      if ((tmp >= (uint32_T)ceil((firmware_rev4_B.Min_m -
             firmware_rev4_B.Min) / 2.0 - firmware_rev4_DW.t)) && (tmp >=
           (uint32_T)ceil(((firmware_rev4_B.Min_e - firmware_rev4_B.Min) /
                           2.0 + firmware_rev4_B.Min_m) -
                          firmware_rev4_DW.t))) {
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_DDD = firmware_rev4_IN_Reset2;
        firmware_rev4_B.reset = true;
      }
      break;

     case firmware_Sim_IN_DischargeBlockingCapV:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          ((firmware_rev4_B.Min_m - firmware_rev4_B.Min_e) / 2.0)) {
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_DW.is_DDD = firmware_rev4_IN_Reset2;
        firmware_rev4_B.reset = true;
      }
      break;

     case firmware_rev4_IN_PrepAtrium:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Subtract - (3.0 * firmware_rev4_B.Min_m +
            firmware_rev4_B.Min_e) / 2.0)) {
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_DDD = firmware_rev4_IN_ShockAtrium;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.paceAtrium = true;
        firmware_rev4_B.sense = true;
      } else {
        if (firmware_rev4_B.ATR_CMP_DETECT) {
          firmware_rev4_B.preparePaceAtrium = false;
          firmware_rev4_DW.is_DDD = firmware_rev4_IN_Reset3;
          firmware_rev4_B.reset = true;
        }
      }
      break;

     case firmware_re_IN_PrepVentricle:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          ((firmware_rev4_B.Min_m - firmware_rev4_B.Min) / 2.0)) {
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_DW.is_DDD = firmware_r_IN_ShockVentricle;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceVentricle = true;
      } else if (firmware_rev4_B.VENT_CMP_DETECT ||
                 firmware_rev4_B.PUSH_BUTTON_SW3) {
        if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
            (((firmware_rev4_B.Min_e - firmware_rev4_B.Min) / 2.0 +
              firmware_rev4_B.Min_m) - firmware_rev4_DW.t)) {
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_DDD = firmware_rev4_IN_Reset2;
          firmware_rev4_B.reset = true;
        } else {
          firmware_rev4_DW.t++;
        }
      } else {
        firmware_rev4_DW.t++;
      }
      break;

     case firmware_rev4_IN_Reset1:
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_DDD = firmware_re_IN_PrepVentricle;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_DW.t = 0.0;
      firmware_rev4_B.preparePaceVentricle = true;
      firmware_rev4_B.sense = true;
      break;

     case firmware_rev4_IN_Reset2:
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_DDD = firmware_rev4_IN_PrepAtrium;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceAtrium = true;
      firmware_rev4_B.sense = true;
      break;

     case firmware_rev4_IN_Reset3:
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_DDD = firmware_rev_IN_SensedAtrium;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceVentricle = true;
      break;

     case firmware_rev_IN_SensedAtrium:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min_m)) {
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_DW.is_DDD = firmware_r_IN_ShockVentricle;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceVentricle = true;
      } else {
        if (firmware_rev4_B.VENT_CMP_DETECT ||
            firmware_rev4_B.PUSH_BUTTON_SW3) {
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_DDD = firmware_rev4_IN_Reset2;
          firmware_rev4_B.reset = true;
        }
      }
      break;

     case firmware_rev4_IN_ShockAtrium:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min)) {
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_DW.is_DDD = firmware_Sim_IN_DischargeBlockingCapA;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.preparePaceAtrium = true;
        firmware_rev4_B.sense = true;
      } else if (firmware_rev4_B.VENT_CMP_DETECT ||
                 firmware_rev4_B.PUSH_BUTTON_SW3) {
        firmware_rev4_DW.is_DDD = IN_ShockAtrium_SensedVentricle;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceAtrium = true;
      } else {
        firmware_rev4_DW.t++;
      }
      break;

     case IN_ShockAtrium_SensedVentricle:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min - firmware_rev4_DW.t)) {
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_DW.is_DDD = IN_DischargeBlockingCapA_Sensed;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
      }
      break;

     default:
      /* case IN_ShockVentricle: */
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min_e)) {
        firmware_rev4_B.paceVentricle = false;
        firmware_rev4_DW.is_DDD = firmware_Sim_IN_DischargeBlockingCapV;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceVentricle = true;
      }
      break;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_DDDR(void)
{
  uint32_T tmp;
  if (firmware_rev4_B.mode != firmware_rev4_DW.DDDR) {
    switch (firmware_rev4_DW.is_DDDR) {
     case firmware_Sim_IN_DischargeBlockingCapA:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case IN_DischargeBlockingCapA_Sensed:
      firmware_rev4_DW.t = 0.0;
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_Sim_IN_DischargeBlockingCapV:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_PrepAtrium:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_re_IN_PrepVentricle:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Reset1:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Reset2:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Reset3:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev_IN_SensedAtrium:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_ShockAtrium:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case IN_ShockAtrium_SensedVentricle:
      firmware_rev4_DW.t = 0.0;
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_r_IN_ShockVentricle:
      firmware_rev4_DW.is_DDDR = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else {
    switch (firmware_rev4_DW.is_DDDR) {
     case firmware_Sim_IN_DischargeBlockingCapA:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          ((firmware_rev4_B.Min_m - firmware_rev4_B.Min) / 2.0)) {
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_DDDR = firmware_rev4_IN_Reset1;
        firmware_rev4_B.reset = true;
      } else if (firmware_rev4_B.VENT_CMP_DETECT ||
                 firmware_rev4_B.PUSH_BUTTON_SW3) {
        firmware_rev4_DW.is_DDDR = IN_DischargeBlockingCapA_Sensed;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
      } else {
        firmware_rev4_DW.t++;
      }
      break;

     case IN_DischargeBlockingCapA_Sensed:
      tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
      if ((tmp >= (uint32_T)ceil((firmware_rev4_B.Min_m -
             firmware_rev4_B.Min) / 2.0 - firmware_rev4_DW.t)) && (tmp >=
           (uint32_T)ceil(((firmware_rev4_B.Min_e - firmware_rev4_B.Min) /
                           2.0 + firmware_rev4_B.Min_m) -
                          firmware_rev4_DW.t))) {
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_DDDR = firmware_rev4_IN_Reset2;
        firmware_rev4_B.reset = true;
      }
      break;

     case firmware_Sim_IN_DischargeBlockingCapV:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          ((firmware_rev4_B.Min_m - firmware_rev4_B.Min_e) / 2.0)) {
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_DW.is_DDDR = firmware_rev4_IN_Reset2;
        firmware_rev4_B.reset = true;
      }
      break;

     case firmware_rev4_IN_PrepAtrium:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Subtract_k - (3.0 * firmware_rev4_B.Min_m +
            firmware_rev4_B.Min_e) / 2.0)) {
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_DW.is_DDDR = firmware_rev4_IN_ShockAtrium;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.paceAtrium = true;
        firmware_rev4_B.sense = true;
      } else {
        if (firmware_rev4_B.ATR_CMP_DETECT) {
          firmware_rev4_B.preparePaceAtrium = false;
          firmware_rev4_DW.is_DDDR = firmware_rev4_IN_Reset3;
          firmware_rev4_B.reset = true;
        }
      }
      break;

     case firmware_re_IN_PrepVentricle:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          ((firmware_rev4_B.Min_m - firmware_rev4_B.Min) / 2.0)) {
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_DW.is_DDDR = firmware_r_IN_ShockVentricle;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceVentricle = true;
      } else if (firmware_rev4_B.VENT_CMP_DETECT ||
                 firmware_rev4_B.PUSH_BUTTON_SW3) {
        if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
            (((firmware_rev4_B.Min_e - firmware_rev4_B.Min) / 2.0 +
              firmware_rev4_B.Min_m) - firmware_rev4_DW.t)) {
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_DDDR = firmware_rev4_IN_Reset2;
          firmware_rev4_B.reset = true;
        } else {
          firmware_rev4_DW.t++;
        }
      } else {
        firmware_rev4_DW.t++;
      }
      break;

     case firmware_rev4_IN_Reset1:
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_DDDR = firmware_re_IN_PrepVentricle;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_DW.t = 0.0;
      firmware_rev4_B.preparePaceVentricle = true;
      firmware_rev4_B.sense = true;
      break;

     case firmware_rev4_IN_Reset2:
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_DDDR = firmware_rev4_IN_PrepAtrium;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceAtrium = true;
      firmware_rev4_B.sense = true;
      break;

     case firmware_rev4_IN_Reset3:
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_DDDR = firmware_rev_IN_SensedAtrium;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceVentricle = true;
      break;

     case firmware_rev_IN_SensedAtrium:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min_m)) {
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_DW.is_DDDR = firmware_r_IN_ShockVentricle;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceVentricle = true;
      } else {
        if (firmware_rev4_B.VENT_CMP_DETECT ||
            firmware_rev4_B.PUSH_BUTTON_SW3) {
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_DDDR = firmware_rev4_IN_Reset2;
          firmware_rev4_B.reset = true;
        }
      }
      break;

     case firmware_rev4_IN_ShockAtrium:
      firmware_rev4_B.sense = true;
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min)) {
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_DW.is_DDDR = firmware_Sim_IN_DischargeBlockingCapA;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.preparePaceAtrium = true;
        firmware_rev4_B.sense = true;
      } else if (firmware_rev4_B.VENT_CMP_DETECT ||
                 firmware_rev4_B.PUSH_BUTTON_SW3) {
        firmware_rev4_DW.is_DDDR = IN_ShockAtrium_SensedVentricle;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.paceAtrium = true;
      } else {
        firmware_rev4_DW.t++;
      }
      break;

     case IN_ShockAtrium_SensedVentricle:
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min - firmware_rev4_DW.t)) {
        firmware_rev4_DW.t = 0.0;
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_DW.is_DDDR = IN_DischargeBlockingCapA_Sensed;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceAtrium = true;
      }
      break;

     default:
      /* case IN_ShockVentricle: */
      if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
          (firmware_rev4_B.Min_e)) {
        firmware_rev4_B.paceVentricle = false;
        firmware_rev4_DW.is_DDDR = firmware_Sim_IN_DischargeBlockingCapV;
        firmware_rev4_DW.temporalCounter_i1_o = 0U;
        firmware_rev4_B.preparePaceVentricle = true;
      }
      break;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_Off(void)
{
  firmware_rev4_B.sense = false;
  if (firmware_rev4_B.mode == firmware_rev4_DW.AAI) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_AAI;
    firmware_rev4_DW.is_AAI = firmware_rev_IN_SenseNoDelay;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceAtrium = true;
    firmware_rev4_B.sense = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.VVI) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_VVI;
    firmware_rev4_DW.is_VVI = firmware_rev4_IN_Sense;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceVentricle = true;
    firmware_rev4_B.sense = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.AOO) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_AOO;
    firmware_rev4_DW.is_AOO = firmware_rev4_IN_Prep;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceAtrium = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.VOO) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_VOO;
    firmware_rev4_DW.is_VOO = firmware_rev4_IN_Prep;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceVentricle = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.AOOR) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_AOOR;
    firmware_rev4_DW.is_AOOR = firmware_rev4_IN_Prep;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceAtrium = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.VOOR) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_VOOR;
    firmware_rev4_DW.is_VOOR = firmware_rev4_IN_Prep;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceVentricle = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.AAIR) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_AAIR;
    firmware_rev4_DW.is_AAIR = firmware_rev_IN_SenseNoDelay;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceAtrium = true;
    firmware_rev4_B.sense = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.VVIR) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_VVIR;
    firmware_rev4_DW.is_VVIR = firmware_rev4_IN_Sense;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceVentricle = true;
    firmware_rev4_B.sense = true;
  } else if (firmware_rev4_B.mode == firmware_rev4_DW.DDD) {
    firmware_rev4_B.reset = false;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_DDD;
    firmware_rev4_DW.is_DDD = firmware_rev4_IN_PrepAtrium;
    firmware_rev4_DW.temporalCounter_i1_o = 0U;
    firmware_rev4_B.preparePaceAtrium = true;
    firmware_rev4_B.sense = true;
  } else {
    if (firmware_rev4_B.mode == firmware_rev4_DW.DDDR) {
      firmware_rev4_B.reset = false;
      firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_DDDR;
      firmware_rev4_DW.is_DDDR = firmware_rev4_IN_PrepAtrium;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceAtrium = true;
      firmware_rev4_B.sense = true;
    }
  }
}

/* Function for Chart: '<Root>/Pacemaker Control' */
static void firmware_rev4_VOO(void)
{
  if (firmware_rev4_B.mode != firmware_rev4_DW.VOO) {
    switch (firmware_rev4_DW.is_VOO) {
     case firmware_rev4_IN_Prep:
      firmware_rev4_DW.is_VOO = firmware__IN_NO_ACTIVE_CHILD;
      break;

     case firmware_rev4_IN_Shock:
      firmware_rev4_DW.is_VOO = firmware__IN_NO_ACTIVE_CHILD;
      break;
    }

    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
    firmware_rev4_B.reset = true;
    firmware_rev4_B.preparePaceAtrium = false;
    firmware_rev4_B.paceAtrium = false;
    firmware_rev4_B.preparePaceVentricle = false;
    firmware_rev4_B.paceVentricle = false;
    firmware_rev4_B.sense = false;
  } else if (firmware_rev4_DW.is_VOO == firmware_rev4_IN_Prep) {
    if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
        (firmware_rev4_B.Subtract - firmware_rev4_B.Min_e)) {
      firmware_rev4_B.preparePaceVentricle = false;
      firmware_rev4_DW.is_VOO = firmware_rev4_IN_Shock;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.paceVentricle = true;
    }
  } else {
    /* case IN_Shock: */
    if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
        (firmware_rev4_B.Min_e)) {
      firmware_rev4_B.paceVentricle = false;
      firmware_rev4_DW.is_VOO = firmware_rev4_IN_Prep;
      firmware_rev4_DW.temporalCounter_i1_o = 0U;
      firmware_rev4_B.preparePaceVentricle = true;
    }
  }
}

static void A_SystemCore_rele_a(const freedomk64f_SCIRead_firmware_Simuli_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_SCI_Close(obj->MW_SCIHANDLE);
  }
}

static void A_SystemCore_dele_a(const freedomk64f_SCIRead_firmware_Simuli_T *obj)
{
  A_SystemCore_rele_a(obj);
}

static void firmware_r_matlabCodegenHa_a(freedomk64f_SCIRead_firmware_Simuli_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    A_SystemCore_dele_a(obj);
  }
}

static void firmware_Simu_SystemCore_release_pb1o(const
  freedomk64f_AnalogInput_firmware_Si_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_AnalogIn_Stop(obj->MW_ANALOGIN_HANDLE);
    MW_AnalogIn_Close(obj->MW_ANALOGIN_HANDLE);
  }
}

static void firmware_Simul_SystemCore_delete_pb1o(const
  freedomk64f_AnalogInput_firmware_Si_T *obj)
{
  firmware_Simu_SystemCore_release_pb1o(obj);
}

static void matlabCodegenHandle_matlab_pb1o(freedomk64f_AnalogInput_firmware_Si_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_Simul_SystemCore_delete_pb1o(obj);
  }
}

static void A_SystemCore_release_pb1oxbm4tj(const
  freedomk64f_DigitalWrite_firmware_S_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_digitalIO_close(obj->MW_DIGITALIO_HANDLE);
  }
}

static void firmware_SystemCore_delete_pb1oxbm4tj(const
  freedomk64f_DigitalWrite_firmware_S_T *obj)
{
  A_SystemCore_release_pb1oxbm4tj(obj);
}

static void matlabCodegenHandle__pb1oxbm4tj(freedomk64f_DigitalWrite_firmware_S_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_SystemCore_delete_pb1oxbm4tj(obj);
  }
}

static void firmware_Simuli_SystemCore_release_pb(const
  freedomk64f_DigitalRead_firmware_Si_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_digitalIO_close(obj->MW_DIGITALIO_HANDLE);
  }
}

static void firmware_Simulin_SystemCore_delete_pb(const
  freedomk64f_DigitalRead_firmware_Si_T *obj)
{
  firmware_Simuli_SystemCore_release_pb(obj);
}

static void matlabCodegenHandle_matlabCo_pb(freedomk64f_DigitalRead_firmware_Si_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_Simulin_SystemCore_delete_pb(obj);
  }
}

static void firmware_S_SystemCore_release_pb1oxbm(const
  freedomk64f_fxos8700_firmware_Simul_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_I2C_Close(obj->i2cobj.MW_I2C_HANDLE);
  }
}

static void firmware_Si_SystemCore_delete_pb1oxbm(const
  freedomk64f_fxos8700_firmware_Simul_T *obj)
{
  firmware_S_SystemCore_release_pb1oxbm(obj);
}

static void matlabCodegenHandle_mat_pb1oxbm(freedomk64f_fxos8700_firmware_Simul_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_Si_SystemCore_delete_pb1oxbm(obj);
  }
}

static void firmware__SystemCore_release_pb1oxbm4(b_freedomk64f_I2CMasterWrite__T *obj)
{
  if (obj->isInitialized == 1) {
    obj->isInitialized = 2;
  }
}

static void firmware_S_SystemCore_delete_pb1oxbm4(b_freedomk64f_I2CMasterWrite__T *obj)
{
  firmware__SystemCore_release_pb1oxbm4(obj);
}

static void matlabCodegenHandle_ma_pb1oxbm4(b_freedomk64f_I2CMasterWrite__T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_S_SystemCore_delete_pb1oxbm4(obj);
  }
}

static void firmware_Si_SystemCore_release_pb1oxb(dsp_simulink_MovingAverage_firmware_T *obj)
{
  g_dsp_private_SlidingWindowAv_T *obj_0;
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    obj_0 = obj->pStatistic;
    if (obj_0->isInitialized == 1) {
      obj_0->isInitialized = 2;
    }

    obj->NumChannels = -1;
  }
}

static void firmware_Sim_SystemCore_delete_pb1oxb(dsp_simulink_MovingAverage_firmware_T *obj)
{
  firmware_Si_SystemCore_release_pb1oxb(obj);
}

static void matlabCodegenHandle_matl_pb1oxb(dsp_simulink_MovingAverage_firmware_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_Sim_SystemCore_delete_pb1oxb(obj);
  }
}

static void firmware_Simulin_SystemCore_release_p(const
  freedomk64f_PushButton_firmware_Sim_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_digitalIO_close(obj->MW_DIGITALIO_HANDLE);
  }
}

static void firmware_SystemCore_delete_p(const
  freedomk64f_PushButton_firmware_Sim_T *obj)
{
  firmware_Simulin_SystemCore_release_p(obj);
}

static void matlabCodegenHandle_matlabCod_p(freedomk64f_PushButton_firmware_Sim_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware_SystemCore_delete_p(obj);
  }
}

static void firmware_SystemCore_release_pb1oxbm4t(const
  freedomk64f_PWMOutput_firmware_Simu_T *obj)
{
  if ((obj->isInitialized == 1) && obj->isSetupComplete) {
    MW_PWM_Stop(obj->MW_PWM_HANDLE);
    MW_PWM_Close(obj->MW_PWM_HANDLE);
  }
}

static void firmware__SystemCore_delete_pb1oxbm4t(const
  freedomk64f_PWMOutput_firmware_Simu_T *obj)
{
  firmware_SystemCore_release_pb1oxbm4t(obj);
}

static void matlabCodegenHandle_m_pb1oxbm4t(freedomk64f_PWMOutput_firmware_Simu_T *obj)
{
  if (!obj->matlabCodegenIsDeleted) {
    obj->matlabCodegenIsDeleted = true;
    firmware__SystemCore_delete_pb1oxbm4t(obj);
  }
}

static void firmware_SystemCore_setup_pb(freedomk64f_SCIRead_firmware_Simuli_T *obj)
{
  obj->isSetupComplete = false;
  obj->isInitialized = 1;
  firmware_rev4_B.TxPinLoc = MW_UNDEFINED_VALUE;
  firmware_rev4_B.SCIModuleLoc = 0;
  obj->MW_SCIHANDLE = MW_SCI_Open(&firmware_rev4_B.SCIModuleLoc, false, 10U,
    firmware_rev4_B.TxPinLoc);
  MW_SCI_SetBaudrate(obj->MW_SCIHANDLE, 115200U);
  firmware_rev4_B.StopBitsValue = MW_SCI_STOPBITS_1;
  firmware_rev4_B.ParityValue = MW_SCI_PARITY_NONE;
  MW_SCI_SetFrameFormat(obj->MW_SCIHANDLE, 8, firmware_rev4_B.ParityValue,
                        firmware_rev4_B.StopBitsValue);
  obj->isSetupComplete = true;
}

static void firmware__SystemCore_setup_p(freedomk64f_fxos8700_firmware_Simul_T *obj)
{
  obj->isSetupComplete = false;
  obj->isInitialized = 1;
  firmware_rev4_B.ModeType = MW_I2C_MASTER;
  firmware_rev4_B.i2cname = 0;
  obj->i2cobj.MW_I2C_HANDLE = MW_I2C_Open(firmware_rev4_B.i2cname,
    firmware_rev4_B.ModeType);
  obj->i2cobj.BusSpeed = 100000U;
  MW_I2C_SetBusSpeed(obj->i2cobj.MW_I2C_HANDLE, obj->i2cobj.BusSpeed);
  firmware_rev4_B.b_SwappedDataBytes[0] = 43U;
  firmware_rev4_B.b_SwappedDataBytes[1] = 64U;
  MW_I2C_MasterWrite(obj->i2cobj.MW_I2C_HANDLE, 29U,
                     firmware_rev4_B.b_SwappedDataBytes, 2U, false, false);
  OSA_TimeDelay(500U);
  firmware_rev4_B.status = 42U;
  firmware_rev4_B.status = MW_I2C_MasterWrite(obj->i2cobj.MW_I2C_HANDLE, 29U,
    &firmware_rev4_B.status, 1U, true, false);
  if (0 == firmware_rev4_B.status) {
    MW_I2C_MasterRead(obj->i2cobj.MW_I2C_HANDLE, 29U, &firmware_rev4_B.status,
                      1U, false, true);
    memcpy((void *)&firmware_rev4_B.b_RegisterValue, (void *)
           &firmware_rev4_B.status, (uint32_T)((size_t)1 * sizeof(uint8_T)));
  } else {
    firmware_rev4_B.b_RegisterValue = 0U;
  }

  firmware_rev4_B.b_SwappedDataBytes[0] = 42U;
  firmware_rev4_B.b_SwappedDataBytes[1] = (uint8_T)
    (firmware_rev4_B.b_RegisterValue & 254);
  MW_I2C_MasterWrite(obj->i2cobj.MW_I2C_HANDLE, 29U,
                     firmware_rev4_B.b_SwappedDataBytes, 2U, false, false);
  firmware_rev4_B.b_SwappedDataBytes[0] = 14U;
  firmware_rev4_B.b_SwappedDataBytes[1] = 1U;
  MW_I2C_MasterWrite(obj->i2cobj.MW_I2C_HANDLE, 29U,
                     firmware_rev4_B.b_SwappedDataBytes, 2U, false, false);
  firmware_rev4_B.b_SwappedDataBytes[0] = 91U;
  firmware_rev4_B.b_SwappedDataBytes[1] = 0U;
  MW_I2C_MasterWrite(obj->i2cobj.MW_I2C_HANDLE, 29U,
                     firmware_rev4_B.b_SwappedDataBytes, 2U, false, false);
  firmware_rev4_B.b_SwappedDataBytes[0] = 42U;
  firmware_rev4_B.b_SwappedDataBytes[1] = 25U;
  MW_I2C_MasterWrite(obj->i2cobj.MW_I2C_HANDLE, 29U,
                     firmware_rev4_B.b_SwappedDataBytes, 2U, false, false);
  obj->isSetupComplete = true;
}

/* Model step function for TID0 */
void firmware_rev4_step0(void)      /* Sample time: [0.001s, 0.0s] */
{
  {                                    /* Sample time: [0.001s, 0.0s] */
    rate_monotonic_scheduler();
  }
}

/* Model step function for TID1 */
void firmware_rev4_step1(void)      /* Sample time: [0.002s, 0.0s] */
{
  int16_T b_output[3];
  uint8_T status;
  uint8_T output_raw[6];
  uint8_T y[2];
  uint8_T b_x[2];
  boolean_T rtb_VENT_PACE_CTRL;
  boolean_T rtb_VENT_GND_CTRL;
  boolean_T rtb_PACE_GND_CTRL;
  boolean_T rtb_PACE_CHARGE_CTRL;
  boolean_T rtb_ATR_GND_CTRL;
  boolean_T rtb_isActive;
  uint32_T tmp;

  /* MATLABSystem: '<S4>/Serial Receive' */
  if (firmware_rev4_DW.obj_p.SampleTime !=
      firmware_rev4_P.SerialReceive_SampleTime) {
    firmware_rev4_DW.obj_p.SampleTime =
      firmware_rev4_P.SerialReceive_SampleTime;
  }

  firmware_rev4_B.SerialReceive_o2 = MW_SCI_Receive
    (firmware_rev4_DW.obj_p.MW_SCIHANDLE, firmware_rev4_B.RxDataLocChar,
     82U);
  memcpy((void *)&firmware_rev4_B.SerialReceive_o1[0], (void *)
         &firmware_rev4_B.RxDataLocChar[0], (uint32_T)((size_t)82 * sizeof
          (uint8_T)));

  /* End of MATLABSystem: '<S4>/Serial Receive' */

  /* DataTypeConversion: '<S1>/Cast1' incorporates:
   *  Constant: '<S1>/Serial Number'
   */
  firmware_rev4_B.Min_mb = fabs(firmware_rev4_P.SerialNumber_Value);
  if (firmware_rev4_B.Min_mb < 4.503599627370496E+15) {
    if (firmware_rev4_B.Min_mb >= 0.5) {
      firmware_rev4_B.Min_mb = floor(firmware_rev4_P.SerialNumber_Value +
        0.5);
    } else {
      firmware_rev4_B.Min_mb = firmware_rev4_P.SerialNumber_Value * 0.0;
    }
  } else {
    firmware_rev4_B.Min_mb = firmware_rev4_P.SerialNumber_Value;
  }

  if (rtIsNaN(firmware_rev4_B.Min_mb) || rtIsInf(firmware_rev4_B.Min_mb))
  {
    firmware_rev4_B.Min_mb = 0.0;
  } else {
    firmware_rev4_B.Min_mb = fmod(firmware_rev4_B.Min_mb, 65536.0);
  }

  firmware_rev4_B.Cast1 = (uint16_T)(firmware_rev4_B.Min_mb < 0.0 ?
    (int32_T)(uint16_T)-(int16_T)(uint16_T)-firmware_rev4_B.Min_mb : (int32_T)
    (uint16_T)firmware_rev4_B.Min_mb);

  /* End of DataTypeConversion: '<S1>/Cast1' */

  /* MATLABSystem: '<S1>/ATR_SIGNAL' */
  if (firmware_rev4_DW.obj_j.SampleTime !=
      firmware_rev4_P.ATR_SIGNAL_SampleTime) {
    firmware_rev4_DW.obj_j.SampleTime =
      firmware_rev4_P.ATR_SIGNAL_SampleTime;
  }

  MW_AnalogIn_Start(firmware_rev4_DW.obj_j.MW_ANALOGIN_HANDLE);
  MW_AnalogInSingle_ReadResult(firmware_rev4_DW.obj_j.MW_ANALOGIN_HANDLE,
    &firmware_rev4_B.Min_mb, 7);

  /* MATLABSystem: '<S1>/VENT_SIGNAL' */
  if (firmware_rev4_DW.obj_k.SampleTime !=
      firmware_rev4_P.VENT_SIGNAL_SampleTime) {
    firmware_rev4_DW.obj_k.SampleTime =
      firmware_rev4_P.VENT_SIGNAL_SampleTime;
  }

  MW_AnalogIn_Start(firmware_rev4_DW.obj_k.MW_ANALOGIN_HANDLE);
  MW_AnalogInSingle_ReadResult(firmware_rev4_DW.obj_k.MW_ANALOGIN_HANDLE,
    &firmware_rev4_B.Min_g, 7);

  /* Chart: '<S4>/EGRAM DATA COLLECTOR' incorporates:
   *  DataTypeConversion: '<S1>/Cast2'
   *  DataTypeConversion: '<S1>/Cast3'
   *  MATLABSystem: '<S1>/ATR_SIGNAL'
   *  MATLABSystem: '<S1>/VENT_SIGNAL'
   */
  if (firmware_rev4_DW.temporalCounter_i1 < MAX_uint32_T) {
    firmware_rev4_DW.temporalCounter_i1++;
  }

  if (firmware_rev4_DW.is_active_c7_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c7_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c7_firmware_rev4 = firmware_rev4_IN_Start;
    firmware_rev4_DW.wait = 2.0;
  } else {
    switch (firmware_rev4_DW.is_c7_firmware_rev4) {
     case firmware_rev4_IN_Send:
      firmware_rev4_B.msg_ready = true;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep1;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as1 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs1 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_Start:
      firmware_rev4_DW.is_c7_firmware_rev4 = firmware_rev4_IN_TimeStep1;
      firmware_rev4_DW.temporalCounter_i1 = 0U;
      firmware_rev4_B.as1 = (real32_T)firmware_rev4_B.Min_mb;
      firmware_rev4_B.vs1 = (real32_T)firmware_rev4_B.Min_g;
      firmware_rev4_B.msg_ready = false;
      break;

     case firmware_rev4_IN_TimeStep1:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep2;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as2 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs2 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep2:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep3;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as3 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs3 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep3:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep4;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as4 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs4 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep4:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep5;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as5 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs5 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep5:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep6;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as6 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs6 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep6:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep7;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as7 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs7 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep7:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep8;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as8 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs8 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     case firmware_rev4_IN_TimeStep8:
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 =
          firmware_rev4_IN_TimeStep9;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as9 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs9 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = false;
      }
      break;

     default:
      /* case IN_TimeStep9: */
      firmware_rev4_B.msg_ready = false;
      if ((firmware_rev4_DW.temporalCounter_i1 << 1) >= (uint32_T)ceil
          (firmware_rev4_DW.wait)) {
        firmware_rev4_DW.is_c7_firmware_rev4 = firmware_rev4_IN_Send;
        firmware_rev4_DW.temporalCounter_i1 = 0U;
        firmware_rev4_B.as10 = (real32_T)firmware_rev4_B.Min_mb;
        firmware_rev4_B.vs10 = (real32_T)firmware_rev4_B.Min_g;
        firmware_rev4_B.msg_ready = true;
      }
      break;
    }
  }

  /* End of Chart: '<S4>/EGRAM DATA COLLECTOR' */

  /* S-Function (any2byte): '<S37>/Byte Pack15' */

  /* Pack: <S37>/Byte Pack15 */
  (void) memcpy(&firmware_rev4_B.BytePack15[0], &firmware_rev4_B.vs10,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack14' */

  /* Pack: <S37>/Byte Pack14 */
  (void) memcpy(&firmware_rev4_B.BytePack14[0], &firmware_rev4_B.vs9,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack13' */

  /* Pack: <S37>/Byte Pack13 */
  (void) memcpy(&firmware_rev4_B.BytePack13[0], &firmware_rev4_B.vs8,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack19' */

  /* Pack: <S37>/Byte Pack19 */
  (void) memcpy(&firmware_rev4_B.BytePack19[0], &firmware_rev4_B.vs7,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack18' */

  /* Pack: <S37>/Byte Pack18 */
  (void) memcpy(&firmware_rev4_B.BytePack18[0], &firmware_rev4_B.vs6,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack17' */

  /* Pack: <S37>/Byte Pack17 */
  (void) memcpy(&firmware_rev4_B.BytePack17[0], &firmware_rev4_B.vs5,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack16' */

  /* Pack: <S37>/Byte Pack16 */
  (void) memcpy(&firmware_rev4_B.BytePack16[0], &firmware_rev4_B.vs4,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack5' */

  /* Pack: <S37>/Byte Pack5 */
  (void) memcpy(&firmware_rev4_B.BytePack5[0], &firmware_rev4_B.vs3,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack4' */

  /* Pack: <S37>/Byte Pack4 */
  (void) memcpy(&firmware_rev4_B.BytePack4[0], &firmware_rev4_B.vs2,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack3' */

  /* Pack: <S37>/Byte Pack3 */
  (void) memcpy(&firmware_rev4_B.BytePack3[0], &firmware_rev4_B.vs1,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack12' */

  /* Pack: <S37>/Byte Pack12 */
  (void) memcpy(&firmware_rev4_B.BytePack12[0], &firmware_rev4_B.as10,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack11' */

  /* Pack: <S37>/Byte Pack11 */
  (void) memcpy(&firmware_rev4_B.BytePack11[0], &firmware_rev4_B.as9,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack10' */

  /* Pack: <S37>/Byte Pack10 */
  (void) memcpy(&firmware_rev4_B.BytePack10[0], &firmware_rev4_B.as8,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack9' */

  /* Pack: <S37>/Byte Pack9 */
  (void) memcpy(&firmware_rev4_B.BytePack9[0], &firmware_rev4_B.as7,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack8' */

  /* Pack: <S37>/Byte Pack8 */
  (void) memcpy(&firmware_rev4_B.BytePack8[0], &firmware_rev4_B.as6,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack7' */

  /* Pack: <S37>/Byte Pack7 */
  (void) memcpy(&firmware_rev4_B.BytePack7[0], &firmware_rev4_B.as5,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack6' */

  /* Pack: <S37>/Byte Pack6 */
  (void) memcpy(&firmware_rev4_B.BytePack6[0], &firmware_rev4_B.as4,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack2' */

  /* Pack: <S37>/Byte Pack2 */
  (void) memcpy(&firmware_rev4_B.BytePack2[0], &firmware_rev4_B.as3,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack1' */

  /* Pack: <S37>/Byte Pack1 */
  (void) memcpy(&firmware_rev4_B.BytePack1[0], &firmware_rev4_B.as2,
                4);

  /* S-Function (any2byte): '<S37>/Byte Pack' */

  /* Pack: <S37>/Byte Pack */
  (void) memcpy(&firmware_rev4_B.BytePack[0], &firmware_rev4_B.as1,
                4);

  /* Chart: '<S4>/COM IN' */
  switch (firmware_rev4_DW.is_c2_firmware_rev4) {
   case firmware_rev_IN_EGRAM_TOGGLE:
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
    break;

   case firmware_rev4_IN_HANDSHAKE:
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
    break;

   case firmware_rev4_IN_INITIALIZE:
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
    break;

   case firmware__IN_MESSAGE_STORAGE:
    switch (firmware_rev4_B.msgTYPE) {
     case 2:
      firmware_rev4_DW.is_c2_firmware_rev4 =
        firmware_rev_IN_POLL_REQUEST;
      send_message(2.0);
      break;

     case 3:
      firmware_rev4_DW.is_c2_firmware_rev4 =
        firmware_r_IN_SET_TEMP_PARAM;
      firmware_rev4_B.temp_mode = firmware_rev4_DW.msg[2];
      firmware_rev4_B.temp_LRL = firmware_rev4_DW.msg[3];
      firmware_rev4_B.temp_URL = firmware_rev4_DW.msg[4];
      memcpy((void *)&firmware_rev4_B.temp_ARP_o, (void *)
             &firmware_rev4_DW.msg[5], (uint32_T)((size_t)1 * sizeof(uint16_T)));
      memcpy((void *)&firmware_rev4_B.temp_VRP_k, (void *)
             &firmware_rev4_DW.msg[7], (uint32_T)((size_t)1 * sizeof(uint16_T)));
      firmware_rev4_B.temp_APW = firmware_rev4_DW.msg[9];
      firmware_rev4_B.temp_VPW = firmware_rev4_DW.msg[10];
      memcpy((void *)&firmware_rev4_B.temp_AAmp_b, (void *)
             &firmware_rev4_DW.msg[11], (uint32_T)((size_t)1 * sizeof
              (real32_T)));
      memcpy((void *)&firmware_rev4_B.temp_VAmp_h, (void *)
             &firmware_rev4_DW.msg[15], (uint32_T)((size_t)1 * sizeof
              (real32_T)));
      memcpy((void *)&firmware_rev4_B.temp_ASens_f, (void *)
             &firmware_rev4_DW.msg[19], (uint32_T)((size_t)1 * sizeof
              (real32_T)));
      memcpy((void *)&firmware_rev4_B.temp_VSens_b, (void *)
             &firmware_rev4_DW.msg[23], (uint32_T)((size_t)1 * sizeof
              (real32_T)));
      memcpy((void *)&firmware_rev4_B.temp_AVDelay_m, (void *)
             &firmware_rev4_DW.msg[27], (uint32_T)((size_t)1 * sizeof
              (uint16_T)));
      firmware_rev4_B.temp_rateFactor = firmware_rev4_DW.msg[29];
      firmware_rev4_B.temp_actThres = firmware_rev4_DW.msg[30];
      firmware_rev4_B.temp_rxnTime = firmware_rev4_DW.msg[31];
      firmware_rev4_B.temp_recTime = firmware_rev4_DW.msg[32];
      send_message(3.0);
      break;

     case 4:
      firmware_rev4_DW.is_c2_firmware_rev4 =
        firmware_r_IN_SET_PERM_PARAM;
      firmware_rev4_B.mode = firmware_rev4_B.temp_mode;
      firmware_rev4_B.LRL = firmware_rev4_B.temp_LRL;
      firmware_rev4_B.URL = firmware_rev4_B.temp_URL;
      firmware_rev4_B.ARP_d = firmware_rev4_B.temp_ARP_o;
      firmware_rev4_B.VRP_l = firmware_rev4_B.temp_VRP_k;
      firmware_rev4_B.APW = firmware_rev4_B.temp_APW;
      firmware_rev4_B.VPW = firmware_rev4_B.temp_VPW;
      firmware_rev4_B.AAmp_d = firmware_rev4_B.temp_AAmp_b;
      firmware_rev4_B.VAmp_b = firmware_rev4_B.temp_VAmp_h;
      firmware_rev4_B.ASens_e = firmware_rev4_B.temp_ASens_f;
      firmware_rev4_B.VSens_j = firmware_rev4_B.temp_VSens_b;
      firmware_rev4_B.AVDelay_j = firmware_rev4_B.temp_AVDelay_m;
      firmware_rev4_B.rateFactor = firmware_rev4_B.temp_rateFactor;
      firmware_rev4_B.actThres = firmware_rev4_B.temp_actThres;
      firmware_rev4_B.rxnTime = firmware_rev4_B.temp_rxnTime;
      firmware_rev4_B.recTime = firmware_rev4_B.temp_recTime;
      send_message(4.0);
      break;

     case 5:
      firmware_rev4_DW.is_c2_firmware_rev4 =
        firmware_rev_IN_EGRAM_TOGGLE;
      firmware_rev4_B.egram_status = firmware_rev4_DW.msg[2];
      break;

     default:
      firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
      break;
    }
    break;

   case firmware_rev_IN_POLL_REQUEST:
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
    break;

   case firmware_r_IN_SET_PERM_PARAM:
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
    break;

   case firmware_r_IN_SET_TEMP_PARAM:
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
    break;

   default:
    /* case IN_STANDBY: */
    if (firmware_rev4_B.SerialReceive_o2 == 0) {
      if (firmware_rev4_B.SerialReceive_o1[1] == 1) {
        if ((firmware_rev4_B.SerialReceive_o1[2] == 72) &&
            ((firmware_rev4_B.SerialReceive_o1[3] == 101) &&
             ((firmware_rev4_B.SerialReceive_o1[4] == 97) &&
              ((firmware_rev4_B.SerialReceive_o1[5] == 114) &&
               ((firmware_rev4_B.SerialReceive_o1[6] == 116) &&
                ((firmware_rev4_B.SerialReceive_o1[7] == 70) &&
                 ((firmware_rev4_B.SerialReceive_o1[8] == 108) &&
                  ((firmware_rev4_B.SerialReceive_o1[9] == 111) &&
                   (firmware_rev4_B.SerialReceive_o1[10] == 119))))))))) {
          firmware_rev4_DW.is_c2_firmware_rev4 =
            firmware_rev4_IN_HANDSHAKE;
          firmware_rev4_B.msgID = firmware_rev4_B.SerialReceive_o1[0];
          firmware_rev4_B.msgTYPE = firmware_rev4_B.SerialReceive_o1[1];
          firmware_rev4_DW.hs_success = true;
          send_message(1.0);
        } else {
          firmware_rev4_DW.is_c2_firmware_rev4 =
            firmware_rev4_IN_STANDBY;
        }
      } else if (firmware_rev4_DW.hs_success) {
        firmware_rev4_DW.is_c2_firmware_rev4 =
          firmware__IN_MESSAGE_STORAGE;
        memcpy(&firmware_rev4_DW.msg[0],
               &firmware_rev4_B.SerialReceive_o1[0], 82U * sizeof(uint8_T));
        firmware_rev4_B.msgID = firmware_rev4_DW.msg[0];
        firmware_rev4_B.msgTYPE = firmware_rev4_DW.msg[1];
      } else {
        firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_STANDBY;
      }
    }
    break;
  }

  /* End of Chart: '<S4>/COM IN' */

  /* Chart: '<S2>/LED Pin Control' */
  if (firmware_rev4_DW.temporalCounter_i1_m < MAX_uint32_T) {
    firmware_rev4_DW.temporalCounter_i1_m++;
  }

  if (firmware_rev4_DW.is_active_c4_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c4_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_Initialize;
    firmware_rev4_DW.Off = 0.0;
    firmware_rev4_DW.AOO_m = 100.0;
    firmware_rev4_DW.VOO_a = 200.0;
    firmware_rev4_DW.AAI_o = 111.0;
    firmware_rev4_DW.VVI_h = 221.0;
    firmware_rev4_DW.AOOR_f = 109.0;
    firmware_rev4_DW.VOOR_k = 209.0;
    firmware_rev4_DW.AAIR_c = 120.0;
    firmware_rev4_DW.VVIR_a = 230.0;
    firmware_rev4_DW.DDD_i = 33.0;
    firmware_rev4_DW.DDDR_o = 42.0;
    firmware_rev4_DW.delay = 1.0;
  } else {
    switch (firmware_rev4_DW.is_c4_firmware_rev4) {
     case firmware_rev4_IN_AAI:
      firmware_rev4_AAI();
      break;

     case firmware_rev4_IN_AAIR:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
      if (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
          (firmware_rev4_DW.delay * 500.0)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_AAI;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = true;
        firmware_rev4_B.g = false;
        firmware_rev4_B.b = true;
      }
      break;

     case firmware_rev4_IN_AOO:
      firmware_rev4_B.r = true;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
      if ((firmware_rev4_B.mode != firmware_rev4_DW.AOO_m) &&
          (firmware_rev4_B.mode != firmware_rev4_DW.AOOR_f)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_VOO;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = false;
        firmware_rev4_B.g = true;
        firmware_rev4_B.b = false;
      } else {
        if ((firmware_rev4_B.mode == firmware_rev4_DW.AOOR_f) &&
            (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
             (firmware_rev4_DW.delay * 500.0))) {
          firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_AOOR;
          firmware_rev4_DW.temporalCounter_i1_m = 0U;
          firmware_rev4_B.r = false;
          firmware_rev4_B.g = false;
          firmware_rev4_B.b = false;
        }
      }
      break;

     case firmware_rev4_IN_AOOR:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
      if (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
          (firmware_rev4_DW.delay * 500.0)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_AOO;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = true;
        firmware_rev4_B.g = false;
        firmware_rev4_B.b = false;
      }
      break;

     case firmware_rev4_IN_DDD:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = true;
      firmware_rev4_B.b = true;
      if ((firmware_rev4_B.mode != firmware_rev4_DW.DDD_i) &&
          (firmware_rev4_B.mode != firmware_rev4_DW.DDDR_o)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_Off;
        firmware_rev4_B.r = true;
        firmware_rev4_B.g = true;
        firmware_rev4_B.b = true;
      } else {
        if ((firmware_rev4_B.mode == firmware_rev4_DW.DDDR_o) &&
            (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
             (firmware_rev4_DW.delay * 500.0))) {
          firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_DDDR;
          firmware_rev4_DW.temporalCounter_i1_m = 0U;
          firmware_rev4_B.r = false;
          firmware_rev4_B.g = false;
          firmware_rev4_B.b = false;
        }
      }
      break;

     case firmware_rev4_IN_DDDR:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
      if (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
          (firmware_rev4_DW.delay * 500.0)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_DDD;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = false;
        firmware_rev4_B.g = true;
        firmware_rev4_B.b = true;
      }
      break;

     case firmware_rev4_IN_Initialize:
      firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_Off;
      firmware_rev4_B.r = true;
      firmware_rev4_B.g = true;
      firmware_rev4_B.b = true;
      break;

     case firmware_rev4_IN_Off:
      firmware_rev4_B.r = true;
      firmware_rev4_B.g = true;
      firmware_rev4_B.b = true;
      if (firmware_rev4_B.mode != firmware_rev4_DW.Off) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_AOO;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = true;
        firmware_rev4_B.g = false;
        firmware_rev4_B.b = false;
      }
      break;

     case firmware_rev4_IN_VOO:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = true;
      firmware_rev4_B.b = false;
      if ((firmware_rev4_B.mode != firmware_rev4_DW.VOO_a) &&
          (firmware_rev4_B.mode != firmware_rev4_DW.VOOR_k)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_AAI;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = true;
        firmware_rev4_B.g = false;
        firmware_rev4_B.b = true;
      } else {
        if ((firmware_rev4_B.mode == firmware_rev4_DW.VOOR_k) &&
            (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
             (firmware_rev4_DW.delay * 500.0))) {
          firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_VOOR;
          firmware_rev4_DW.temporalCounter_i1_m = 0U;
          firmware_rev4_B.r = false;
          firmware_rev4_B.g = false;
          firmware_rev4_B.b = false;
        }
      }
      break;

     case firmware_rev4_IN_VOOR:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
      if (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
          (firmware_rev4_DW.delay * 500.0)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_VOO;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = false;
        firmware_rev4_B.g = true;
        firmware_rev4_B.b = false;
      }
      break;

     case firmware_rev4_IN_VVI:
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = true;
      if ((firmware_rev4_B.mode != firmware_rev4_DW.VVI_h) &&
          (firmware_rev4_B.mode != firmware_rev4_DW.VVIR_a)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_DDD;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = false;
        firmware_rev4_B.g = true;
        firmware_rev4_B.b = true;
      } else {
        if ((firmware_rev4_B.mode == firmware_rev4_DW.VVIR_a) &&
            (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
             (firmware_rev4_DW.delay * 500.0))) {
          firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_VVIR;
          firmware_rev4_DW.temporalCounter_i1_m = 0U;
          firmware_rev4_B.r = false;
          firmware_rev4_B.g = false;
          firmware_rev4_B.b = false;
        }
      }
      break;

     default:
      /* case IN_VVIR: */
      firmware_rev4_B.r = false;
      firmware_rev4_B.g = false;
      firmware_rev4_B.b = false;
      if (firmware_rev4_DW.temporalCounter_i1_m >= (uint32_T)ceil
          (firmware_rev4_DW.delay * 500.0)) {
        firmware_rev4_DW.is_c4_firmware_rev4 = firmware_rev4_IN_VVI;
        firmware_rev4_DW.temporalCounter_i1_m = 0U;
        firmware_rev4_B.r = false;
        firmware_rev4_B.g = false;
        firmware_rev4_B.b = true;
      }
      break;
    }
  }

  /* End of Chart: '<S2>/LED Pin Control' */

  /* MATLABSystem: '<S2>/Digital Write' */
  MW_digitalIO_write(firmware_rev4_DW.obj_k1.MW_DIGITALIO_HANDLE,
                     firmware_rev4_B.r);

  /* MATLABSystem: '<S2>/Digital Write1' */
  MW_digitalIO_write(firmware_rev4_DW.obj_pl.MW_DIGITALIO_HANDLE,
                     firmware_rev4_B.g);

  /* MATLABSystem: '<S2>/Digital Write2' */
  MW_digitalIO_write(firmware_rev4_DW.obj_h.MW_DIGITALIO_HANDLE,
                     firmware_rev4_B.b);

  /* MATLABSystem: '<S1>/ATR_CMP_DETECT' */
  if (firmware_rev4_DW.obj_m.SampleTime !=
      firmware_rev4_P.ATR_CMP_DETECT_SampleTime) {
    firmware_rev4_DW.obj_m.SampleTime =
      firmware_rev4_P.ATR_CMP_DETECT_SampleTime;
  }

  firmware_rev4_B.ATR_CMP_DETECT = MW_digitalIO_read
    (firmware_rev4_DW.obj_m.MW_DIGITALIO_HANDLE);

  /* End of MATLABSystem: '<S1>/ATR_CMP_DETECT' */

  /* MATLABSystem: '<S1>/VENT_CMP_DETECT' */
  if (firmware_rev4_DW.obj_d.SampleTime !=
      firmware_rev4_P.VENT_CMP_DETECT_SampleTime) {
    firmware_rev4_DW.obj_d.SampleTime =
      firmware_rev4_P.VENT_CMP_DETECT_SampleTime;
  }

  firmware_rev4_B.VENT_CMP_DETECT = MW_digitalIO_read
    (firmware_rev4_DW.obj_d.MW_DIGITALIO_HANDLE);

  /* End of MATLABSystem: '<S1>/VENT_CMP_DETECT' */

  /* MinMax: '<S14>/Max' incorporates:
   *  Constant: '<S14>/Constant'
   *  DataTypeConversion: '<S1>/Cast'
   */
  if ((firmware_rev4_B.LRL > firmware_rev4_P.Constant_Value_j) || rtIsNaN
      (firmware_rev4_P.Constant_Value_j)) {
    firmware_rev4_B.Min_mb = firmware_rev4_B.LRL;
  } else {
    firmware_rev4_B.Min_mb = firmware_rev4_P.Constant_Value_j;
  }

  /* End of MinMax: '<S14>/Max' */

  /* MinMax: '<S14>/Min' incorporates:
   *  Constant: '<S14>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_mb < firmware_rev4_P.Constant1_Value_l)) && (
       !rtIsNaN(firmware_rev4_P.Constant1_Value_l))) {
    firmware_rev4_B.Min_mb = firmware_rev4_P.Constant1_Value_l;
  }

  /* End of MinMax: '<S14>/Min' */

  /* MinMax: '<S7>/Min' incorporates:
   *  Constant: '<S7>/Constant'
   */
  if ((firmware_rev4_P.Constant_Value < firmware_rev4_B.Min_mb) || rtIsNaN
      (firmware_rev4_B.Min_mb)) {
    firmware_rev4_B.Add = firmware_rev4_P.Constant_Value;
  } else {
    firmware_rev4_B.Add = firmware_rev4_B.Min_mb;
  }

  /* End of MinMax: '<S7>/Min' */

  /* MinMax: '<S7>/Max' incorporates:
   *  Constant: '<S7>/Constant1'
   */
  if ((firmware_rev4_P.Constant1_Value > firmware_rev4_B.Add) || rtIsNaN
      (firmware_rev4_B.Add)) {
    firmware_rev4_B.Add = firmware_rev4_P.Constant1_Value;
  }

  /* End of MinMax: '<S7>/Max' */

  /* Sum: '<S7>/Subtract' incorporates:
   *  Constant: '<S7>/Constant2'
   *  Gain: '<S7>/Multiply'
   *  Gain: '<S7>/Multiply1'
   *  Gain: '<S7>/Multiply2'
   *  Math: '<S7>/Math Function'
   *  Math: '<S7>/Power'
   *
   * About '<S7>/Math Function':
   *  Operator: reciprocal
   */
  firmware_rev4_B.Subtract = 1.0 / (firmware_rev4_P.Multiply1_Gain *
    firmware_rev4_B.Add) * firmware_rev4_P.Multiply_Gain -
    firmware_rev4_P.Multiply2_Gain * rt_powd_snf(firmware_rev4_B.Min_mb,
    firmware_rev4_P.Constant2_Value_o);

  /* MinMax: '<S10>/Max' incorporates:
   *  Constant: '<S10>/Constant'
   */
  if ((firmware_rev4_B.APW > firmware_rev4_P.Constant_Value_e) || rtIsNaN
      (firmware_rev4_P.Constant_Value_e)) {
    firmware_rev4_B.Min = firmware_rev4_B.APW;
  } else {
    firmware_rev4_B.Min = firmware_rev4_P.Constant_Value_e;
  }

  /* MinMax: '<S10>/Min' incorporates:
   *  Constant: '<S10>/Constant1'
   */
  if ((!(firmware_rev4_B.Min < firmware_rev4_P.Constant1_Value_i)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_i))) {
    /* MinMax: '<S10>/Max' */
    firmware_rev4_B.Min = firmware_rev4_P.Constant1_Value_i;
  }

  /* End of MinMax: '<S10>/Min' */

  /* MinMax: '<S9>/Max' incorporates:
   *  Constant: '<S9>/Constant'
   */
  if ((firmware_rev4_B.VPW > firmware_rev4_P.Constant_Value_i) || rtIsNaN
      (firmware_rev4_P.Constant_Value_i)) {
    firmware_rev4_B.Min_e = firmware_rev4_B.VPW;
  } else {
    firmware_rev4_B.Min_e = firmware_rev4_P.Constant_Value_i;
  }

  /* MinMax: '<S9>/Min' incorporates:
   *  Constant: '<S9>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_e < firmware_rev4_P.Constant1_Value_n)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_n))) {
    /* MinMax: '<S9>/Max' */
    firmware_rev4_B.Min_e = firmware_rev4_P.Constant1_Value_n;
  }

  /* End of MinMax: '<S9>/Min' */

  /* MinMax: '<S12>/Max' incorporates:
   *  Constant: '<S12>/Constant'
   */
  if ((firmware_rev4_B.VRP_l > firmware_rev4_P.Constant_Value_b) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_b)) {
    firmware_rev4_B.Min_i = firmware_rev4_B.VRP_l;
  } else {
    firmware_rev4_B.Min_i = firmware_rev4_P.Constant_Value_b;
  }

  /* MinMax: '<S12>/Min' incorporates:
   *  Constant: '<S12>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_i < firmware_rev4_P.Constant1_Value_m)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_m))) {
    /* MinMax: '<S12>/Max' */
    firmware_rev4_B.Min_i = firmware_rev4_P.Constant1_Value_m;
  }

  /* End of MinMax: '<S12>/Min' */

  /* MinMax: '<S11>/Max' incorporates:
   *  Constant: '<S11>/Constant'
   */
  if ((firmware_rev4_B.ARP_d > firmware_rev4_P.Constant_Value_ic) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_ic)) {
    firmware_rev4_B.Min_b = firmware_rev4_B.ARP_d;
  } else {
    firmware_rev4_B.Min_b = firmware_rev4_P.Constant_Value_ic;
  }

  /* MinMax: '<S11>/Min' incorporates:
   *  Constant: '<S11>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_b < firmware_rev4_P.Constant1_Value_g)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_g))) {
    /* MinMax: '<S11>/Max' */
    firmware_rev4_B.Min_b = firmware_rev4_P.Constant1_Value_g;
  }

  /* End of MinMax: '<S11>/Min' */

  /* MinMax: '<S17>/Max' incorporates:
   *  Constant: '<S17>/Constant'
   */
  if ((firmware_rev4_B.recTime > firmware_rev4_P.Constant_Value_h) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_h)) {
    firmware_rev4_B.Min_g = firmware_rev4_B.recTime;
  } else {
    firmware_rev4_B.Min_g = firmware_rev4_P.Constant_Value_h;
  }

  /* End of MinMax: '<S17>/Max' */

  /* MinMax: '<S17>/Min' incorporates:
   *  Constant: '<S17>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_g < firmware_rev4_P.Constant1_Value_e)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_e))) {
    firmware_rev4_B.Min_g = firmware_rev4_P.Constant1_Value_e;
  }

  /* End of MinMax: '<S17>/Min' */

  /* MinMax: '<S18>/Max' incorporates:
   *  Constant: '<S18>/Constant'
   */
  if ((firmware_rev4_B.rxnTime > firmware_rev4_P.Constant_Value_m) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_m)) {
    firmware_rev4_B.Min_p = firmware_rev4_B.rxnTime;
  } else {
    firmware_rev4_B.Min_p = firmware_rev4_P.Constant_Value_m;
  }

  /* End of MinMax: '<S18>/Max' */

  /* MinMax: '<S18>/Min' incorporates:
   *  Constant: '<S18>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_p < firmware_rev4_P.Constant1_Value_it)) && (
       !rtIsNaN(firmware_rev4_P.Constant1_Value_it))) {
    firmware_rev4_B.Min_p = firmware_rev4_P.Constant1_Value_it;
  }

  /* End of MinMax: '<S18>/Min' */

  /* MinMax: '<S5>/Max' incorporates:
   *  Constant: '<S5>/Constant'
   */
  if ((firmware_rev4_B.actThres > firmware_rev4_P.Constant_Value_ib) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_ib)) {
    firmware_rev4_B.Add = firmware_rev4_B.actThres;
  } else {
    firmware_rev4_B.Add = firmware_rev4_P.Constant_Value_ib;
  }

  /* End of MinMax: '<S5>/Max' */

  /* MinMax: '<S5>/Min' incorporates:
   *  Constant: '<S5>/Constant1'
   */
  if ((!(firmware_rev4_B.Add < firmware_rev4_P.Constant1_Value_gl)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_gl))) {
    firmware_rev4_B.Add = firmware_rev4_P.Constant1_Value_gl;
  }

  /* End of MinMax: '<S5>/Min' */

  /* Sum: '<S16>/Add' incorporates:
   *  Constant: '<S16>/Constant'
   *  Gain: '<S16>/Multiply'
   */
  firmware_rev4_B.Add = firmware_rev4_P.Multiply_Gain_p *
    firmware_rev4_B.Add + firmware_rev4_P.Constant_Value_p;

  /* MATLABSystem: '<S23>/FXOS8700 6-Axes Sensor' */
  if (firmware_rev4_DW.obj_e.SampleTime !=
      firmware_rev4_P.FXOS87006AxesSensor_SampleTime) {
    firmware_rev4_DW.obj_e.SampleTime =
      firmware_rev4_P.FXOS87006AxesSensor_SampleTime;
  }

  status = 1U;
  status = MW_I2C_MasterWrite(firmware_rev4_DW.obj_e.i2cobj.MW_I2C_HANDLE,
    29U, &status, 1U, true, false);
  if (0 == status) {
    MW_I2C_MasterRead(firmware_rev4_DW.obj_e.i2cobj.MW_I2C_HANDLE, 29U,
                      output_raw, 6U, false, true);
    memcpy((void *)&b_output[0], (void *)&output_raw[0], (uint32_T)((size_t)3 *
            sizeof(int16_T)));
    memcpy((void *)&y[0], (void *)&b_output[0], (uint32_T)((size_t)2 * sizeof
            (uint8_T)));
    b_x[0] = y[1];
    b_x[1] = y[0];
    memcpy((void *)&b_output[0], (void *)&b_x[0], (uint32_T)((size_t)1 * sizeof
            (int16_T)));
    memcpy((void *)&y[0], (void *)&b_output[1], (uint32_T)((size_t)2 * sizeof
            (uint8_T)));
    b_x[0] = y[1];
    b_x[1] = y[0];
    memcpy((void *)&b_output[1], (void *)&b_x[0], (uint32_T)((size_t)1 * sizeof
            (int16_T)));
    memcpy((void *)&y[0], (void *)&b_output[2], (uint32_T)((size_t)2 * sizeof
            (uint8_T)));
    b_x[0] = y[1];
    b_x[1] = y[0];
    memcpy((void *)&b_output[2], (void *)&b_x[0], (uint32_T)((size_t)1 * sizeof
            (int16_T)));
  } else {
    b_output[0] = 0;
    b_output[1] = 0;
    b_output[2] = 0;
  }

  firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 = (real_T)(int16_T)(b_output
    [0] >> 2) * 2.0 * 0.244 / 1000.0;
  firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_1 = (real_T)(int16_T)(b_output
    [1] >> 2) * 2.0 * 0.244 / 1000.0;
  firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_2 = (real_T)(int16_T)(b_output
    [2] >> 2) * 2.0 * 0.244 / 1000.0;

  /* End of MATLABSystem: '<S23>/FXOS8700 6-Axes Sensor' */

  /* MATLABSystem: '<S23>/Moving Average' incorporates:
   *  Constant: '<S23>/Constant'
   *  Gain: '<S23>/Multiply'
   *  Math: '<S23>/Magnitude Squared'
   *  Math: '<S23>/Magnitude Squared1'
   *  Math: '<S23>/Magnitude Squared2'
   *  Sqrt: '<S23>/Sqrt'
   *  Sum: '<S23>/Add'
   *  Sum: '<S23>/Subtract'
   *
   * About '<S23>/Magnitude Squared':
   *  Operator: magnitude^2
   *
   * About '<S23>/Magnitude Squared1':
   *  Operator: magnitude^2
   *
   * About '<S23>/Magnitude Squared2':
   *  Operator: magnitude^2
   */
  if (firmware_rev4_DW.obj.TunablePropsChanged) {
    firmware_rev4_DW.obj.TunablePropsChanged = false;
  }

  if (firmware_rev4_DW.obj.pStatistic->isInitialized != 1) {
    firmware_rev4_DW.obj.pStatistic->isSetupComplete = false;
    firmware_rev4_DW.obj.pStatistic->isInitialized = 1;
    firmware_rev4_DW.obj.pStatistic->pCumSum = 0.0;
    firmware_rev4_DW.obj.pStatistic->pCumRevIndex = 1.0;
    firmware_rev4_DW.obj.pStatistic->isSetupComplete = true;
    firmware_rev4_DW.obj.pStatistic->pCumSum = 0.0;
    memset(&firmware_rev4_DW.obj.pStatistic->pCumSumRev[0], 0, 999U * sizeof
           (real_T));
    firmware_rev4_DW.obj.pStatistic->pCumRevIndex = 1.0;
  }

  firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 =
    SlidingWindowAverageCG_stepImpl(firmware_rev4_DW.obj.pStatistic, (sqrt
    ((firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 *
      firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 +
      firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_1 *
      firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_1) +
     firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_2 *
     firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_2) -
    firmware_rev4_P.Constant_Value_b5) * firmware_rev4_P.Multiply_Gain_d);

  /* Chart: '<S23>/Chart' incorporates:
   *  MATLABSystem: '<S23>/Moving Average'
   */
  if (firmware_rev4_DW.temporalCounter_i1_f < 511U) {
    firmware_rev4_DW.temporalCounter_i1_f++;
  }

  if (firmware_rev4_DW.is_active_c10_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c10_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c10_firmware_rev4 = firmware_rev4_IN_start;
    firmware_rev4_B.activity = 0.0;
  } else {
    switch (firmware_rev4_DW.is_c10_firmware_rev4) {
     case firmware_rev4_IN_Wait:
      if (firmware_rev4_DW.temporalCounter_i1_f >= 500U) {
        firmware_rev4_DW.is_c10_firmware_rev4 =
          firmware_rev_IN_pushActivity;
        firmware_rev4_B.activity =
          firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0;
      }
      break;

     case firmware_rev_IN_pushActivity:
      firmware_rev4_DW.is_c10_firmware_rev4 = firmware_rev4_IN_Wait;
      firmware_rev4_DW.temporalCounter_i1_f = 0U;
      break;

     default:
      /* case IN_start: */
      firmware_rev4_DW.is_c10_firmware_rev4 = firmware_rev4_IN_Wait;
      firmware_rev4_DW.temporalCounter_i1_f = 0U;
      break;
    }
  }

  /* End of Chart: '<S23>/Chart' */

  /* Chart: '<S16>/Is Active' */
  if (firmware_rev4_DW.is_active_c13_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c13_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c13_firmware_rev4 =
      firmware_rev4_IN_isNotActive;
    rtb_isActive = false;
  } else if (firmware_rev4_DW.is_c13_firmware_rev4 == 1) {
    rtb_isActive = true;
    if (firmware_rev4_B.activity < firmware_rev4_B.Add) {
      firmware_rev4_DW.is_c13_firmware_rev4 =
        firmware_rev4_IN_isNotActive;
      rtb_isActive = false;
    }
  } else {
    /* case IN_isNotActive: */
    rtb_isActive = false;
    if (firmware_rev4_B.activity >= firmware_rev4_B.Add) {
      firmware_rev4_DW.is_c13_firmware_rev4 = firmware_rev4_IN_isActive;
      rtb_isActive = true;
    }
  }

  /* End of Chart: '<S16>/Is Active' */

  /* MinMax: '<S13>/Max' incorporates:
   *  Constant: '<S13>/Constant'
   */
  if ((firmware_rev4_B.rateFactor > firmware_rev4_P.Constant_Value_bb) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_bb)) {
    firmware_rev4_B.Add = firmware_rev4_B.rateFactor;
  } else {
    firmware_rev4_B.Add = firmware_rev4_P.Constant_Value_bb;
  }

  /* End of MinMax: '<S13>/Max' */

  /* MinMax: '<S15>/Max' incorporates:
   *  Constant: '<S15>/Constant'
   *  DataTypeConversion: '<S1>/Cast4'
   */
  if ((firmware_rev4_B.URL > firmware_rev4_P.Constant_Value_ir) || rtIsNaN
      (firmware_rev4_P.Constant_Value_ir)) {
    firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 = firmware_rev4_B.URL;
  } else {
    firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 =
      firmware_rev4_P.Constant_Value_ir;
  }

  /* End of MinMax: '<S15>/Max' */

  /* MinMax: '<S13>/Min' incorporates:
   *  Constant: '<S13>/Constant1'
   */
  if ((!(firmware_rev4_B.Add < firmware_rev4_P.Constant1_Value_is)) &&
      (!rtIsNaN(firmware_rev4_P.Constant1_Value_is))) {
    firmware_rev4_B.Add = firmware_rev4_P.Constant1_Value_is;
  }

  /* End of MinMax: '<S13>/Min' */

  /* MinMax: '<S15>/Min' incorporates:
   *  Constant: '<S15>/Constant1'
   */
  if ((!(firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 <
         firmware_rev4_P.Constant1_Value_p)) && (!rtIsNaN
       (firmware_rev4_P.Constant1_Value_p))) {
    firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 =
      firmware_rev4_P.Constant1_Value_p;
  }

  /* End of MinMax: '<S15>/Min' */

  /* Sum: '<S25>/Add2' incorporates:
   *  Constant: '<S25>/Constant'
   *  Constant: '<S28>/Constant1'
   *  Constant: '<S29>/Constant1'
   *  Math: '<S28>/ln'
   *  Math: '<S29>/ln'
   *  Product: '<S25>/Divide'
   *  Product: '<S25>/Product'
   *  Sum: '<S25>/Subtract'
   *  Sum: '<S25>/Subtract1'
   *  Sum: '<S28>/Add'
   *  Sum: '<S29>/Add'
   *
   * About '<S28>/ln':
   *  Operator: log
   *
   * About '<S29>/ln':
   *  Operator: log
   */
  firmware_rev4_B.Add = log(firmware_rev4_B.activity +
    firmware_rev4_P.Constant1_Value_o) / log
    ((firmware_rev4_P.Constant_Value_a - firmware_rev4_B.Add) +
     firmware_rev4_P.Constant1_Value_mu) *
    (firmware_rev4_B.rtb_FXOS87006AxesSensor_idx_0 -
     firmware_rev4_B.Min_mb) + firmware_rev4_B.Min_mb;

  /* Chart: '<S16>/Chart1' */
  if (firmware_rev4_DW.temporalCounter_i1_l < 63U) {
    firmware_rev4_DW.temporalCounter_i1_l++;
  }

  if (firmware_rev4_DW.is_active_c12_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c12_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c12_firmware_rev4 = firmware_rev4_IN_start_k;
    firmware_rev4_B.HR = firmware_rev4_B.Min_mb;
  } else {
    switch (firmware_rev4_DW.is_c12_firmware_rev4) {
     case firmware_IN_ActiveDecreasing:
      if (!rtb_isActive) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Default;
        firmware_rev4_DW.tolerance = 1.0;
        firmware_rev4_DW.scaling = 1.0;
        firmware_rev4_DW.increment = 0.001;
      } else if (firmware_rev4_B.HR >= firmware_rev4_B.Add -
                 firmware_rev4_DW.tolerance) {
        firmware_rev4_DW.is_c12_firmware_rev4 = firmware_rev4_IN_AtMax;
        firmware_rev4_B.HR = firmware_rev4_B.Add;
      } else if ((firmware_rev4_DW.oldMSR > firmware_rev4_B.Add) &&
                 (firmware_rev4_DW.temporalCounter_i1_l >= 50U)) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_IN_ActiveDecreasing;
        firmware_rev4_DW.temporalCounter_i1_l = 0U;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_g + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
        firmware_rev4_DW.oldMSR = firmware_rev4_B.Add;
        firmware_rev4_DW.min = firmware_rev4_B.Min_mb;
        firmware_rev4_DW.max = firmware_rev4_B.HR;
      } else if (firmware_rev4_B.HR < firmware_rev4_B.Add) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Increase;
        firmware_rev4_DW.min = firmware_rev4_B.HR;
        firmware_rev4_DW.max = firmware_rev4_B.Add;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_p + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
      } else {
        firmware_rev4_DW.t_g += firmware_rev4_DW.increment;
        firmware_rev4_B.HR = firmware_rev4_DW.max - log
          (firmware_rev4_DW.scaling * firmware_rev4_DW.t_g + 1.0) /
          firmware_rev4_DW.logScaling * (firmware_rev4_DW.max -
          firmware_rev4_DW.min);
      }
      break;

     case firmware_rev4_IN_AtMax:
      if (!rtb_isActive) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Default;
        firmware_rev4_DW.tolerance = 1.0;
        firmware_rev4_DW.scaling = 1.0;
        firmware_rev4_DW.increment = 0.001;
      } else if (firmware_rev4_B.HR < firmware_rev4_B.Add) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Increase;
        firmware_rev4_DW.min = firmware_rev4_B.HR;
        firmware_rev4_DW.max = firmware_rev4_B.Add;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_p + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
      } else {
        if (firmware_rev4_B.HR > firmware_rev4_B.Add) {
          firmware_rev4_DW.is_c12_firmware_rev4 =
            firmware_IN_ActiveDecreasing;
          firmware_rev4_DW.temporalCounter_i1_l = 0U;
          firmware_rev4_DW.t_g = 0.0;
          firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
            firmware_rev4_B.Min_g + 1.0;
          firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
          firmware_rev4_DW.oldMSR = firmware_rev4_B.Add;
          firmware_rev4_DW.min = firmware_rev4_B.Min_mb;
          firmware_rev4_DW.max = firmware_rev4_B.HR;
        }
      }
      break;

     case firmware_rev4_IN_AtMin:
      if (rtb_isActive) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Default;
        firmware_rev4_DW.tolerance = 1.0;
        firmware_rev4_DW.scaling = 1.0;
        firmware_rev4_DW.increment = 0.001;
      }
      break;

     case firmware_rev4_IN_Decreasing:
      if (rtb_isActive) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Default;
        firmware_rev4_DW.tolerance = 1.0;
        firmware_rev4_DW.scaling = 1.0;
        firmware_rev4_DW.increment = 0.001;
      } else if (firmware_rev4_B.HR <= firmware_rev4_B.Min_mb +
                 firmware_rev4_DW.tolerance) {
        firmware_rev4_DW.is_c12_firmware_rev4 = firmware_rev4_IN_AtMin;
        firmware_rev4_B.HR = firmware_rev4_B.Min_mb;
      } else {
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_g + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
        firmware_rev4_DW.t_g += firmware_rev4_DW.increment;
        firmware_rev4_B.HR = firmware_rev4_DW.max - log
          (firmware_rev4_DW.scaling * firmware_rev4_DW.t_g + 1.0) /
          firmware_rev4_DW.logScaling * (firmware_rev4_DW.max -
          firmware_rev4_DW.min);
      }
      break;

     case firmware_rev4_IN_Default:
      if (rtb_isActive) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Increase;
        firmware_rev4_DW.min = firmware_rev4_B.HR;
        firmware_rev4_DW.max = firmware_rev4_B.Add;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_p + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
      } else {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Decreasing;
        firmware_rev4_DW.scaling = 0.25;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.max = firmware_rev4_B.HR;
        firmware_rev4_DW.min = firmware_rev4_B.Min_mb;
      }
      break;

     case firmware_rev4_IN_Increase:
      if (!rtb_isActive) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Default;
        firmware_rev4_DW.tolerance = 1.0;
        firmware_rev4_DW.scaling = 1.0;
        firmware_rev4_DW.increment = 0.001;
      } else if (firmware_rev4_B.HR >= firmware_rev4_B.Add -
                 firmware_rev4_DW.tolerance) {
        firmware_rev4_DW.is_c12_firmware_rev4 = firmware_rev4_IN_AtMax;
        firmware_rev4_B.HR = firmware_rev4_B.Add;
      } else if (firmware_rev4_B.Add > firmware_rev4_DW.max) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_rev4_IN_Increase;
        firmware_rev4_DW.min = firmware_rev4_B.HR;
        firmware_rev4_DW.max = firmware_rev4_B.Add;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_p + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
      } else if (firmware_rev4_B.HR > firmware_rev4_B.Add) {
        firmware_rev4_DW.is_c12_firmware_rev4 =
          firmware_IN_ActiveDecreasing;
        firmware_rev4_DW.temporalCounter_i1_l = 0U;
        firmware_rev4_DW.t_g = 0.0;
        firmware_rev4_DW.logScaling = firmware_rev4_DW.scaling *
          firmware_rev4_B.Min_g + 1.0;
        firmware_rev4_DW.logScaling = log(firmware_rev4_DW.logScaling);
        firmware_rev4_DW.oldMSR = firmware_rev4_B.Add;
        firmware_rev4_DW.min = firmware_rev4_B.Min_mb;
        firmware_rev4_DW.max = firmware_rev4_B.HR;
      } else {
        firmware_rev4_DW.t_g += firmware_rev4_DW.increment;
        firmware_rev4_B.HR = log(firmware_rev4_DW.scaling *
          firmware_rev4_DW.t_g + 1.0) / firmware_rev4_DW.logScaling *
          (firmware_rev4_DW.max - firmware_rev4_DW.min) +
          firmware_rev4_DW.min;
      }
      break;

     default:
      /* case IN_start: */
      firmware_rev4_DW.is_c12_firmware_rev4 = firmware_rev4_IN_Default;
      firmware_rev4_DW.tolerance = 1.0;
      firmware_rev4_DW.scaling = 1.0;
      firmware_rev4_DW.increment = 0.001;
      break;
    }
  }

  /* End of Chart: '<S16>/Chart1' */

  /* MinMax: '<S8>/Min' incorporates:
   *  Constant: '<S8>/Constant'
   */
  if ((firmware_rev4_P.Constant_Value_l < firmware_rev4_B.HR) || rtIsNaN
      (firmware_rev4_B.HR)) {
    firmware_rev4_B.Add = firmware_rev4_P.Constant_Value_l;
  } else {
    firmware_rev4_B.Add = firmware_rev4_B.HR;
  }

  /* End of MinMax: '<S8>/Min' */

  /* MinMax: '<S8>/Max' incorporates:
   *  Constant: '<S8>/Constant1'
   */
  if ((firmware_rev4_P.Constant1_Value_lu > firmware_rev4_B.Add) ||
      rtIsNaN(firmware_rev4_B.Add)) {
    firmware_rev4_B.Add = firmware_rev4_P.Constant1_Value_lu;
  }

  /* End of MinMax: '<S8>/Max' */

  /* Sum: '<S8>/Subtract' incorporates:
   *  Constant: '<S8>/Constant2'
   *  Gain: '<S8>/Multiply'
   *  Gain: '<S8>/Multiply1'
   *  Gain: '<S8>/Multiply2'
   *  Math: '<S8>/Math Function'
   *  Math: '<S8>/Power'
   *
   * About '<S8>/Math Function':
   *  Operator: reciprocal
   */
  firmware_rev4_B.Subtract_k = 1.0 / (firmware_rev4_P.Multiply1_Gain_c *
    firmware_rev4_B.Add) * firmware_rev4_P.Multiply_Gain_j -
    firmware_rev4_P.Multiply2_Gain_n * rt_powd_snf(firmware_rev4_B.HR,
    firmware_rev4_P.Constant2_Value_l);

  /* MinMax: '<S6>/Max' incorporates:
   *  Constant: '<S6>/Constant'
   */
  if ((firmware_rev4_B.AVDelay_j > firmware_rev4_P.Constant_Value_k) ||
      rtIsNaN(firmware_rev4_P.Constant_Value_k)) {
    firmware_rev4_B.Min_m = firmware_rev4_B.AVDelay_j;
  } else {
    firmware_rev4_B.Min_m = firmware_rev4_P.Constant_Value_k;
  }

  /* MinMax: '<S6>/Min' incorporates:
   *  Constant: '<S6>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_m < firmware_rev4_P.Constant1_Value_m3)) && (
       !rtIsNaN(firmware_rev4_P.Constant1_Value_m3))) {
    /* MinMax: '<S6>/Max' */
    firmware_rev4_B.Min_m = firmware_rev4_P.Constant1_Value_m3;
  }

  /* End of MinMax: '<S6>/Min' */

  /* MATLABSystem: '<S1>/PUSH_BUTTON_SW3' */
  if (firmware_rev4_DW.obj_ey.SampleTime !=
      firmware_rev4_P.PUSH_BUTTON_SW3_SampleTime) {
    firmware_rev4_DW.obj_ey.SampleTime =
      firmware_rev4_P.PUSH_BUTTON_SW3_SampleTime;
  }

  firmware_rev4_B.PUSH_BUTTON_SW3 = MW_digitalIO_read
    (firmware_rev4_DW.obj_ey.MW_DIGITALIO_HANDLE);

  /* End of MATLABSystem: '<S1>/PUSH_BUTTON_SW3' */

  /* Chart: '<Root>/Pacemaker Control' */
  if (firmware_rev4_DW.temporalCounter_i1_o < MAX_uint32_T) {
    firmware_rev4_DW.temporalCounter_i1_o++;
  }

  if (firmware_rev4_DW.is_active_c3_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c3_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Initialize;
    firmware_rev4_DW.AOO = 100.0;
    firmware_rev4_DW.VOO = 200.0;
    firmware_rev4_DW.AAI = 111.0;
    firmware_rev4_DW.VVI = 221.0;
    firmware_rev4_DW.AOOR = 109.0;
    firmware_rev4_DW.VOOR = 209.0;
    firmware_rev4_DW.AAIR = 120.0;
    firmware_rev4_DW.VVIR = 230.0;
    firmware_rev4_DW.DDD = 33.0;
    firmware_rev4_DW.DDDR = 42.0;
  } else {
    switch (firmware_rev4_DW.is_c3_firmware_rev4) {
     case firmware_rev4_IN_AAI:
      firmware_rev4_AAI_l();
      break;

     case firmware_rev4_IN_AAIR:
      firmware_rev4_AAIR();
      break;

     case firmware_rev4_IN_AOO:
      firmware_rev4_AOO();
      break;

     case firmware_rev4_IN_AOOR:
      firmware_rev4_AOOR();
      break;

     case firmware_rev4_IN_DDD:
      firmware_rev4_DDD();
      break;

     case firmware_rev4_IN_DDDR:
      firmware_rev4_DDDR();
      break;

     case firmware_rev4_IN_Initialize:
      firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
      firmware_rev4_B.reset = true;
      firmware_rev4_B.preparePaceAtrium = false;
      firmware_rev4_B.paceAtrium = false;
      firmware_rev4_B.preparePaceVentricle = false;
      firmware_rev4_B.paceVentricle = false;
      firmware_rev4_B.sense = false;
      break;

     case firmware_rev4_IN_Off:
      firmware_rev4_Off();
      break;

     case firmware_rev4_IN_VOO:
      firmware_rev4_VOO();
      break;

     case firmware_rev4_IN_VOOR:
      if (firmware_rev4_B.mode != firmware_rev4_DW.VOOR) {
        switch (firmware_rev4_DW.is_VOOR) {
         case firmware_rev4_IN_Prep:
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_VOOR = firmware__IN_NO_ACTIVE_CHILD;
          break;

         case firmware_rev4_IN_Shock:
          firmware_rev4_B.paceVentricle = false;
          firmware_rev4_DW.is_VOOR = firmware__IN_NO_ACTIVE_CHILD;
          break;
        }

        firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
        firmware_rev4_B.reset = true;
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_B.paceVentricle = false;
        firmware_rev4_B.sense = false;
      } else if (firmware_rev4_DW.is_VOOR == 1) {
        if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
            (firmware_rev4_B.Subtract_k - firmware_rev4_B.Min_e)) {
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_VOOR = firmware_rev4_IN_Shock;
          firmware_rev4_DW.temporalCounter_i1_o = 0U;
          firmware_rev4_B.paceVentricle = true;
        }
      } else {
        /* case IN_Shock: */
        if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
            (firmware_rev4_B.Min_e)) {
          firmware_rev4_B.paceVentricle = false;
          firmware_rev4_DW.is_VOOR = firmware_rev4_IN_Prep;
          firmware_rev4_DW.temporalCounter_i1_o = 0U;
          firmware_rev4_B.preparePaceVentricle = true;
        }
      }
      break;

     case firmware_rev4_IN_VVI:
      if (firmware_rev4_B.mode != firmware_rev4_DW.VVI) {
        switch (firmware_rev4_DW.is_VVI) {
         case firmware_rev4_IN_Pace:
          firmware_rev4_B.paceVentricle = false;
          firmware_rev4_DW.is_VVI = firmware__IN_NO_ACTIVE_CHILD;
          break;

         case firmware_rev4_IN_Sense:
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_VVI = firmware__IN_NO_ACTIVE_CHILD;
          break;

         case firmware_rev_IN_SenseDelay_p:
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_VVI = firmware__IN_NO_ACTIVE_CHILD;
          break;
        }

        firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
        firmware_rev4_B.reset = true;
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_B.paceVentricle = false;
        firmware_rev4_B.sense = false;
      } else {
        switch (firmware_rev4_DW.is_VVI) {
         case firmware_rev4_IN_Pace:
          if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
              (firmware_rev4_B.Min_e)) {
            firmware_rev4_B.paceVentricle = false;
            firmware_rev4_DW.is_VVI = firmware_rev4_IN_Sense;
            firmware_rev4_DW.temporalCounter_i1_o = 0U;
            firmware_rev4_B.preparePaceVentricle = true;
            firmware_rev4_B.sense = true;
          }
          break;

         case firmware_rev4_IN_Sense:
          firmware_rev4_B.sense = true;
          tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
          if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract)) && (tmp >=
               (uint32_T)ceil(firmware_rev4_B.Min_i))) {
            firmware_rev4_B.preparePaceVentricle = false;
            firmware_rev4_DW.is_VVI = firmware_rev4_IN_Pace;
            firmware_rev4_DW.temporalCounter_i1_o = 0U;
            firmware_rev4_B.paceVentricle = true;
          } else {
            if (firmware_rev4_B.VENT_CMP_DETECT) {
              firmware_rev4_DW.is_VVI = firmware_rev_IN_SenseDelay_p;
              firmware_rev4_DW.temporalCounter_i1_o = 0U;
              firmware_rev4_B.preparePaceVentricle = true;
              firmware_rev4_B.sense = true;
            }
          }
          break;

         default:
          /* case IN_SenseDelay: */
          firmware_rev4_B.sense = true;
          if (firmware_rev4_B.VENT_CMP_DETECT &&
              (firmware_rev4_DW.temporalCounter_i1_o >= 50U)) {
            firmware_rev4_DW.is_VVI = firmware_rev_IN_SenseDelay_p;
            firmware_rev4_DW.temporalCounter_i1_o = 0U;
            firmware_rev4_B.preparePaceVentricle = true;
            firmware_rev4_B.sense = true;
          } else {
            tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
            if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract)) && (tmp >=
                 (uint32_T)ceil(firmware_rev4_B.Min_i))) {
              firmware_rev4_B.preparePaceVentricle = false;
              firmware_rev4_DW.is_VVI = firmware_rev4_IN_Pace;
              firmware_rev4_DW.temporalCounter_i1_o = 0U;
              firmware_rev4_B.paceVentricle = true;
            }
          }
          break;
        }
      }
      break;

     default:
      /* case IN_VVIR: */
      if (firmware_rev4_B.mode != firmware_rev4_DW.VVIR) {
        switch (firmware_rev4_DW.is_VVIR) {
         case firmware_rev4_IN_Pace:
          firmware_rev4_B.paceVentricle = false;
          firmware_rev4_DW.is_VVIR = firmware__IN_NO_ACTIVE_CHILD;
          break;

         case firmware_rev4_IN_Sense:
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_VVIR = firmware__IN_NO_ACTIVE_CHILD;
          break;

         case firmware_rev_IN_SenseDelay_p:
          firmware_rev4_B.preparePaceVentricle = false;
          firmware_rev4_DW.is_VVIR = firmware__IN_NO_ACTIVE_CHILD;
          break;
        }

        firmware_rev4_DW.is_c3_firmware_rev4 = firmware_rev4_IN_Off;
        firmware_rev4_B.reset = true;
        firmware_rev4_B.preparePaceAtrium = false;
        firmware_rev4_B.paceAtrium = false;
        firmware_rev4_B.preparePaceVentricle = false;
        firmware_rev4_B.paceVentricle = false;
        firmware_rev4_B.sense = false;
      } else {
        switch (firmware_rev4_DW.is_VVIR) {
         case firmware_rev4_IN_Pace:
          if ((firmware_rev4_DW.temporalCounter_i1_o << 1) >= (uint32_T)ceil
              (firmware_rev4_B.Min_e)) {
            firmware_rev4_B.paceVentricle = false;
            firmware_rev4_DW.is_VVIR = firmware_rev4_IN_Sense;
            firmware_rev4_DW.temporalCounter_i1_o = 0U;
            firmware_rev4_B.preparePaceVentricle = true;
            firmware_rev4_B.sense = true;
          }
          break;

         case firmware_rev4_IN_Sense:
          firmware_rev4_B.sense = true;
          tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
          if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract_k)) && (tmp >=
               (uint32_T)ceil(firmware_rev4_B.Min_i))) {
            firmware_rev4_B.preparePaceVentricle = false;
            firmware_rev4_DW.is_VVIR = firmware_rev4_IN_Pace;
            firmware_rev4_DW.temporalCounter_i1_o = 0U;
            firmware_rev4_B.paceVentricle = true;
          } else {
            if (firmware_rev4_B.VENT_CMP_DETECT) {
              firmware_rev4_DW.is_VVIR = firmware_rev_IN_SenseDelay_p;
              firmware_rev4_DW.temporalCounter_i1_o = 0U;
              firmware_rev4_B.preparePaceVentricle = true;
              firmware_rev4_B.sense = true;
            }
          }
          break;

         default:
          /* case IN_SenseDelay: */
          firmware_rev4_B.sense = true;
          if (firmware_rev4_B.VENT_CMP_DETECT &&
              (firmware_rev4_DW.temporalCounter_i1_o >= 50U)) {
            firmware_rev4_DW.is_VVIR = firmware_rev_IN_SenseDelay_p;
            firmware_rev4_DW.temporalCounter_i1_o = 0U;
            firmware_rev4_B.preparePaceVentricle = true;
            firmware_rev4_B.sense = true;
          } else {
            tmp = firmware_rev4_DW.temporalCounter_i1_o << 1;
            if ((tmp >= (uint32_T)ceil(firmware_rev4_B.Subtract_k)) && (tmp >=
                 (uint32_T)ceil(firmware_rev4_B.Min_i))) {
              firmware_rev4_B.preparePaceVentricle = false;
              firmware_rev4_DW.is_VVIR = firmware_rev4_IN_Pace;
              firmware_rev4_DW.temporalCounter_i1_o = 0U;
              firmware_rev4_B.paceVentricle = true;
            }
          }
          break;
        }
      }
      break;
    }
  }

  /* End of Chart: '<Root>/Pacemaker Control' */

  /* MinMax: '<S20>/Max' incorporates:
   *  Constant: '<S20>/Constant'
   *  Gain: '<S20>/Multiply'
   *  Gain: '<S20>/Multiply1'
   *  Rounding: '<S20>/Round'
   */
  firmware_rev4_B.Min_mb = rt_roundf_snf(firmware_rev4_P.Multiply1_Gain_g *
    firmware_rev4_B.AAmp_d * firmware_rev4_P.Multiply_Gain_k);
  if ((!(firmware_rev4_B.Min_mb > firmware_rev4_P.Constant_Value_mh)) && (
       !rtIsNaN(firmware_rev4_P.Constant_Value_mh))) {
    firmware_rev4_B.Min_mb = firmware_rev4_P.Constant_Value_mh;
  }

  /* End of MinMax: '<S20>/Max' */

  /* MinMax: '<S20>/Min' incorporates:
   *  Constant: '<S20>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_mb < firmware_rev4_P.Constant1_Value_c)) && (
       !rtIsNaN(firmware_rev4_P.Constant1_Value_c))) {
    firmware_rev4_B.Min_mb = firmware_rev4_P.Constant1_Value_c;
  }

  /* End of MinMax: '<S20>/Min' */

  /* MinMax: '<S19>/Max' incorporates:
   *  Constant: '<S19>/Constant'
   *  Gain: '<S19>/Multiply'
   *  Gain: '<S19>/Multiply1'
   *  Rounding: '<S19>/Round'
   */
  firmware_rev4_B.Min_g = rt_roundf_snf(firmware_rev4_P.Multiply1_Gain_p *
    firmware_rev4_B.VAmp_b * firmware_rev4_P.Multiply_Gain_f);
  if ((!(firmware_rev4_B.Min_g > firmware_rev4_P.Constant_Value_mha)) && (
       !rtIsNaN(firmware_rev4_P.Constant_Value_mha))) {
    firmware_rev4_B.Min_g = firmware_rev4_P.Constant_Value_mha;
  }

  /* End of MinMax: '<S19>/Max' */

  /* MinMax: '<S19>/Min' incorporates:
   *  Constant: '<S19>/Constant1'
   */
  if ((!(firmware_rev4_B.Min_g < firmware_rev4_P.Constant1_Value_oi)) && (
       !rtIsNaN(firmware_rev4_P.Constant1_Value_oi))) {
    firmware_rev4_B.Min_g = firmware_rev4_P.Constant1_Value_oi;
  }

  /* End of MinMax: '<S19>/Min' */

  /* Chart: '<S2>/Pacing Pin Control' */
  if (firmware_rev4_DW.is_active_c1_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c1_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c1_firmware_rev4 = firmware_rev4_IN_Default_o;
    rtb_VENT_PACE_CTRL = false;
    rtb_isActive = false;
    firmware_rev4_B.PACING_REF_PWM = 0.0;
    rtb_PACE_CHARGE_CTRL = false;
    rtb_PACE_GND_CTRL = false;
    rtb_ATR_GND_CTRL = false;
    rtb_VENT_GND_CTRL = false;
  } else {
    switch (firmware_rev4_DW.is_c1_firmware_rev4) {
     case firmware_rev4_IN_Default_o:
      rtb_VENT_PACE_CTRL = false;
      rtb_isActive = false;
      rtb_PACE_CHARGE_CTRL = false;
      rtb_PACE_GND_CTRL = false;
      rtb_ATR_GND_CTRL = false;
      rtb_VENT_GND_CTRL = false;
      if (firmware_rev4_B.preparePaceAtrium) {
        firmware_rev4_DW.is_c1_firmware_rev4 =
          firmware_Simulin_IN_PreparePaceAtrium;
        firmware_rev4_B.PACING_REF_PWM = firmware_rev4_B.Min_mb;
        rtb_PACE_CHARGE_CTRL = true;
        rtb_PACE_GND_CTRL = true;
        rtb_ATR_GND_CTRL = true;
      } else {
        if (firmware_rev4_B.preparePaceVentricle) {
          firmware_rev4_DW.is_c1_firmware_rev4 =
            firmware_Simu_IN_PreparePaceVentricle;
          firmware_rev4_B.PACING_REF_PWM = firmware_rev4_B.Min_g;
          rtb_PACE_CHARGE_CTRL = true;
          rtb_PACE_GND_CTRL = true;
          rtb_VENT_GND_CTRL = true;
        }
      }
      break;

     case firmware_rev4_IN_PaceAtrium:
      rtb_PACE_CHARGE_CTRL = false;
      rtb_PACE_GND_CTRL = true;
      rtb_VENT_PACE_CTRL = false;
      rtb_VENT_GND_CTRL = false;
      rtb_ATR_GND_CTRL = false;
      rtb_isActive = true;
      if (firmware_rev4_B.preparePaceAtrium) {
        firmware_rev4_DW.is_c1_firmware_rev4 =
          firmware_Simulin_IN_PreparePaceAtrium;
        rtb_isActive = false;
        firmware_rev4_B.PACING_REF_PWM = firmware_rev4_B.Min_mb;
        rtb_PACE_CHARGE_CTRL = true;
        rtb_ATR_GND_CTRL = true;
      } else {
        if (firmware_rev4_B.reset) {
          firmware_rev4_DW.is_c1_firmware_rev4 =
            firmware_rev4_IN_Default_o;
          rtb_isActive = false;
          firmware_rev4_B.PACING_REF_PWM = 0.0;
          rtb_PACE_GND_CTRL = false;
        }
      }
      break;

     case firmware_re_IN_PaceVentricle:
      rtb_PACE_CHARGE_CTRL = false;
      rtb_PACE_GND_CTRL = true;
      rtb_isActive = false;
      rtb_ATR_GND_CTRL = false;
      rtb_VENT_GND_CTRL = false;
      rtb_VENT_PACE_CTRL = true;
      if (firmware_rev4_B.preparePaceVentricle) {
        firmware_rev4_DW.is_c1_firmware_rev4 =
          firmware_Simu_IN_PreparePaceVentricle;
        rtb_VENT_PACE_CTRL = false;
        firmware_rev4_B.PACING_REF_PWM = firmware_rev4_B.Min_g;
        rtb_PACE_CHARGE_CTRL = true;
        rtb_VENT_GND_CTRL = true;
      } else {
        if (firmware_rev4_B.reset) {
          firmware_rev4_DW.is_c1_firmware_rev4 =
            firmware_rev4_IN_Default_o;
          rtb_VENT_PACE_CTRL = false;
          firmware_rev4_B.PACING_REF_PWM = 0.0;
          rtb_PACE_GND_CTRL = false;
        }
      }
      break;

     case firmware_Simulin_IN_PreparePaceAtrium:
      rtb_VENT_PACE_CTRL = false;
      rtb_isActive = false;
      rtb_PACE_CHARGE_CTRL = true;
      rtb_PACE_GND_CTRL = true;
      rtb_ATR_GND_CTRL = true;
      rtb_VENT_GND_CTRL = false;
      if (firmware_rev4_B.paceAtrium) {
        firmware_rev4_DW.is_c1_firmware_rev4 =
          firmware_rev4_IN_PaceAtrium;
        rtb_PACE_CHARGE_CTRL = false;
        rtb_ATR_GND_CTRL = false;
        rtb_isActive = true;
        firmware_rev4_B.PACING_REF_PWM = 0.0;
      } else {
        if (firmware_rev4_B.reset) {
          firmware_rev4_DW.is_c1_firmware_rev4 =
            firmware_rev4_IN_Default_o;
          firmware_rev4_B.PACING_REF_PWM = 0.0;
          rtb_PACE_CHARGE_CTRL = false;
          rtb_PACE_GND_CTRL = false;
          rtb_ATR_GND_CTRL = false;
        }
      }
      break;

     default:
      /* case IN_PreparePaceVentricle: */
      rtb_isActive = false;
      rtb_VENT_PACE_CTRL = false;
      rtb_PACE_CHARGE_CTRL = true;
      rtb_PACE_GND_CTRL = true;
      rtb_VENT_GND_CTRL = true;
      rtb_ATR_GND_CTRL = false;
      if (firmware_rev4_B.paceVentricle) {
        firmware_rev4_DW.is_c1_firmware_rev4 =
          firmware_re_IN_PaceVentricle;
        rtb_PACE_CHARGE_CTRL = false;
        rtb_VENT_GND_CTRL = false;
        rtb_VENT_PACE_CTRL = true;
        firmware_rev4_B.PACING_REF_PWM = 0.0;
      } else {
        if (firmware_rev4_B.reset) {
          firmware_rev4_DW.is_c1_firmware_rev4 =
            firmware_rev4_IN_Default_o;
          firmware_rev4_B.PACING_REF_PWM = 0.0;
          rtb_PACE_CHARGE_CTRL = false;
          rtb_PACE_GND_CTRL = false;
          rtb_VENT_GND_CTRL = false;
        }
      }
      break;
    }
  }

  /* End of Chart: '<S2>/Pacing Pin Control' */

  /* MATLABSystem: '<S2>/ATR_GND_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_n.MW_DIGITALIO_HANDLE,
                     rtb_ATR_GND_CTRL);

  /* MATLABSystem: '<S2>/ATR_PACE_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_jb.MW_DIGITALIO_HANDLE,
                     rtb_isActive);

  /* MATLABSystem: '<S2>/PACE_CHARGE_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_i.MW_DIGITALIO_HANDLE,
                     rtb_PACE_CHARGE_CTRL);

  /* MATLABSystem: '<S2>/PACE_GND_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_nv.MW_DIGITALIO_HANDLE,
                     rtb_PACE_GND_CTRL);

  /* MATLABSystem: '<S2>/PACING_REF_PWM' */
  MW_PWM_SetDutyCycle(firmware_rev4_DW.obj_l.MW_PWM_HANDLE,
                      firmware_rev4_B.PACING_REF_PWM);

  /* MATLABSystem: '<S2>/VENT_GND_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_km.MW_DIGITALIO_HANDLE,
                     rtb_VENT_GND_CTRL);

  /* MATLABSystem: '<S2>/VENT_PACE_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_l5.MW_DIGITALIO_HANDLE,
                     rtb_VENT_PACE_CTRL);

  /* MATLABSystem: '<S2>/Z_ATR_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_ef.MW_DIGITALIO_HANDLE, false);

  /* MATLABSystem: '<S2>/Z_VENT_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_no.MW_DIGITALIO_HANDLE, false);

  /* Chart: '<S2>/Sensing Pin Control' */
  if (firmware_rev4_DW.is_active_c5_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c5_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c5_firmware_rev4 = firmware_rev4_IN_Default_o;

    /* MinMax: '<S22>/Max' */
    firmware_rev4_B.VENT_CMP_REF_PWM = 0.0;

    /* MinMax: '<S21>/Max' */
    firmware_rev4_B.ATR_CMP_REF_PWM = 0.0;
  } else if (firmware_rev4_DW.is_c5_firmware_rev4 == 1) {
    if (firmware_rev4_B.sense) {
      firmware_rev4_DW.is_c5_firmware_rev4 = firmware_rev4_IN_Sense;

      /* MinMax: '<S22>/Max' incorporates:
       *  Constant: '<S22>/Constant'
       *  Gain: '<S22>/Multiply'
       *  Gain: '<S22>/Multiply1'
       *  Rounding: '<S22>/Round'
       */
      firmware_rev4_B.VENT_CMP_REF_PWM = rt_roundf_snf
        (firmware_rev4_P.Multiply1_Gain_gi * firmware_rev4_B.VSens_j *
         firmware_rev4_P.Multiply_Gain_e);
      if ((!(firmware_rev4_B.VENT_CMP_REF_PWM >
             firmware_rev4_P.Constant_Value_mm)) && (!rtIsNaN
           (firmware_rev4_P.Constant_Value_mm))) {
        firmware_rev4_B.VENT_CMP_REF_PWM =
          firmware_rev4_P.Constant_Value_mm;
      }

      /* MinMax: '<S22>/Min' incorporates:
       *  Constant: '<S22>/Constant1'
       */
      if ((!(firmware_rev4_B.VENT_CMP_REF_PWM <
             firmware_rev4_P.Constant1_Value_gd)) && (!rtIsNaN
           (firmware_rev4_P.Constant1_Value_gd))) {
        /* MinMax: '<S22>/Max' */
        firmware_rev4_B.VENT_CMP_REF_PWM =
          firmware_rev4_P.Constant1_Value_gd;
      }

      /* End of MinMax: '<S22>/Min' */

      /* MinMax: '<S21>/Max' incorporates:
       *  Constant: '<S21>/Constant'
       *  Gain: '<S21>/Multiply'
       *  Gain: '<S21>/Multiply1'
       *  Rounding: '<S21>/Round'
       */
      firmware_rev4_B.ATR_CMP_REF_PWM = rt_roundf_snf
        (firmware_rev4_P.Multiply1_Gain_j * firmware_rev4_B.ASens_e *
         firmware_rev4_P.Multiply_Gain_o);
      if ((!(firmware_rev4_B.ATR_CMP_REF_PWM >
             firmware_rev4_P.Constant_Value_eq)) && (!rtIsNaN
           (firmware_rev4_P.Constant_Value_eq))) {
        firmware_rev4_B.ATR_CMP_REF_PWM =
          firmware_rev4_P.Constant_Value_eq;
      }

      /* MinMax: '<S21>/Min' incorporates:
       *  Constant: '<S21>/Constant1'
       */
      if ((!(firmware_rev4_B.ATR_CMP_REF_PWM <
             firmware_rev4_P.Constant1_Value_gh)) && (!rtIsNaN
           (firmware_rev4_P.Constant1_Value_gh))) {
        /* MinMax: '<S21>/Max' */
        firmware_rev4_B.ATR_CMP_REF_PWM =
          firmware_rev4_P.Constant1_Value_gh;
      }

      /* End of MinMax: '<S21>/Min' */
    }
  } else {
    /* case IN_Sense: */
    if (!firmware_rev4_B.sense) {
      firmware_rev4_DW.is_c5_firmware_rev4 = firmware_rev4_IN_Default_o;

      /* MinMax: '<S22>/Max' */
      firmware_rev4_B.VENT_CMP_REF_PWM = 0.0;

      /* MinMax: '<S21>/Max' */
      firmware_rev4_B.ATR_CMP_REF_PWM = 0.0;
    }
  }

  /* End of Chart: '<S2>/Sensing Pin Control' */

  /* MATLABSystem: '<S2>/ATR_CMP_REF_PWM' */
  MW_PWM_SetDutyCycle(firmware_rev4_DW.obj_jv.MW_PWM_HANDLE,
                      firmware_rev4_B.ATR_CMP_REF_PWM);

  /* MATLABSystem: '<S2>/FRONT_END_CTRL' */
  MW_digitalIO_write(firmware_rev4_DW.obj_mo.MW_DIGITALIO_HANDLE, true);

  /* MATLABSystem: '<S2>/VENT_CMP_REF_PWM' */
  MW_PWM_SetDutyCycle(firmware_rev4_DW.obj_jn.MW_PWM_HANDLE,
                      firmware_rev4_B.VENT_CMP_REF_PWM);

  /* Chart: '<S4>/EGRAM CLOCK' */
  if (firmware_rev4_DW.is_active_c6_firmware_rev4 == 0U) {
    firmware_rev4_DW.is_active_c6_firmware_rev4 = 1U;
    firmware_rev4_DW.is_c6_firmware_rev4 = firmware_rev4_IN_Waiting;
  } else if (firmware_rev4_DW.is_c6_firmware_rev4 == 1) {
    firmware_rev4_DW.is_c6_firmware_rev4 = firmware_rev4_IN_Waiting;
  } else {
    /* case IN_Waiting: */
    if (firmware_rev4_B.msg_ready && (firmware_rev4_B.egram_status != 0))
    {
      firmware_rev4_DW.is_c6_firmware_rev4 =
        firmware_rev4_IN_Send_EGRAM;
      send_message(5.0);
    }
  }

  /* End of Chart: '<S4>/EGRAM CLOCK' */
}

/* Model step wrapper function for compatibility with a static main program */
void firmware_rev4_step(int_T tid)
{
  switch (tid) {
   case 0 :
    firmware_rev4_step0();
    break;

   case 1 :
    firmware_rev4_step1();
    break;

   default :
    break;
  }
}

/* Model initialize function */
void firmware_rev4_initialize(void)
{
  /* Registration code */

  /* initialize non-finites */
  rt_InitInfAndNaN(sizeof(real_T));

  {
    freedomk64f_AnalogInput_firmware_Si_T *obj;
    freedomk64f_DigitalWrite_firmware_S_T *obj_0;
    freedomk64f_DigitalRead_firmware_Si_T *obj_1;
    freedomk64f_fxos8700_firmware_Simul_T *obj_2;
    freedomk64f_PushButton_firmware_Sim_T *obj_3;
    freedomk64f_PWMOutput_firmware_Simu_T *obj_4;

    /* Chart: '<S4>/COM IN' */
    firmware_rev4_DW.is_c2_firmware_rev4 = firmware_rev4_IN_INITIALIZE;
    firmware_rev4_B.temp_mode = firmware_rev4_B.mode;
    firmware_rev4_B.LRL = 60U;
    firmware_rev4_B.temp_LRL = firmware_rev4_B.LRL;
    firmware_rev4_B.URL = 120U;
    firmware_rev4_B.temp_URL = firmware_rev4_B.URL;
    firmware_rev4_B.ARP_d = 250U;
    firmware_rev4_B.temp_ARP_o = firmware_rev4_B.ARP_d;
    firmware_rev4_B.VRP_l = 320U;
    firmware_rev4_B.temp_VRP_k = firmware_rev4_B.VRP_l;
    firmware_rev4_B.APW = 1U;
    firmware_rev4_B.temp_APW = firmware_rev4_B.APW;
    firmware_rev4_B.VPW = 1U;
    firmware_rev4_B.temp_VPW = firmware_rev4_B.VPW;
    firmware_rev4_B.AAmp_d = 5.0F;
    firmware_rev4_B.temp_AAmp_b = firmware_rev4_B.AAmp_d;
    firmware_rev4_B.VAmp_b = 5.0F;
    firmware_rev4_B.temp_VAmp_h = firmware_rev4_B.VAmp_b;
    firmware_rev4_B.ASens_e = 4.0F;
    firmware_rev4_B.temp_ASens_f = firmware_rev4_B.ASens_e;
    firmware_rev4_B.VSens_j = 4.0F;
    firmware_rev4_B.temp_VSens_b = firmware_rev4_B.VSens_j;
    firmware_rev4_B.AVDelay_j = 150U;
    firmware_rev4_B.temp_AVDelay_m = firmware_rev4_B.AVDelay_j;
    firmware_rev4_B.rateFactor = 1U;
    firmware_rev4_B.temp_rateFactor = firmware_rev4_B.rateFactor;
    firmware_rev4_B.actThres = 4U;
    firmware_rev4_B.temp_actThres = firmware_rev4_B.actThres;
    firmware_rev4_B.rxnTime = 2U;
    firmware_rev4_B.temp_rxnTime = firmware_rev4_B.rxnTime;
    firmware_rev4_B.recTime = 5U;
    firmware_rev4_B.temp_recTime = firmware_rev4_B.recTime;

    /* SystemInitialize for S-Function (sfun_private_function_caller) generated from: '<S4>/COM OUT' incorporates:
     *  SubSystem: '<S4>/COM OUT'
     */
    send_message_Init();

    /* End of SystemInitialize for S-Function (sfun_private_function_caller) generated from: '<S4>/COM OUT' */

    /* Start for MATLABSystem: '<S4>/Serial Receive' */
    firmware_rev4_DW.obj_p.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_p.SampleTime = -1.0;
    firmware_rev4_DW.obj_p.isInitialized = 0;
    firmware_rev4_DW.obj_p.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_l = true;
    firmware_rev4_DW.obj_p.SampleTime =
      firmware_rev4_P.SerialReceive_SampleTime;
    firmware_SystemCore_setup_pb(&firmware_rev4_DW.obj_p);

    /* Start for MATLABSystem: '<S1>/ATR_SIGNAL' */
    firmware_rev4_DW.obj_j.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_j.isInitialized = 0;
    firmware_rev4_DW.obj_j.SampleTime = -1.0;
    firmware_rev4_DW.obj_j.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_g40 = true;
    firmware_rev4_DW.obj_j.SampleTime =
      firmware_rev4_P.ATR_SIGNAL_SampleTime;
    obj = &firmware_rev4_DW.obj_j;
    firmware_rev4_DW.obj_j.isSetupComplete = false;
    firmware_rev4_DW.obj_j.isInitialized = 1;
    obj->MW_ANALOGIN_HANDLE = MW_AnalogInSingle_Open(16U);
    firmware_rev4_B.trigger_val = MW_ANALOGIN_SOFTWARE_TRIGGER;
    MW_AnalogIn_SetTriggerSource(firmware_rev4_DW.obj_j.MW_ANALOGIN_HANDLE,
      firmware_rev4_B.trigger_val, 0U);
    firmware_rev4_DW.obj_j.isSetupComplete = true;

    /* Start for MATLABSystem: '<S1>/VENT_SIGNAL' */
    firmware_rev4_DW.obj_k.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_k.isInitialized = 0;
    firmware_rev4_DW.obj_k.SampleTime = -1.0;
    firmware_rev4_DW.obj_k.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_p = true;
    firmware_rev4_DW.obj_k.SampleTime =
      firmware_rev4_P.VENT_SIGNAL_SampleTime;
    obj = &firmware_rev4_DW.obj_k;
    firmware_rev4_DW.obj_k.isSetupComplete = false;
    firmware_rev4_DW.obj_k.isInitialized = 1;
    obj->MW_ANALOGIN_HANDLE = MW_AnalogInSingle_Open(17U);
    firmware_rev4_B.trigger_val = MW_ANALOGIN_SOFTWARE_TRIGGER;
    MW_AnalogIn_SetTriggerSource(firmware_rev4_DW.obj_k.MW_ANALOGIN_HANDLE,
      firmware_rev4_B.trigger_val, 0U);
    firmware_rev4_DW.obj_k.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/Digital Write' */
    firmware_rev4_DW.obj_k1.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_k1.isInitialized = 0;
    firmware_rev4_DW.obj_k1.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_d = true;
    obj_0 = &firmware_rev4_DW.obj_k1;
    firmware_rev4_DW.obj_k1.isSetupComplete = false;
    firmware_rev4_DW.obj_k1.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(42U, 1);
    firmware_rev4_DW.obj_k1.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/Digital Write1' */
    firmware_rev4_DW.obj_pl.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_pl.isInitialized = 0;
    firmware_rev4_DW.obj_pl.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_b = true;
    obj_0 = &firmware_rev4_DW.obj_pl;
    firmware_rev4_DW.obj_pl.isSetupComplete = false;
    firmware_rev4_DW.obj_pl.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(43U, 1);
    firmware_rev4_DW.obj_pl.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/Digital Write2' */
    firmware_rev4_DW.obj_h.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_h.isInitialized = 0;
    firmware_rev4_DW.obj_h.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_i = true;
    obj_0 = &firmware_rev4_DW.obj_h;
    firmware_rev4_DW.obj_h.isSetupComplete = false;
    firmware_rev4_DW.obj_h.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(44U, 1);
    firmware_rev4_DW.obj_h.isSetupComplete = true;

    /* Start for MATLABSystem: '<S1>/ATR_CMP_DETECT' */
    firmware_rev4_DW.obj_m.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_m.isInitialized = 0;
    firmware_rev4_DW.obj_m.SampleTime = -1.0;
    firmware_rev4_DW.obj_m.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_bx = true;
    firmware_rev4_DW.obj_m.SampleTime =
      firmware_rev4_P.ATR_CMP_DETECT_SampleTime;
    obj_1 = &firmware_rev4_DW.obj_m;
    firmware_rev4_DW.obj_m.isSetupComplete = false;
    firmware_rev4_DW.obj_m.isInitialized = 1;
    obj_1->MW_DIGITALIO_HANDLE = MW_digitalIO_open(0U, 0);
    firmware_rev4_DW.obj_m.isSetupComplete = true;

    /* Start for MATLABSystem: '<S1>/VENT_CMP_DETECT' */
    firmware_rev4_DW.obj_d.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_d.isInitialized = 0;
    firmware_rev4_DW.obj_d.SampleTime = -1.0;
    firmware_rev4_DW.obj_d.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_a = true;
    firmware_rev4_DW.obj_d.SampleTime =
      firmware_rev4_P.VENT_CMP_DETECT_SampleTime;
    obj_1 = &firmware_rev4_DW.obj_d;
    firmware_rev4_DW.obj_d.isSetupComplete = false;
    firmware_rev4_DW.obj_d.isInitialized = 1;
    obj_1->MW_DIGITALIO_HANDLE = MW_digitalIO_open(1U, 0);
    firmware_rev4_DW.obj_d.isSetupComplete = true;

    /* Start for MATLABSystem: '<S23>/FXOS8700 6-Axes Sensor' */
    firmware_rev4_DW.obj_e.i2cobj.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_e.matlabCodegenIsDeleted = true;
    obj_2 = &firmware_rev4_DW.obj_e;
    firmware_rev4_DW.obj_e.isInitialized = 0;
    firmware_rev4_DW.obj_e.SampleTime = -1.0;
    obj_2->i2cobj.isInitialized = 0;
    obj_2->i2cobj.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.obj_e.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_k = true;
    firmware_rev4_DW.obj_e.SampleTime =
      firmware_rev4_P.FXOS87006AxesSensor_SampleTime;
    firmware__SystemCore_setup_p(&firmware_rev4_DW.obj_e);

    /* Start for MATLABSystem: '<S23>/Moving Average' */
    firmware_rev4_DW.obj.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj.isInitialized = 0;
    firmware_rev4_DW.obj.NumChannels = -1;
    firmware_rev4_DW.obj.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_g4 = true;
    firmware_rev4_DW.obj.isSetupComplete = false;
    firmware_rev4_DW.obj.isInitialized = 1;
    firmware_rev4_DW.obj.NumChannels = 1;
    firmware_rev4_DW.gobj_2.isInitialized = 0;
    firmware_rev4_DW.obj.pStatistic = &firmware_rev4_DW.gobj_2;
    firmware_rev4_DW.obj.isSetupComplete = true;
    firmware_rev4_DW.obj.TunablePropsChanged = false;

    /* InitializeConditions for MATLABSystem: '<S23>/Moving Average' */
    if (firmware_rev4_DW.obj.pStatistic->isInitialized == 1) {
      firmware_rev4_DW.obj.pStatistic->pCumSum = 0.0;
      memset(&firmware_rev4_DW.obj.pStatistic->pCumSumRev[0], 0, 999U *
             sizeof(real_T));
      firmware_rev4_DW.obj.pStatistic->pCumRevIndex = 1.0;
    }

    /* End of InitializeConditions for MATLABSystem: '<S23>/Moving Average' */

    /* Start for MATLABSystem: '<S1>/PUSH_BUTTON_SW3' */
    firmware_rev4_DW.obj_ey.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_ey.isInitialized = 0;
    firmware_rev4_DW.obj_ey.SampleTime = -1.0;
    firmware_rev4_DW.obj_ey.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_e = true;
    firmware_rev4_DW.obj_ey.SampleTime =
      firmware_rev4_P.PUSH_BUTTON_SW3_SampleTime;
    obj_3 = &firmware_rev4_DW.obj_ey;
    firmware_rev4_DW.obj_ey.isSetupComplete = false;
    firmware_rev4_DW.obj_ey.isInitialized = 1;
    obj_3->MW_DIGITALIO_HANDLE = MW_digitalIO_open(46U, 0);
    firmware_rev4_DW.obj_ey.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/ATR_GND_CTRL' */
    firmware_rev4_DW.obj_n.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_n.isInitialized = 0;
    firmware_rev4_DW.obj_n.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_j = true;
    obj_0 = &firmware_rev4_DW.obj_n;
    firmware_rev4_DW.obj_n.isSetupComplete = false;
    firmware_rev4_DW.obj_n.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(11U, 1);
    firmware_rev4_DW.obj_n.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/ATR_PACE_CTRL' */
    firmware_rev4_DW.obj_jb.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_jb.isInitialized = 0;
    firmware_rev4_DW.obj_jb.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_je = true;
    obj_0 = &firmware_rev4_DW.obj_jb;
    firmware_rev4_DW.obj_jb.isSetupComplete = false;
    firmware_rev4_DW.obj_jb.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(8U, 1);
    firmware_rev4_DW.obj_jb.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/PACE_CHARGE_CTRL' */
    firmware_rev4_DW.obj_i.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_i.isInitialized = 0;
    firmware_rev4_DW.obj_i.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_g = true;
    obj_0 = &firmware_rev4_DW.obj_i;
    firmware_rev4_DW.obj_i.isSetupComplete = false;
    firmware_rev4_DW.obj_i.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(2U, 1);
    firmware_rev4_DW.obj_i.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/PACE_GND_CTRL' */
    firmware_rev4_DW.obj_nv.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_nv.isInitialized = 0;
    firmware_rev4_DW.obj_nv.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_bd = true;
    obj_0 = &firmware_rev4_DW.obj_nv;
    firmware_rev4_DW.obj_nv.isSetupComplete = false;
    firmware_rev4_DW.obj_nv.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(10U, 1);
    firmware_rev4_DW.obj_nv.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/PACING_REF_PWM' */
    firmware_rev4_DW.obj_l.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_l.isInitialized = 0;
    firmware_rev4_DW.obj_l.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_dk = true;
    obj_4 = &firmware_rev4_DW.obj_l;
    firmware_rev4_DW.obj_l.isSetupComplete = false;
    firmware_rev4_DW.obj_l.isInitialized = 1;
    obj_4->MW_PWM_HANDLE = MW_PWM_Open(5U, 2000.0, 0.0);
    MW_PWM_Start(firmware_rev4_DW.obj_l.MW_PWM_HANDLE);
    firmware_rev4_DW.obj_l.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/VENT_GND_CTRL' */
    firmware_rev4_DW.obj_km.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_km.isInitialized = 0;
    firmware_rev4_DW.obj_km.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_n = true;
    obj_0 = &firmware_rev4_DW.obj_km;
    firmware_rev4_DW.obj_km.isSetupComplete = false;
    firmware_rev4_DW.obj_km.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(12U, 1);
    firmware_rev4_DW.obj_km.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/VENT_PACE_CTRL' */
    firmware_rev4_DW.obj_l5.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_l5.isInitialized = 0;
    firmware_rev4_DW.obj_l5.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_f = true;
    obj_0 = &firmware_rev4_DW.obj_l5;
    firmware_rev4_DW.obj_l5.isSetupComplete = false;
    firmware_rev4_DW.obj_l5.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(9U, 1);
    firmware_rev4_DW.obj_l5.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/Z_ATR_CTRL' */
    firmware_rev4_DW.obj_ef.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_ef.isInitialized = 0;
    firmware_rev4_DW.obj_ef.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_h = true;
    obj_0 = &firmware_rev4_DW.obj_ef;
    firmware_rev4_DW.obj_ef.isSetupComplete = false;
    firmware_rev4_DW.obj_ef.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(4U, 1);
    firmware_rev4_DW.obj_ef.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/Z_VENT_CTRL' */
    firmware_rev4_DW.obj_no.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_no.isInitialized = 0;
    firmware_rev4_DW.obj_no.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_bi = true;
    obj_0 = &firmware_rev4_DW.obj_no;
    firmware_rev4_DW.obj_no.isSetupComplete = false;
    firmware_rev4_DW.obj_no.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(7U, 1);
    firmware_rev4_DW.obj_no.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/ATR_CMP_REF_PWM' */
    firmware_rev4_DW.obj_jv.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_jv.isInitialized = 0;
    firmware_rev4_DW.obj_jv.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_bp = true;
    obj_4 = &firmware_rev4_DW.obj_jv;
    firmware_rev4_DW.obj_jv.isSetupComplete = false;
    firmware_rev4_DW.obj_jv.isInitialized = 1;
    obj_4->MW_PWM_HANDLE = MW_PWM_Open(6U, 2000.0, 0.0);
    MW_PWM_Start(firmware_rev4_DW.obj_jv.MW_PWM_HANDLE);
    firmware_rev4_DW.obj_jv.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/FRONT_END_CTRL' */
    firmware_rev4_DW.obj_mo.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_mo.isInitialized = 0;
    firmware_rev4_DW.obj_mo.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_dr = true;
    obj_0 = &firmware_rev4_DW.obj_mo;
    firmware_rev4_DW.obj_mo.isSetupComplete = false;
    firmware_rev4_DW.obj_mo.isInitialized = 1;
    obj_0->MW_DIGITALIO_HANDLE = MW_digitalIO_open(13U, 1);
    firmware_rev4_DW.obj_mo.isSetupComplete = true;

    /* Start for MATLABSystem: '<S2>/VENT_CMP_REF_PWM' */
    firmware_rev4_DW.obj_jn.matlabCodegenIsDeleted = true;
    firmware_rev4_DW.obj_jn.isInitialized = 0;
    firmware_rev4_DW.obj_jn.matlabCodegenIsDeleted = false;
    firmware_rev4_DW.objisempty_jb = true;
    obj_4 = &firmware_rev4_DW.obj_jn;
    firmware_rev4_DW.obj_jn.isSetupComplete = false;
    firmware_rev4_DW.obj_jn.isInitialized = 1;
    obj_4->MW_PWM_HANDLE = MW_PWM_Open(3U, 2000.0, 0.0);
    MW_PWM_Start(firmware_rev4_DW.obj_jn.MW_PWM_HANDLE);
    firmware_rev4_DW.obj_jn.isSetupComplete = true;
  }
}

/* Model terminate function */
void firmware_rev4_terminate(void)
{
  /* Terminate for MATLABSystem: '<S4>/Serial Receive' */
  firmware_r_matlabCodegenHa_a(&firmware_rev4_DW.obj_p);

  /* Terminate for MATLABSystem: '<S1>/ATR_SIGNAL' */
  matlabCodegenHandle_matlab_pb1o(&firmware_rev4_DW.obj_j);

  /* Terminate for MATLABSystem: '<S1>/VENT_SIGNAL' */
  matlabCodegenHandle_matlab_pb1o(&firmware_rev4_DW.obj_k);

  /* Terminate for MATLABSystem: '<S2>/Digital Write' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_k1);

  /* Terminate for MATLABSystem: '<S2>/Digital Write1' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_pl);

  /* Terminate for MATLABSystem: '<S2>/Digital Write2' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_h);

  /* Terminate for MATLABSystem: '<S1>/ATR_CMP_DETECT' */
  matlabCodegenHandle_matlabCo_pb(&firmware_rev4_DW.obj_m);

  /* Terminate for MATLABSystem: '<S1>/VENT_CMP_DETECT' */
  matlabCodegenHandle_matlabCo_pb(&firmware_rev4_DW.obj_d);

  /* Terminate for MATLABSystem: '<S23>/FXOS8700 6-Axes Sensor' */
  matlabCodegenHandle_mat_pb1oxbm(&firmware_rev4_DW.obj_e);
  matlabCodegenHandle_ma_pb1oxbm4(&firmware_rev4_DW.obj_e.i2cobj);

  /* Terminate for MATLABSystem: '<S23>/Moving Average' */
  matlabCodegenHandle_matl_pb1oxb(&firmware_rev4_DW.obj);

  /* Terminate for MATLABSystem: '<S1>/PUSH_BUTTON_SW3' */
  matlabCodegenHandle_matlabCod_p(&firmware_rev4_DW.obj_ey);

  /* Terminate for MATLABSystem: '<S2>/ATR_GND_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_n);

  /* Terminate for MATLABSystem: '<S2>/ATR_PACE_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_jb);

  /* Terminate for MATLABSystem: '<S2>/PACE_CHARGE_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_i);

  /* Terminate for MATLABSystem: '<S2>/PACE_GND_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_nv);

  /* Terminate for MATLABSystem: '<S2>/PACING_REF_PWM' */
  matlabCodegenHandle_m_pb1oxbm4t(&firmware_rev4_DW.obj_l);

  /* Terminate for MATLABSystem: '<S2>/VENT_GND_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_km);

  /* Terminate for MATLABSystem: '<S2>/VENT_PACE_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_l5);

  /* Terminate for MATLABSystem: '<S2>/Z_ATR_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_ef);

  /* Terminate for MATLABSystem: '<S2>/Z_VENT_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_no);

  /* Terminate for MATLABSystem: '<S2>/ATR_CMP_REF_PWM' */
  matlabCodegenHandle_m_pb1oxbm4t(&firmware_rev4_DW.obj_jv);

  /* Terminate for MATLABSystem: '<S2>/FRONT_END_CTRL' */
  matlabCodegenHandle__pb1oxbm4tj(&firmware_rev4_DW.obj_mo);

  /* Terminate for MATLABSystem: '<S2>/VENT_CMP_REF_PWM' */
  matlabCodegenHandle_m_pb1oxbm4t(&firmware_rev4_DW.obj_jn);

  /* Terminate for S-Function (sfun_private_function_caller) generated from: '<S4>/COM OUT' incorporates:
   *  SubSystem: '<S4>/COM OUT'
   */
  send_message_Term();

  /* End of Terminate for S-Function (sfun_private_function_caller) generated from: '<S4>/COM OUT' */
}

/*
 * File trailer for generated code.
 *
 * [EOF]
 */
